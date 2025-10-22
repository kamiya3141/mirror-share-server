window.TSObjectChildElementBaseName = "ts";

// 長くてごめん
window.getCurrentScriptUrl = (without_file_name, _my_src) => {
	let return_url;
	const _src = String(Boolean(_my_src) ? _my_src : document.currentScript.src);
	if (!_src.includes("?"))
		return_url = _src.split("/").slice(0, _src.split("/").length - Number(Boolean(without_file_name))).join("/");
	else {
		const url_params = new URL(_src).searchParams;
		if (!url_params.has("n") || (url_params.has("n") && (url_params.get("n") == "" || /\d+/.test(url_params.get("n"))))) console.error(`src属性に設定されたURLが不正な値でした ->\nsrc: ${_src},\nfile_name: ${file_name},\nurl_params: ${url_params}`);
		else {
			// https://share.tshuto.com にクエリパラメータが設定されていた時に備えてoriginを固定にする
			return_url = `https://jsd.tshuto.com/${url_params.get("n")}/${url_params.has("v") ? url_params.get("v") : "l"}/${url_params.get("n")}.js`;
		}
	}
	return return_url;
}
window.getMyFileName = (with_ext, _my_src) => {
	const fileName = window.getCurrentScriptUrl(true, _my_src).split("/").pop();
	return (Boolean(with_ext) ? fileName : fileName.replace(/\.[^/.]+$/, ""));
}
window.getMyLowerFileName = (with_ext, _my_src) => String(window.getMyFileName(with_ext, _my_src)).toLowerCase();

window.getMyElementName = my_name => `${window.TSObjectChildElementBaseName}-${my_name ? my_name : window.getMyLowerFileName()}`;
window.getMyProjectName = my_name => window.TSObjectChildElementBaseName + (my_name ? my_name : window.getMyLowerFileName()[0]);
window.getMyTemplateFileUrl = my_src => new URL(`./.${window.TSObjectTemplateFileExt}`, window.getCurrentScriptUrl(true, my_src));

window.TSObjectTesterName = `${window.TSObjectChildElementBaseName}-object-tester`;
window.TSObjectTesterID = `${window.TSObjectTesterName}-id`;

class TSObjectTester extends HTMLElement {
	constructor() {
		super();
		this.id = window.TSObjectTesterID;
		this.style.position = "fixed";
		this.displayFlex();
		this.style.opacity = "1";
		this.style.backgroundColor = "rgba(0, 0, 0, 0)";
		this.style.top = "0px";
		this.style.left = "0px";
		this.style.width = `${document.documentElement.clientWidth}px`;
		this.style.height = `${document.documentElement.clientHeight}px`;
		window.addEventListener("resize", () => {
			this.style.width = `${document.documentElement.clientWidth}px`;
			this.style.height = `${document.documentElement.clientHeight}px`;
		});
		document.body.prepend(this);
	}
	displayBlock() {
		this.style.display = "block";
	}
	displayFlex() {
		this.style.display = "flex";
		this.style.flexDirection = "column";
	}
	displayNone() {
		this.style.display = "none";
	}
	add(...args) {
		if (!Array.isArray(args)) args = [args];
		args.forEach(el => {
			this.appendChild(el);
		});
	}
	clear() {
		[...this.children].forEach(c => {
			c.remove();
		});
	}
	get getChildren() {
		return [...this.children];
	}
}

customElements.define(window.TSObjectTesterName, TSObjectTester);

window.ts_object_tester = new TSObjectTester();

/* Object.js */
window.TSObjectElementName = window.getMyElementName();

class TSObject extends HTMLElement {
	#x1 = 0;
	#y1 = 0;
	#x2 = 0;
	#y2 = 0;
	#rad = 0;
	#allowHoverValue = false;
	#textSlotName = "text";
	#positionTypeArray = [["l", "cx", "r"], ["t", "cy", "b"]];
	#myAttributes = [["st", "rect", arg => this.shapeType = arg], ["sv", "0,0,100%,100%", arg => this.shapeValue = arg], ["fill", "var(--tso-bc-cl)", arg => this.fill = arg], ["stroke", "var(--tso-bd-cl)", arg => this.stroke = arg], ["stroke-weight", "var(--tso-bd-wei)", arg => this.strokeWeight = arg], ["stroke-type", "var(--tso-bd-tp)", arg => this.strokeType = arg], ["position-type", "lt", arg => this.positionType = arg], ["allow-hover", this.#allowHoverValue, arg => this.allowHover = arg], ["tv", "", arg => this.text = arg], ["tt", "b", arg => this.textType = arg], ["tpv", "50%,50%,50%,50%", arg => this.textPositionValue = arg], ["tpt", "cxcy", arg => this.textPositionType = arg], ["tc", "var(--tso-black)", arg => this.textColor = arg], ["ts", "1rem", arg => this.textSize = arg], ["allow-hover", "false", arg => this.allowHover = arg]];
	local_chached = false;
	static cachedFileName = window.getMyFileName();
	static loadedEventName = `${window.TSObjectElementName}-loaded`;

	constructor() {
		super();
		this.setAttribute("tabindex", "0");
		this.attachShadow({ mode: "open" });
		this.init_org();
	}

	static get mySrc() {
		const _str = window.TSObjectElementName.split("-").pop();
		return `https://jsd.tshuto.com?n=${String(_str[0]).toUpperCase() + _str.slice(1)}&v=l`;
	}

	init_org() {
		if (!window.TSObjectTemplateMap.has(TSObject.cachedFileName)) {
			const file_name = `https://share.tshuto.com/common-src/javascript/def/${TSObject.cachedFileName}/.tsotemplate`;
			fetch(file_name).then(res => res.text()).then(templateText => {
				window.TSObjectTemplateMap.set(TSObject.cachedFileName, new DOMParser().parseFromString(templateText, "text/html"));
				this.after_init_org(this.local_cached);
			});
		} else {
			this.local_cached = !this.local_cached;
			this.after_init_org(this.local_cached);
		}
	}
	after_init_org(_tf) {
		this.shadowRoot.appendChild(window.TSObjectTemplateMap.get(TSObject.cachedFileName).getElementById("template").content.cloneNode(true));

		// 属性が設定されてなかったら、または不正だった場合の処理を書き、既定値を入れる。
		this.#myAttributes.forEach(c => {
			if (!this.hasAttribute(c[0])) this.setAttribute(c[0], c[1]);
			c[2](this.getAttribute(c[0]));
		});

		this.addEventListener("mouseover", () => {
			if (this.#allowHoverValue) TSObject.mouseHover(this);
		});
		this.addEventListener("mouseleave", () => {
			if (this.#allowHoverValue) TSObject.mouseLeave(this);
		});
		if (!_tf) this.dispatchEvent(new CustomEvent(TSObject.loadedEventName));
	}

	static mouseHover(target, change_opacity_v = "0.75", change_cursor_v = "pointer") {
		target.style.opacity = `${change_opacity_v}`;
		target.style.cursor = change_cursor_v;
	}
	static mouseLeave(target, pre_opacity_v = "1", pre_cursor_v = "unset") {
		target.style.opacity = `${pre_opacity_v}`;
		target.style.cursor = pre_cursor_v;
	}

	// 塗りつぶす色
	set fill(col = "var(--tso-bc-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		if (!col.includes("!important")) this.style.backgroundColor = col;
		else this.style.setProperty("background-color", col, "important");
	}
	get fill() {
		return window.getComputedStyle(this).backgroundColor;
	}

	set border(arg) {
		if (!Boolean(arg)) arg = `${window.getComputedStyle(this).borderColor} ${window.getComputedStyle(this).borderWidth} ${window.getComputedStyle(this).borderStyle}`;
		this.style.border = arg;
	}
	get border() {
		return window.getComputedStyle(this).border;
	}
	// ふちの色
	set stroke(col = "var(--tso-bd-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		this.setAttribute("stroke", col);
		this.style.borderColor = col;
		this.border = null;
	}
	get stroke() {
		return window.getComputedStyle(this).borderColor;
	}
	set strokeWeight(w = "var(--tso-ln-wei)") {
		w = this.arrangedValue(w);
		this.setAttribute("stroke-weight", w);
		this.style.borderWidth = w;
		this.border = null;
	}
	get strokeWeight() {
		return this.onlyNumber(window.getComputedStyle(this).borderWidth);
	}
	set strokeType(val = "var(--tso-bd-tp)") {
		if (val == null) val = "var(--tso-bd-tp)";
		this.style.borderStyle = val;
		this.border = null;
	}
	get strokeType() {
		return window.getComputedStyle(this).borderStyle;
	}

	get textElement() {
		return this.shadowRoot.querySelector(`slot[name="${this.#textSlotName}"]`);
	}
	set text(val = "") {
		this.setAttribute("tv", val);
		this.textElement.innerHTML = val;
	}
	get text() {
		return this.textElement.innerHTML;
	}
	set textColor(col = "var(--tso-black)") {
		this.setAttribute("tc", col);
		this.textElement.style.color = this.getAttribute("tc");
	}
	get textColor() {
		return window.getComputedStyle(this.textElement).color;
	}
	set textSize(val = "") {
		val = this.arrangedValue(val);
		this.setAttribute("ts", val);
		this.textElement.style.fontSize = this.getAttribute("ts");
	}
	get textSize() {
		return window.getComputedStyle(this.textElement).fontSize;
	}
	set textPositionValue(val = "50%,50%,50%,50%") {
		this.setAttribute("tpv", val);
		const args = this.arrangedValue(...val.split(","));
		this.textElement.style.left = args[0];
		this.textElement.style.top = args[1];
		if (this.textType == "b") {
			this.textElement.style.width = args[2];
			this.textElement.style.height = args[3];
		}
	}
	get textPositionValue() {
		return this.getAttribute("tpv").split(",");
	}
	set textPositionType(tp = "cxcy") {
		this.arrangedTransform(this.textElement, tp, "tpt");
	}
	get textPositionType() {
		return this.getAttribute("tpt");
	}
	set textType(val = "b") {
		if (!/b|i|ib|n/.test(val)) console.error(`textTypeに無効な値が挿入されました。"${val}"`);
		else {
			this.setAttribute("tt", val);
			if (val == "b") this.textElement.style.display = "block";
			else if (val == "i") this.textElement.style.display = "inline";
			else if (val == "ib") this.textElement.style.display = "inline-block";
			else if (val == "n") this.textElement.style.display = "none";
		}
	}
	get textType() {
		return this.getAttribute("tt");
	}

	// 座標決定時の要素の相対位置
	set positionType(tp = "lt") {
		this.arrangedTransform(this, tp, "position-type");
	}
	get positionType() {
		return this.getAttribute("position-type");
	}

	// オブジェクトの形
	get shapeTypeArray() {
		return [["rect", [3, 4, 5, 8]], ["line", [4]], ["ellipse", [3, 4]]]; // , ["arc", [5, 6, 7]]];
	}
	get shapeTypeExecArray() {
		return [
			(arg_str) => {
				let args = arg_str.split(",");
				if (this.shapeTypeArray[0][1].some(c => c == args.length)) {
					args = this.arrangedValue(...args);
					this.x = args[0];
					this.y = args[1];
					this.width = args[2];
					this.height = args[3] == undefined ? args[2] : args[3];
					if (args.length > this.shapeTypeArray[0][1][1]) this.radius = args.slice(this.shapeTypeArray[0][1][1]);
				}
			},
			(arg_str) => {
				let args = arg_str.split(",");
				if (this.shapeTypeArray[1][1].some(c => c == args.length)) {
					args = this.arrangedValue(...args);
					this.fill = null;
					this.x1 = [args[0], true];
					this.y1 = [args[1], true];
					this.x2 = [args[2], true];
					this.y2 = [args[3], true];
					this.#arrangedLineObject();
				}
			},
			(arg_str) => {
				let args = arg_str.split(",");
				if (this.shapeTypeArray[2][1].some(c => c == args.length)) {
					args = this.arrangedValue(...args);
					this.x = args[0];
					this.y = args[1];
					this.width = args[2];
					this.height = args[3] == undefined ? args[2] : args[3];
					this.radius("50%");
				}
			}
		];
	}
	set shapeType(tp = "rect") {
		if (this.shapeTypeArray.some(c => c[0] == tp)) {
			this.setAttribute("st", tp);
		} else console.error(`shapeTypeの値が現在のバージョンにないもの、または不正な値でした。入力タイプ：${tp}`);
	}
	get shapeType() {
		return this.getAttribute("st");
	}

	set shapeValue(shapeV = "0,0,100%,100%") {
		this.shapeTypeExecArray[this.shapeTypeArray.findIndex(c => c[0] == this.shapeType)](shapeV);
		this.setAttribute("sv", shapeV);
	}
	get shapeValue() {
		return this.getAttribute("sv").split(",");
	}
	set radius(arr = [0]) {
		arr = this.arrangedValue(arr);
		if (!Array.isArray(arr)) arr = [arr];
		if (arr.length != 3 && arr.length > 0 && arr.length < 5)
			this.style.borderRadius = arr.join(" ");
		else console.error(`radiusの値が現在のバージョンにないもの、または不正な値でした。入力タイプ：${arr}`);
	}
	get radius() {
		return this.onlyNumber(window.getComputedStyle(this).borderRadius);
	}

	// オブジェクトの座標等の情報
	set x(val) {
		val = this.arrangedValue(val);
		this.style.left = val;
		if (this.hasAttribute("sv")) {
			this.setAttribute("sv", (() => {
				const retval = this.shapeValue.slice();
				retval[0] = val;
				return retval;
			})());
		}
	}
	get x() {
		return this.onlyNumber(window.getComputedStyle(this).left);
	}
	set y(val) {
		val = this.arrangedValue(val);
		this.style.top = val;
		if (this.hasAttribute("sv")) {
			this.setAttribute("sv", (() => {
				const retval = this.shapeValue.slice();
				retval[1] = val;
				return retval;
			})());
		}
	}
	get y() {
		return this.onlyNumber(window.getComputedStyle(this).top);
	}
	// x1 ~ y2は数値のみ
	set x1(val) {
		if (!Array.isArray(val)) val = [...val];
		this.x = val[0];
		this.#x1 = this.x;
		if (!val[1]) this.#arrangedLineObject();
	}
	get x1() {
		return this.#x1;
	}
	set y1(val) {
		if (!Array.isArray(val)) val = [...val];
		this.y = val[0];
		this.#y1 = this.y;
		if (!val[1]) this.#arrangedLineObject();
	}
	get y1() {
		return this.#y1;
	}
	set x2(val) {
		if (!Array.isArray(val)) val = [...val];
		this.width = `abs(${this.arrangedValue(this.x1)} - ${this.arrangedValue(val[0])})`;
		this.#x2 = this.x1 + this.width;
		if (!val[1]) this.#arrangedLineObject();
	}
	get x2() {
		return this.#x2;
	}
	set y2(val) {
		if (!Array.isArray(val)) val = [...val];
		this.height = `abs(${this.arrangedValue(this.y1)} - ${this.arrangedValue(val[0])})`;
		this.#x2 = this.y1 + this.height;
		if (!val[1]) this.#arrangedLineObject();
	}
	get y2() {
		return this.#y2;
	}
	set rad(val) {
		this.#rad = val;
	}
	get rad() {
		return this.#rad;
	}
	set width(val) {
		val = this.arrangedValue(val);
		this.style.width = val;
		if (this.hasAttribute("sv")) {
			this.setAttribute("sv", (() => {
				const retval = this.shapeValue.slice();
				retval[2] = val;
				return retval;
			})());
		}
	}
	get width() {
		return this.onlyNumber(window.getComputedStyle(this).width);
	}
	set height(val) {
		val = this.arrangedValue(val);
		this.style.height = val;
		if (this.hasAttribute("sv")) {
			this.setAttribute("sv", (() => {
				const retval = this.shapeValue.slice();
				retval[3] = val;
				return retval;
			})());
		}
	}
	get height() {
		return this.onlyNumber(window.getComputedStyle(this).height);
	}

	// プライベート
	#dist(_x1, _y1, _x2, _y2) {
		return Math.sqrt(Math.abs(_x1 - _x2) ** 2 + Math.abs(_y1 - _y2) ** 2);
	}
	// 私はまだまだ三流プログラマなのです。ごめんなさい・・・
	#arrangedLineObject() {
		this.width = this.#dist(this.x1, this.y1, this.x2, this.y2);
		this.height = this.strokeWeight;
		this.rad = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180 / Math.PI;
		this.style.transform =
			this.deletedTrfmElement(this, "rotate") + `rotate(${this.rad}deg)`;
	}

	// その他メソッドなど
	arrangedValue(...args) {
		args = args.map(val => {
			if (val == undefined || val == null || String(val).length == 0)
				console.error(`this.arrangedValueでエラー：value error -> ${val}`);
			return `${val}${!isNaN(Number(val)) ? "px" : ""}`;
		});
		return args.length == 1 ? args[0] : args;
	}
	onlyNumber(...args) {
		args = args.map(val => {
			if (val == undefined || val == null || val == "")
				console.error(`this.onlyNumberでエラー：value error -> ${val}`);
			const m = val.match(/^\d+/);
			return m ? Number(m[0]) : val;
		});
		return args.length == 1 ? args[0] : args;
	}

	arrangedTransform(target = this, tp = "lt", attr = "position-type") {
		if (
			this.#positionTypeArray.reduce(
				(sum0, c0) =>
					(sum0 += c0.reduce((sum1, c1) => (sum1 += tp.split(c1).length - 1), 0)),
				0
			) == 2
		) {
			this.setAttribute(attr, tp);
			target.style.transform =
				this.deletedTrfmElement(target) +
				` translate(${this.#positionTypeArray
					.map(
						c0 => String(c0.findIndex(c => tp.includes(c)) / (c0.length - 1) * -100) + "%"
					)
					.join(",")})`;

		} else console.error(`${attr}属性の値が現在のバージョンにないもの、または不正な値でした。入力タイプ：${tp}`);
	}

	deletedTrfmElement(target = this, word = "trans") {
		if (target.style.transform.split(" ").some(c => c.includes(word))) {
			target.style.transform = target.style.transform
				.split(" ")
				.map(c => (c = c.replace(c, c.includes(word) ? "" : c)))[0];
		}
		return target.style.transform;
	}
	set allowHover(tf = false) {
		tf = !Boolean(tf) || tf == "false" ? false : true;
		this.setAttribute("allow-hover", tf ? "true" : "false");
		this.#allowHoverValue = tf;
	}
	get allowHover() {
		return this.#allowHoverValue;
	}
}

window.TSObjectExist = true;
window.TSObjectTemplateMap = (!window.TSObjectTemplateMap ? new Map() : window.TSObjectTemplateMap);
window.TSObjectTemplateFileExt = "tsotemplate";


// mouseのイベント一括登録
window.TSObjectMouseAddEventListener = (cp, mx, i = 0) => {
	if (i >= mx) console.error(`window.TSObjectMouseAddEventListener でエラー: ${i}, ${mx}`);
	if (!Array.isArray(cp)) cp = [cp];
	[...cp].forEach(c => {
		const _mh_func = () => TSObject.mouseHover(c, 0.5);
		c.addEventListener("mouseover", _mh_func);
		const _ml_func = () => TSObject.mouseLeave(c);
		c.addEventListener("mouseleave", _ml_func);
		if (++i < mx) window.TSObjectMouseAddEventListener([...c.children], mx, i);
	});
};

customElements.define(window.TSObjectElementName, TSObject);