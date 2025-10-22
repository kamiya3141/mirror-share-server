window.TSObjectChildElementBaseName = "ts";

window.getMyFileName = with_ext => {
	const fileName = ((document.currentScript?.src || "").split("/").pop() || "");
	return (with_ext ? fileName : fileName.replace(/\.[^/.]+$/, ""));
}
window.getMyLowerFileName = with_ext => {
	return String(window.getMyFileName(with_ext)).toLowerCase();
}
window.getMyElementName = my_name => {
	return `${window.TSObjectChildElementBaseName}-${my_name ? my_name : window.getMyLowerFileName()}`;
}

window.TSObjectElementName = window.getMyElementName();

class TSObject extends HTMLElement {
	#x1 = 0;
	#y1 = 0;
	#x2 = 0;
	#y2 = 0;
	#rad = 0;
	#allowHoverClassName = "allow-hover";
	#positionTypeArray = [["l", "cx", "r"], ["t", "cy", "b"]];
	#myAttributes = [["st", "rect", arg => this.shapeType = arg], ["sv", "0,0,100%,100%", arg => this.shapeValue = arg], ["fill", "var(--bc-cl)", arg => this.fill = arg], ["stroke", "var(--bd-cl)", arg => this.stroke = arg], ["stroke-weight", "var(--ln-wei)", arg => this.strokeWeight = arg], ["position-type", "lt", arg => this.positionType = arg]];
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowTemplateURL = new URL(`./.${window.TSObectTemplateFileExt}`, new URL(document.currentScript.src));
		fetch(this.shadowTemplateURL).then(res => res.text()).then(templateText => {
			const doc = new DOMParser().parseFromString(templateText, "text/html");
			this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));

			// 属性が設定されてなかったら、または不正だった場合の処理を書き、既定値を入れる。
			this.#myAttributes.forEach(c => {
				if (this.hasAttribute(c[0])) c[2](this.getAttribute(c[0]));
				else this.setAttribute(c[0], c[1]);
			});
			document.dispatchEvent(window.TSObjectLoadedEvent);
		});
	}

	// 塗りつぶす色
	set fill(col = "var(--bc-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		this.style.backgroundColor = col;
	}
	get fill() {
		return window.getComputedStyle(this).backgroundColor;
	}

	// ふちの色
	set stroke(col = "var(--bd-cl)") {
		if (col == null) col = "rgba(0, 0, 0, 0)";
		this.style.borderColor = col;
	}
	get stroke() {
		return window.getComputedStyle(this).borderColor;
	}
	set strokeWeight(w = "var(--ln-wei)") {
		this.style.borderWidth = w;
	}
	get strokeWeight() {
		window.getComputedStyle.borderWidth;
	}

	// 座標決定時の要素の相対位置
	set positionType(tp = "lt") {
		if (
			this.#positionTypeArray.reduce(
				(sum0, c0) =>
					(sum0 += c0.reduce((sum1, c1) => (sum1 += tp.split(c1).length - 1), 0)),
				0
			) == 2
		) {
			this.setAttribute("position-type", tp);
			this.style.transform =
				this.deletedTrfmElement() +
				` translate(${this.#positionTypeArray
					.map(
						c0 => String(c0.findIndex(c => tp.includes(c)) / (c0.length - 1) * -100) + "%"
					)
					.join(",")})`;
		
		} else console.error(`positionTypeの値が現在のバージョンにないもの、または不正な値でした。入力タイプ：${tp}`);
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
					console.log(args);
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
	}
	get x() {
		return this.onlyNumber(window.getComputedStyle(this).left);
	}
	set y(val) {
		this.style.top = this.arrangedValue(val);
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
	}
	get width() {
		return this.onlyNumber(window.getComputedStyle(this).width);
	}
	set height(val = "") {
		this.style.height = this.arrangedValue(val);
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
			if (val == undefined || val == null || val == "")
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
			return m ? Number(m[0]) : null;
		});
		return args.length == 1 ? args[0] : args;
	}
	
	deletedTrfmElement(word = "trans") {
		if (this.style.transform.split(" ").some(c => c.includes(word))) {
			this.style.transform = this.style.transform
				.split(" ")
				.map(c => (c = c.replace(c, c.includes(word) ? "" : c)))[0];
		}
		return this.style.transform;
	}
	allowHover() {
		this.classList.add(this.#allowHoverClassName);
	}
	disallowHover() {
		this.classList.remove(this.#allowHoverClassName);
	}
}

window.TSObectExist = true;
window.TSObectTemplateFileExt = "tsotemplate";
window.TSObjectLoadedEventName = `${window.TSObjectElementName}-loaded`;
window.TSObjectLoadedEvent = new CustomEvent(window.TSObjectLoadedEventName);

customElements.define(window.TSObjectElementName, TSObject);
