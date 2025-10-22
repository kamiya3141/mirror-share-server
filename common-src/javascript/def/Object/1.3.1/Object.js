window.TSObjectChildElementBaseName = "ts";

// 長くてごめん
window.getCurrentScriptUrl = (without_file_name, _my_src) => {
	let return_url;
	const _src = String(Boolean(_my_src) ? _my_src : document.currentScript.src);
	if (!_src.includes("?"))
		return_url = _src.split("/").slice(0, _dir.length - Number(Boolean(without_file_name))).join("/");
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
window.getMyFileName = with_ext => {
	const fileName = window.getCurrentScriptUrl().split("/").pop();
	return (Boolean(with_ext) ? fileName : fileName.replace(/\.[^/.]+$/, ""));
}
window.getMyLowerFileName = with_ext => {
	return String(window.getMyFileName(with_ext)).toLowerCase();
}
window.getMyElementName = my_name => {
	return `${window.TSObjectChildElementBaseName}-${my_name ? my_name : window.getMyLowerFileName()}`;
}
window.getMyProjectName = my_name => {
	return window.TSObjectChildElementBaseName + (my_name ? my_name : window.getMyLowerFileName()[0]);
}

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
		[...this.children].forEach(ch => {
			ch.remove();
		});
	}
	get getChildren() {
		return [...this.children];
	}
}

customElements.define(window.TSObjectTesterName, TSObjectTester);

window.ts_object_tester = new TSObjectTester();

/* Object.js */
const elementName = window.getMyElementName();

class TSObject extends HTMLElement {
	#x1 = 0;
	#y1 = 0;
	#x2 = 0;
	#y2 = 0;
	#rad = 0;
	#allowHoverValue = false;
	#textSlotName = "text";
	#positionTypeArray = [["l", "cx", "r"], ["t", "cy", "b"]];
	#myAttributes = [["st", "rect", arg => this.shapeType = arg], ["sv", "0,0,100%,100%", arg => this.shapeValue = arg], ["fill", "var(--tso-bc-cl)", arg => this.fill = arg], ["stroke", "var(--tso-bd-cl)", arg => this.stroke = arg], ["stroke-weight", "var(--tso-ln-wei)", arg => this.strokeWeight = arg], ["position-type", "lt", arg => this.positionType = arg], ["allow-hover", this.#allowHoverValue, arg => this.allowHover = arg], ["tv", "", arg => this.text = arg], ["tt", "b", arg => this.text = arg], ["tpv", "50%,50%,50%,50%", arg => this.text = arg], ["tpt", "cxcy", arg => this.text = arg]];
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.init_org();
	}
	init_org() {
		const _elementName = elementName;
		if (!window.TSObjectTemplateMap.has(_elementName)) {
			const file_name = new URL(`./.${window.TSObjectTemplateFileExt}`, window.getCurrentScriptUrl(true));
			fetch(file_name).then(res => res.text()).then(templateText => {
				window.TSObjectTemplateMap.set(_elementName, templateText);
				this.after_init_org(_elementName);
			});
		} else this.after_init_org(_elementName);
	}
	after_init_org(_elementName) {
		const doc = new DOMParser().parseFromString(window.TSObjectTemplateMap.get(_elementName), "text/html");
		this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));

		// 属性が設定されてなかったら、または不正だった場合の処理を書き、既定値を入れる。
		this.#myAttributes.forEach(c => {
			if (this.hasAttribute(c[0])) c[2](this.getAttribute(c[0]));
			else this.setAttribute(c[0], c[1]);
		});
		this.shapeValue = [this.x, this.y, this.width, this.height].join(",");
		this.dispatchEvent(window.TSObjectLoadedEvent);
		this.addEventListener("mouseover", () => {
			if (!this.#allowHoverValue) return;
			this.style.opacity = "0.75";
			this.style.cursor = "pointer";
		});
		this.addEventListener("mouseleave", () => {
			if (!this.#allowHoverValue) return;
			this.style.opacity = "1";
			this.style.cursor = "unset";
		});
		this.init();
	}
	// オーバーライドされる運命なのさ・・・
	init() {
		return;
	}

	// 塗りつぶす色
	set fill(col = "var(--tso-bc-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		this.style.backgroundColor = col;
	}
	get fill() {
		return window.getComputedStyle(this).backgroundColor;
	}

	// ふちの色
	set stroke(col = "var(--tso-bd-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		this.style.borderColor = col;
	}
	get stroke() {
		return window.getComputedStyle(this).borderColor;
	}
	set strokeWeight(w = "var(--tso-ln-wei)") {
		this.style.borderWidth = w;
	}
	get strokeWeight() {
		window.getComputedStyle.borderWidth;
	}

	get textElement() {
		return this.shadowRoot.querySelector(`slot[name="${this.#textSlotName}"]`);
	}
	set text(val = "") {
		this.textElement.innerHTML = val;
	}
	get text() {
		return this.textElement.innerHTML;
	}
	set textPositionValue(val = "50%,50%,50%,50%") {
		this.textElement.setAttribute("tpv", val);
		const args = this.arrangedValue(...val.split(","));
		this.textElement.style.left = args[0];
		this.textElement.style.top = args[1];
		if (this.textType == "b") {
			this.textElement.style.width = args[2];
			this.textElement.style.height = args[3];
		}
	}
	get textPositionValue() {
		return this.textElement.getAttribute("tpv").split(",");
	}
	set textPositionType(tp = "cxcy") {
		this.arrangedTransform(this.textElement, tp, "tpt");
	}
	get textPositionType() {
		return this.textElement.getAttribute("tpt");
	}
	set textType(val = "b") {
		if (!/b|i|ib|n/.test(val)) console.error(`textTypeに無効な値が挿入されました。"${val}"`);
		else this.textElement.setAttribute("tt", val);
	}
	get textType() {
		return this.textElement.getAttribute("tt");
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
					this.fill(null);
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
		this.style.left = this.arrangedValue(val);
		//this.shapeValue = [this.x, this.y, this.width, this.height].join(",");
	}
	get x() {
		return this.onlyNumber(window.getComputedStyle(this).left);
	}
	set y(val) {
		this.style.top = this.arrangedValue(val);
		//this.shapeValue = [this.x, this.y, this.width, this.height].join(",");
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
		this.#x2 = this.x1 + this.onlyNumber(window.getComputedStyle(this).width);
		if (!val[1]) this.#arrangedLineObject();
	}
	get x2() {
		return this.#x2;
	}
	set y2(val) {
		if (!Array.isArray(val)) val = [...val];
		this.height = `abs(${this.arrangedValue(this.y1)} - ${this.arrangedValue(val)})`;
		this.#x2 = this.y1 + this.onlyNumber(window.getComputedStyle(this).height);
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
	set width(val = "") {
		this.style.width = this.arrangedValue(val);
		//this.shapeValue = [this.x, this.y, this.width, this.height].join(",");
	}
	get width() {
		return this.onlyNumber(window.getComputedStyle(this).width);
	}
	set height(val = "") {
		this.style.height = this.arrangedValue(val);
		//this.shapeValue = [this.x, this.y, this.width, this.height].join(",");
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
			this.deletedTrfmElement("rotate") + `rotate(${this.rad})`;
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
			target.setAttribute(attr, tp);
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
		tf = typeof tf == "boolean" ? tf : (typeof tf == "string" && tf === "true" ? true : false);
		if (this.hasAttribute("allow-hover")) this.removeAttribute("allow-hover");
		this.#allowHoverValue = tf;
	}
	get allowHover() {
		return this.#allowHoverValue;
	}
}

window.TSObjectExist = true;
window.TSObjectTemplateMap = new Map();
window.TSObjectTemplateFileExt = "tsotemplate";
window.TSObjectElementName = elementName;
window.TSObjectLoadedEventName = `${elementName}-loaded`;
window.TSObjectLoadedEvent = new CustomEvent(window.TSObjectLoadedEventName);

customElements.define(elementName, TSObject);