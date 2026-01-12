if (!window.TSObjectExist) console.error("Object.js v1.2.xをButton.jsの前に読み込んでください。");

class TSOButton extends TSObject {

	#disabled = false;

	mouseOver = true;
	mouseLeave = true;

	mousePressHandler;
	mousePressingHandler;
	mouseReleasedHandler;
	mouseClickHandler;
	mouseOverHandler;
	mouseLeaveHandler;
	#mouseTime = 0;

	// そもそもfocus, blur 時のアクションを許可するかどうか
	#allowFocus = true;
	#allowBlur = true;

	// 二次開発者が設定できるfocus, blur 時の最低限のアクション
	focusHandler;
	blurHandler;

	// 一次開発者が設定したfocus, blur 時の最低限のアクション
	#baseFocus = true;
	#baseFocusBefore = true;
	#baseBlur = true;
	#baseBlurBefore = true;

	#myOutline = {
		default: null,
		latest: null,
		defaultWeight: "0.125em",
		weight: "0.5em"
	};

	#saveFillColor = "";

	static #myElementNameValue = window.getMyElementName();
	static mySlotColorTypeNameArray = ["alert", "warn", "normal"];
	static cachedFileName = window.getMyFileName(false, TSOButton.mySrc);

	constructor(btn_lbl, btn_type) {
		super();
		if (btn_lbl) this.innerHTML += btn_lbl;
		if (btn_type) this.setAttribute("color-type", btn_type);
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
		if (!window.TSObjectTemplateMap.has(TSOButton.cachedFileName)) {
			const file_name = window.TSObjectTemplateFileUrl(TSOButton.cachedFileName);
			fetch(file_name).then(res => res.text()).then(templateText => {
				window.TSObjectTemplateMap.set(TSOButton.cachedFileName, new DOMParser().parseFromString(templateText, "text/html"));
				this.after_init();
			});
		} else this.after_init();
	}
	after_init() {
		this.shadowRoot.prepend(window.TSObjectTemplateMap.get(TSOButton.cachedFileName).getElementById("template").content.cloneNode(true));
		const my_event = new CustomEvent(TSOButton.myEventName);

		const mySlot = this.shadowRoot.getElementById("slot-id");
		mySlot.addEventListener("slotchange", () => {
			this.colorType = this.hasAttribute("color-type") ? this.getAttribute("color-type") : null;
		});
		if (TSOButton.mySlotColorTypeNameArray.some(c => this.colorType == c)) {
			const _new_arr = ["bc", "b", "c"].map(c => `var(--tsob-${this.colorType}-${c})`);
			this.fill = _new_arr[0];
			this.stroke = _new_arr[1];
			this.textColor = _new_arr[2];
		}
		this.textColor = window.getComputedStyle(this).color;
		this.allowHover = false;
		this.#saveFillColor = this.fill;
		this.#myOutline.default = this.border;
		this.#myOutline.latest = this.#myOutline.default;
		this.strokeWeight = "0";
		this.#baseFocusHandler();
		this.#baseBlurHandler();

		this.mousePressHandler = me => null;
		this.mousePressingHandler = me => null;
		this.mouseReleasedHandler = me => null;
		this.mouseClickHandler = me => null;
		this.mouseOverHandler = me => null;
		this.mouseLeaveHandler = me => null;
		this.focusHandler = me => null;
		this.blurHandler = me => null;

		this.addEventListener("mousedown", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseTime = 1;
			this.#mouseDownHandler();
		});
		this.addEventListener("mouseup", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseTime = 0;
			this.#mouseReleasedHandler();
		});
		this.addEventListener("click", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseClickHandler();
		});
		this.addEventListener("mouseover", e => {
			if (this.disabled) return;
			e.stopPropagation();
			if (this.mouseOver) TSObject.mouseHover(this, 0.5);
			this.#mouseOverHandler();
		});
		this.addEventListener("mouseleave", e => {
			if (this.disabled) return;
			e.stopPropagation();
			if (this.mouseLeave) TSObject.mouseLeave(this);
			this.#mouseLeaveHandler();
		});
		this.addEventListener("focus", e => {
			if (this.disabled || !this.allowFocus) return;
			e.stopPropagation();
			if (this.baseFocusBefore) this.#baseFocusHandler();
			this.#focusHandler();
			if (!this.baseFocusBefore) this.#baseFocusHandler();
		});
		this.addEventListener("blur", e => {
			if (this.disabled || !this.allowBlur) return;
			e.stopPropagation();
			if (this.baseBlurBefore) this.#baseBlurHandler();
			this.#blurHandler();
			if (!this.baseBlurBefore) this.#baseBlurHandler();
		});

		window.setTimeout(() => {
			document.dispatchEvent(my_event);
		}, 1000);
	}

	static get myEventName() {
		return `${this.#myElementNameValue}-complete-set`;
	}
	static get myElementName() {
		return this.#myElementNameValue;
	}
	set colorType(val = "") {
		val = !TSOButton.mySlotColorTypeNameArray.some(c => val == c) ? TSOButton.mySlotColorTypeNameArray[2] : val;
		this.setAttribute("color-type", val);
	}
	get colorType() {
		return this.getAttribute("color-type");
	}

	set disabled(tf) {
		tf = Boolean(tf);
		if (tf) {
			this.dispatchEvent(new Event("blur"));
			this.#saveFillColor = this.fill;
			this.fill = "lightgray";
			this.style.outlineWidth = "0";
		} else {
			this.#baseBlurHandler();
			this.fill = this.#saveFillColor;
		}
		this.#disabled = tf;
	}
	get disabled() {
		return this.#disabled;
	}

	set allowFocus(tf) {
		tf = Boolean(tf);
		this.#allowFocus = tf;
	}
	get allowFocus() {
		return this.#allowFocus;
	}
	set allowBlur(tf) {
		tf = Boolean(tf);
		this.#allowBlur = tf;
		if (!tf) this.style.outline = "none";
	}
	get allowBlur() {
		return this.#allowBlur;
	}
	set baseFocus(tf = false) {
		tf = Boolean(tf);
		this.#baseFocus = tf;
	}
	get baseFocus() {
		return this.#baseFocus;
	}
	set baseFocusBefore(tf = false) {
		tf = Boolean(tf);
		this.#baseFocusBefore = tf;
	}
	get baseFocusBefore() {
		return this.#baseFocusBefore;
	}
	set baseBlur(tf = false) {
		tf = Boolean(tf);
		this.#baseBlur = tf;
		if (tf) this.#myOutline.latest = this.#myOutline.default;
		else this.style.outline = "none";
	}
	get baseBlur() {
		return this.#baseBlur;
	}
	set baseBlurBefore(tf = false) {
		tf = Boolean(tf);
		this.#baseBlurBefore = tf;
	}
	get baseBlurBefore() {
		return this.#baseBlurBefore;
	}

	#mouseDownHandler() {
		if (this.#mouseTime == 0) return;
		if (this.#mouseTime == 1) this.#mousePressHandler();
		else this.#mousePressingHandler();
		if (this.#mouseTime < 2 && this.#mouseTime > 0) this.#mouseTime++;
		window.setTimeout(() => this.#mouseDownHandler(), 1000 / 20);
	}
	#mousePressHandler() {
		if (this.checkType(this.mousePressHandler)) this.mousePressHandler(this);
	}
	#mousePressingHandler() {
		if (this.checkType(this.mousePressingHandler)) this.mousePressingHandler(this);
	}
	#mouseReleasedHandler() {
		if (this.checkType(this.mouseReleasedHandler)) this.mouseReleasedHandler(this);
	}
	#mouseClickHandler() {
		if (this.checkType(this.mouseClickHandler)) this.mouseClickHandler(this);
	}
	#mouseOverHandler() {
		if (this.checkType(this.mouseOverHandler)) this.mouseOverHandler(this);
	}
	#mouseLeaveHandler() {
		if (this.checkType(this.mouseLeaveHandler)) this.mouseLeaveHandler(this);
	}
	// 作者以外の人も変更可能
	#focusHandler() {
		if (this.checkType(this.focusHandler)) this.focusHandler(this);
	}
	#blurHandler() {
		if (this.checkType(this.blurHandler)) this.blurHandler(this);
	}
	#baseFocusHandler() {
		if (!this.baseFocus) return;
		this.style.outline = this.#myOutline.latest;
		this.style.outlineWidth = this.#myOutline.weight;
	}
	#baseBlurHandler() {
		if (!this.baseBlur) return;
		this.style.outline = this.#myOutline.latest;
		this.style.outlineWidth = this.#myOutline.defaultWeight;
		this.#myOutline.latest = window.getComputedStyle(this).outline;
	}
	checkType(arg, tp = "function") {
		return (typeof arg == tp);
	}
}

customElements.define(TSOButton.myElementName, TSOButton);