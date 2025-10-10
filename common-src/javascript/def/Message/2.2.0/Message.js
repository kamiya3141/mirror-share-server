if (!window.TSObjectExist) console.error("Object.js v1.2.xをMessage.jsの前に読み込んでください。");

class TSOMessage extends TSObject {
	#cachedTemplate = null;
	static #Loaded = false;	// 汎用的な名前のため Upper-Camel-Case に変更。
	static #tsoMsgMemory = [];
	static #autoSortFlag = false;
	static #mySlotColorTypeNameArray = ["alert", "warn", "normal"];
	static #myElementNameValue = window.getMyElementName();
	
	constructor(msg_type) {
		super();
		if (msg_type) this.setAttribute("color-type", msg_type);
		this.addEventListener(window.TSObjectLoadedEventName, () => {
			this.init();
		});
	}
	static get myEventName() {
		return `${TSOMessage.#myElementNameValue}-complete-set`;
	}
	static get myElementName() {
		return TSOMessage.#myElementNameValue;
	}
	get deleteDivId() {
		return "delete-div";
	}
	static get mySrc() {
		let _str = TSOMessage.#myElementNameValue.split("-").pop();
		return document.currentScript ? document.currentScript.src : `https://jsd.tshuto.com?n=${String(_str[0]).toUpperCase() + _str.slice(1)}&v=l`;
	}
	init() {
		if (!this.#cachedTemplate) {
			const file_name = new URL(`./.${window.TSObjectTemplateFileExt}`, window.getCurrentScriptUrl(true, TSOMessage.mySrc));
			fetch(file_name).then(res => res.text()).then(templateText => {
				this.#cachedTemplate = new DOMParser().parseFromString(templateText, "text/html");
				this.after_init(TSOMessage.myElementName);
			});
		} else this.after_init(TSOMessage.myElementName);
	}
	after_init(_element_name) {
		this.shadowRoot.prepend(this.#cachedTemplate.getElementById("template").content.cloneNode(true));
		const my_event = new CustomEvent(TSOMessage.myEventName);
		this.appendChild(new DOMParser().parseFromString(`<div id="${this.deleteDivId}" style="display:inline-block;font-size:inherit;border-left:${this
			.stroke} var(--tso-bd-wei) var(--tso-bd-tp);">&#9003;</div>`, "text/html").getElementById(this.deleteDivId)).addEventListener("click", e => {
			if (e.button == 0) {
				//this.style.display = "none";
				this.remove();
				document.dispatchEvent(my_event);
			}
		});
		
		const mySlot = this.shadowRoot.getElementById("slot-id");

		mySlot.addEventListener("slotchange", () => {
			this.setAttribute("color-type", this.hasAttribute("color-type") ? this.getAttribute("color-type") : "normal");
			[...mySlot.children].forEach(c => {
				c.style.display = "inline-block";
			});
		});
		
		this.shapeValue = ["50%", "auto", "auto", "auto", "10rem"].join(",");
		this.positionType = "cxt";
		this.textType = "ib";
		this.style.display = "inline-block";
		[...this.children].forEach(c => {
			const _rem = 1.5;
			c.style.paddingRight = `${_rem}rem`;
			c.style.paddingLeft = `${_rem}rem`;
		});
		this.style.opacity = "0";
		TSOMessage.orgTsoMsgArray = this;
		window.ts_object_tester.add(this);
		document.dispatchEvent(my_event);
	}
	static set loaded(tf) {
		TSOMessage.#Loaded = tf ? true : false;
	}
	static get loaded() {
		return TSOMessage.#Loaded;
	}
	completeSetBegin() {
		this.shapeValue = "50%,auto,auto,auto,2.5rem"
		this.style.position = "relative";
	}
	completeSetEnd() {
		this.shapeValue = `50%,${this.getBoundingClientRect().y},auto,auto,2.5rem`;
		this.style.position = "fixed";
	}
	static set orgTsoMsgArray(charr = []) {
		if (!charr || (Array.isArray(charr) && charr.length == 0)) console.error(`TSOMessage.orgTsoMsgArrayでエラー：不正な値です${charr}`);
		else if (!Array.isArray(charr)) charr = [charr];
		TSOMessage.#tsoMsgMemory.push(...charr);
	}
	static get orgTsoMsgArray() {
		return TSOMessage.#tsoMsgMemory;
	}
	static set autoSort(tf) {
		TSOMessage.#autoSortFlag = tf ? true : false;
	}
	static get autoSort() {
		return TSOMessage.#autoSortFlag;
	}
	static msgSort() {
		const retarr = TSOMessage.orgTsoMsgArray.slice().sort((a, b) => {
			const p_a = TSOMessage.#mySlotColorTypeNameArray.indexOf(a);
			const p_b = TSOMessage.#mySlotColorTypeNameArray.indexOf(b);
			return ((p_a < 0 ? TSOMessage.#mySlotColorTypeNameArray.length : p_a) - (p_b < 0 ? TSOMessage.#mySlotColorTypeNameArray.length : p_b));
		});
		window.ts_object_tester.clear();
		window.ts_object_tester.add(...retarr);
	}
}
let firstMsgElementCount = 0;
document.addEventListener(TSOMessage.myEventName, () => {
	if (TSOMessage.loaded) {
		window.ts_object_tester.displayFlex();
		window.ts_object_tester.add(...document.getElementsByTagName(TSOMessage.myElementName));
	} else {
		firstMsgElementCount++;
		const el = [...document.querySelectorAll(TSOMessage.myElementName)];
		if (el.length == firstMsgElementCount) {
			TSOMessage.loaded = true;
			el.forEach(c => {
				c.style.opacity = "1";
			});
		} else return;
	}
	if (TSOMessage.autoSort) TSOMessage.msgSort();
	window.ts_object_tester.getChildren.reverse().forEach(c => {
		c.completeSetBegin();
	});
	window.ts_object_tester.getChildren.reverse().forEach(c => {
		c.completeSetEnd();
		document.body.prepend(c);
	});
	window.ts_object_tester.clear();
	window.ts_object_tester.displayNone();
});
customElements.define(TSOMessage.myElementName, TSOMessage);