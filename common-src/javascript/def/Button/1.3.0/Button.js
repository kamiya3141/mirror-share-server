if (!window.TSObjectExist) console.error("Object.js v1.2.xをButton.jsの前に読み込んでください。");

class TSOButton extends TSObject {

	#disabled = false;

	baseMouseOver = true;
	baseMouseLeave = true;

	mousePressHandler;
	mousePressingHandler;
	mouseMoveHandler;
	mouseReleasedHandler;
	mouseClickHandler;
	mouseOutHandler;
	mouseOverHandler;
	mouseLeaveHandler;
	#mouseTime = 0;

	touchedElement = document.createElement("div");
	touchStartHandler;
	touchingHandler;
	touchEndHandler;
	touchMoveHandler;
	touchCancelHandler;
	touchOverHandler;
	touchLeaveHandler;
	#nowTouch = 0;


	allowTouch = true;

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

	static FPS = {
		default: 60,
		mouse: 60,
		touch: 60
	};

	static allowTouchAll = true;
	static touchUnifiedMouse = true;
	static #autoSetMobileMode = true;
	static #myElementNameValue = window.getMyElementName();
	static mySlotColorTypeNameArray = ["alert", "warn", "normal"];
	static cachedFileName = window.getMyFileName(false, TSOButton.mySrc);

	static debugMode = true;

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

		this.allowHover = false;
		this.#saveFillColor = this.fill;
		this.#myOutline.default = this.border;
		this.#myOutline.latest = this.#myOutline.default;
		this.strokeWeight = "0";
		this.#baseFocusHandler();
		this.#baseBlurHandler();
		if (TSOButton.autoSetMobileMode)
			TSOButton.autoSetMobileMode = true;

		this.mousePressHandler = (me, me_e) => null;
		this.mousePressingHandler = (me, me_e) => null;
		this.mouseMoveHandler = (me, me_e) => null;
		this.mouseReleasedHandler = (me, me_e) => null;
		this.mouseClickHandler = (me, me_e) => null;
		this.mouseOutHandler = me => null;
		this.mouseOverHandler = me => null;
		this.mouseLeaveHandler = me => null;
		this.focusHandler = me => null;
		this.blurHandler = me => null;

		this.touchStartHandler = (me, me_e) => null;
		this.touchingHandler = me => null;
		this.touchEndHandler = (me, me_e) => null;
		this.touchMoveHandler = (me, me_e) => null;
		this.touchCancelHandler = (me, me_e) => null;
		this.touchOverHandler = me => null;
		this.touchLeaveHandler = me => null;

		this.addEventListener("mousedown", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseTime = 1;
			this.#mouseDownHandler(e);
		});
		this.addEventListener("mousemove", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseMoveHandler(e);
		});
		this.addEventListener("mouseup", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseTime = 0;
			this.#mouseReleasedHandler(e);
		});
		this.addEventListener("click", e => {
			if (this.disabled) return;
			e.stopPropagation();
			this.#mouseClickHandler(e);
		});
		this.addEventListener("mouseout", e => {
			if (this.disabled) return;
			this.#mouseTime = 0;
			this.#mouseOutHandler();
		});

		this.addEventListener("mouseover", e => {
			if (this.disabled) return;
			e.stopPropagation();
			if (this.baseMouseOver) TSObject.mouseHover(this, 0.5);
			this.#mouseOverHandler();
		});
		this.addEventListener("mouseleave", e => {
			if (this.disabled) return;
			e.stopPropagation();
			if (this.baseMouseLeave) TSObject.mouseLeave(this);
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

		this.addEventListener("touchstart", e => {
			if (this.disabled || !this.allowTouch || !TSOButton.allowTouchAll) return;
			e.stopPropagation();
			this.#touchStartHandler(e);
		});
		this.addEventListener("touchend", e => {
			if (this.disabled || !this.allowTouch || !TSOButton.allowTouchAll) return;
			e.stopPropagation();
			this.#touchEndHandler(e);
		});
		this.addEventListener("touchmove", e => {
			if (this.disabled || !this.allowTouch || !TSOButton.allowTouchAll) return;
			e.stopPropagation();
			this.#touchMoveHandler(e);
		});
		this.addEventListener("touchcancel", e => {
			if (this.disabled || !this.allowTouch || !TSOButton.allowTouchAll) return;
			e.stopPropagation();
			this.#touchCancelHandler(e);
		});

		document.addEventListener(TSOButton.myEventName, () => {
			if (TSOButton.autoSetMobileMode)
				TSOButton.autoSetMobileMode = true;
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
	static set autoSetMobileMode(tf = false) {
		tf = Boolean(tf);
		this.#autoSetMobileMode = tf;
		if (tf) this.allowTouchAll = this.judgeMobile;
		else this.allowTouchAll = tf;
	}
	static get autoSetMobileMode() {
		return this.#autoSetMobileMode;
	}
	// あえて冗長に書いてみた
	static get judgeMobile() {
		let __result = true;
		let __uad = navigator.userAgentData;
		let __ua = navigator.userAgent;
		if (__uad && !this.debugMode) {
			__result = __uad.mobile;
		} else if (__ua) {
			const __ua_lc = __ua.toLowerCase();
			const __ua_re_word = "Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini";
			__result = __ua_lc.match(new RegExp(__ua_re_word, "i"));
		}
		__result = Boolean(__result);
		return __result;
		// return navigator.userAgentData ? navigator.userAgentData.mobile : (navigator.userAgent ? Boolean(navigator.userAgent.toLowerCase().match(/iphone|android.+mobile/)) : true);
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

	#mouseDownHandler(e) {
		if (this.#mouseTime == 0) return;
		if (this.#mouseTime == 1) this.#mousePressHandler(e);
		else this.#mousePressingHandler(e);
		if (this.#mouseTime < 2 && this.#mouseTime > 0) this.#mouseTime++;
		window.setTimeout(() => this.#mouseDownHandler(e), 1000 / TSOButton.FPS.mouse);
	}
	#mousePressHandler(e) {
		if (this.checkType(this.mousePressHandler)) this.mousePressHandler(this, e);
	}
	#mousePressingHandler(e) {
		if (this.checkType(this.mousePressingHandler)) this.mousePressingHandler(this, e);
	}
	#mouseMoveHandler(e) {
		if (this.checkType(this.mouseMoveHandler)) this.mouseMoveHandler(this, e);
	}
	#mouseReleasedHandler(e) {
		if (this.checkType(this.mouseReleasedHandler)) this.mouseReleasedHandler(this, e);
	}
	#mouseClickHandler(e) {
		if (this.checkType(this.mouseClickHandler)) this.mouseClickHandler(this, e);
	}
	#mouseOutHandler() {
		if (this.checkType(this.mouseOutHandler)) this.mouseOutHandler(this);
	}
	#mouseOverHandler() {
		if (this.checkType(this.mouseOverHandler)) this.mouseOverHandler(this);
	}
	#mouseLeaveHandler() {
		if (this.checkType(this.mouseLeaveHandler)) this.mouseLeaveHandler(this);
	}

	#touchStartHandler(e) {
		this.#nowTouch = 1;
		if (TSOButton.touchUnifiedMouse) {
			this.#mouseDownHandler(e);
		} else {
			if (this.checkType(this.touchStartHandler)) this.touchStartHandler(this, e);
			this.#touchingHandler();
			if (this.touchedElement != e.target)
				this.#touchOverHandler();
		}
		this.touchedElement = e.target;
	}
	#touchingHandler() {
		if (this.#nowTouch == 0) return;
		if (this.checkType(this.touchingHandler)) this.touchingHandler(this);
		setTimeout(() => this.#touchingHandler(), 1000 / TSOButton.FPS.touch);
	}
	#touchEndHandler(e) {
		this.#nowTouch = 0;
		if (TSOButton.touchUnifiedMouse) {
			this.#mouseReleasedHandler(e);
		} else {
			if (this.checkType(this.touchEndHandler)) this.touchEndHandler(this, e);
			if (this.touchedElement != e.target)
				this.#touchLeaveHandler();
		}
		this.touchedElement = e.target;
	}
	#touchMoveHandler(e) {
		if (TSOButton.touchUnifiedMouse) this.#mouseMoveHandler(e);
		else if (this.checkType(this.touchMoveHandler)) this.touchMoveHandler(this, e);
		//this.touchedElement = e.target;
	}
	#touchCancelHandler(e) {
		if (this.checkType(this.touchCancelHandler)) this.touchCancelHandler(this, e);
	}
	#touchOverHandler() {
		if (TSOButton.touchUnifiedMouse) {
			this.#mouseOverHandler();
		} else {
			if (this.checkType(this.touchOverHandler)) this.touchOverHandler(this);
		}
	}
	#touchLeaveHandler() {
		if (TSOButton.touchUnifiedMouse) {
			this.#mouseLeaveHandler();
		} else {
			if (this.checkType(this.touchLeaveHandler)) this.touchLeaveHandler(this);
		}
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
	reloadOutlineStyle() {
		this.#myOutline.latest = window.getComputedStyle(this).outline;
	}
	checkType(arg, tp = "function") {
		return (typeof arg == tp);
	}
}

window.addEventListener("resize", () => {
	document.dispatchEvent(new CustomEvent(TSOButton.myEventName));
});

customElements.define(TSOButton.myElementName, TSOButton);