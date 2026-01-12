if (!window.TSObjectExist) console.error("Object.js v1.2.xをMessage.jsの前に読み込んでください。");

class TSOMessage extends TSObject {
	#saveMyWH = ["auto", "auto"];
	static #Loaded = false;	// 汎用的な名前のため Upper-Camel-Case に変更。
	static #myElementNameValue = window.getMyElementName();
	static tsoMsgMemory = [];
	static autoSortFlag = true;
	static mySlotColorTypeNameArray = ["alert", "warn", "normal"];
	static cachedFileName = window.getMyFileName(false, TSOMessage.mySrc);
	
	constructor(msg, msg_type) {
		super();
		if (msg) this.innerHTML += msg;
		if (msg_type) this.setAttribute("color-type", msg_type);
		if (this.local_cached) this.init();
		else this.addEventListener(TSObject.loadedEventName, () => {
			this.init();
		});
	}
	
	static get mySrc() {
		let _str = this.#myElementNameValue.split("-").pop();
		return document.currentScript ? document.currentScript.src : `https://jsd.tshuto.com?n=${String(_str[0]).toUpperCase() + _str.slice(1)}&v=l`;
	}

	init() {
		if (!window.TSObjectTemplateMap.has(TSOMessage.cachedFileName)) {
			const file_name = `https://share.tshuto.com/common-src/javascript/def/${TSOMessage.cachedFileName}/.tsotemplate`;
			fetch(file_name).then(res => res.text()).then(templateText => {
				window.TSObjectTemplateMap.set(TSOMessage.cachedFileName, new DOMParser().parseFromString(templateText, "text/html"));
				this.after_init();
			});
		} else this.after_init();
	}
	after_init() {
		this.shadowRoot.prepend(window.TSObjectTemplateMap.get(TSOMessage.cachedFileName).getElementById("template").content.cloneNode(true));
		const my_event = new CustomEvent(TSOMessage.myEventName);
		this.appendChild(new DOMParser().parseFromString(`<div id="${this.deleteDivId}" style="display:inline-block;font-size:inherit;border-left:${this.getBorder()};">&#9003;</div>`, "text/html").getElementById(this.deleteDivId)).addEventListener("click", e => {
			if (e.button == 0) {
				this.remove();
				document.dispatchEvent(my_event);
			}
		});
		
		const mySlot = this.shadowRoot.getElementById("slot-id");

		mySlot.addEventListener("slotchange", () => {
			this.colorType = this.hasAttribute("color-type") ? this.getAttribute("color-type") : null;
			this.stroke = window.getComputedStyle(this).color;
			[...this.children].forEach(c => {
				c.style.display = "inline-block";
				c.style.padding = "1rem";
				const _mh_func = () => TSObject.mouseHover(c, 0.5);
				c.addEventListener("mouseover", _mh_func);
				const _ml_func = () => TSObject.mouseLeave(c);
				c.addEventListener("mouseleave", _ml_func);
			});
		});
		
		this.shapeValue = "50%,auto,auto,auto,1rem";
		this.positionType = "cxt";
		this.textType = "ib";
		this.style.display = "flex";
		[...this.children].forEach(c => {
			const _rem = 1.5;
			c.style.paddingRight = `${_rem}rem`;
			c.style.paddingLeft = `${_rem}rem`;
		});
		this.style.opacity = "0";
		TSOMessage.orgTsoMsgArray = this;
		window.ts_object_tester.add(this);
		this.strokeWeight = "1px";
		this.style.margin = "0.25rem";
		window.setTimeout(() => {
			document.dispatchEvent(my_event);
		}, 1000);
		
	}

	get deleteDivId() {
		return "delete-div";
	}
	static get myEventName() {
		return `${this.#myElementNameValue}-complete-set`;
	}
	static get myElementName() {
		return this.#myElementNameValue;
	}
	static set loaded(tf) {
		this.#Loaded = tf ? true : false;
	}
	static get loaded() {
		return this.#Loaded;
	}
	set colorType(val = "") {
		val = !Boolean(val) ? "normal" : val;
		this.setAttribute("color-type", val);
	}
	get colorType() {
		return this.getAttribute("color-type");
	}
		
	completeSetBegin() {
		const _spvl = this.shapeValue;
		this.#saveMyWH = [_spvl[2], _spvl[3]];
		this.shapeValue = "50%,auto,auto,auto"
		this.style.position = "relative";
	}
	completeSetEnd() {
		this.shapeValue = `50%,${this.getBoundingClientRect().y},${this.#saveMyWH.join(",")},1rem`;
		this.style.position = "fixed";
	}
	static set orgTsoMsgArray(charr = []) {
		if (!charr || (Array.isArray(charr) && charr.length == 0)) console.error(`TSOMessage.orgTsoMsgArrayでエラー：不正な値です${charr}`);
		else if (!Array.isArray(charr)) charr = [charr];
		TSOMessage.tsoMsgMemory.push(...charr);
	}
	static get orgTsoMsgArray() {
		return TSOMessage.tsoMsgMemory;
	}
	static set autoSort(tf) {
		TSOMessage.autoSortFlag = tf ? true : false;
	}
	static get autoSort() {
		return TSOMessage.autoSortFlag;
	}
	static msgSort() {
		const retarr = window.ts_object_tester.getChildren.slice().reverse().sort((a1, a2) => {
			const p_a = TSOMessage.mySlotColorTypeNameArray.indexOf(a1);
			const p_b = TSOMessage.mySlotColorTypeNameArray.indexOf(a2);
			return ((p_a < 0 ? TSOMessage.mySlotColorTypeNameArray.length : p_a) - (p_b < 0 ? TSOMessage.mySlotColorTypeNameArray.length : p_b));
		});
		window.ts_object_tester.clear();
		window.ts_object_tester.add(...retarr);
	}
}

window.addEventListener("resize", () => {
	document.dispatchEvent(new CustomEvent(TSOMessage.myEventName));
});

let firstMsgElementCount = 0;
document.addEventListener(TSOMessage.myEventName, () => {
	let el = [...document.body.querySelectorAll(TSOMessage.myElementName)];
	if (TSOMessage.loaded) {
		window.ts_object_tester.displayFlex();
		window.ts_object_tester.add(...el.reverse());
	} else {
		firstMsgElementCount++;
		
		if (el.length == firstMsgElementCount) {
			TSOMessage.loaded = true;
			el.forEach(c => {
				c.style.opacity = "1";
			});
		} else return;
	}
	if (TSOMessage.autoSort) TSOMessage.msgSort();
	window.ts_object_tester.getChildren.forEach(c => {
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