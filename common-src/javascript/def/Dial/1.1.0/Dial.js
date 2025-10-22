if (!window.TSObjectExist) console.error("Object.js v1.2.x と Button.js v2.3.6 ~ をDial.jsの前に読み込んでください。");

class TSODial extends TSOButton {

	#dialValue = 0;
	#dialDegree = 0;
	#deltaDegree = 0;
	#deltaDegreeInputLock = false;
	#sensitivenessValue = 1;
	#sensitivenessButtonUsing = false;
	#dialValueButtonUsing = false;

	static savedDefaultMyWH = [];
	static savedPreWindowWH = [window.innerWidth, window.innerHeight];
	static #myElementNameValue = window.getMyElementName();
	static cachedFileName = window.getMyFileName(false, TSODial.mySrc);

	constructor(btn_lbl, btn_type) {
		super(btn_lbl, btn_type);
		if (this.local_cached) this.init2();
		else this.addEventListener(TSObject.loadedEventName, () => {
			this.init2();
		});
	}

	static get mySrc() {
		let _str = this.#myElementNameValue.split("-").pop();
		return document.currentScript ? document.currentScript.src : `https://jsd.tshuto.com?n=${String(_str[0]).toUpperCase() + _str.slice(1)}&v=l`;
	}

	init2() {
		if (!window.TSObjectTemplateMap.has(TSODial.cachedFileName)) {
			const file_name = window.TSObjectTemplateFileUrl(TSODial.cachedFileName);
			fetch(file_name).then(res => res.text()).then(templateText => {
				window.TSObjectTemplateMap.set(TSODial.cachedFileName, new DOMParser().parseFromString(templateText, "text/html"));
				this.after_init2();
			});
		} else this.after_init2();
	}
	after_init2() {
		this.shadowRoot.prepend(window.TSObjectTemplateMap.get(TSODial.cachedFileName).getElementById("template").content.cloneNode(true));
		const my_event = new CustomEvent(TSODial.myEventName);
		if (TSOButton.mySlotColorTypeNameArray.some(c => this.colorType == c)) {
			const _new_arr = ["bc", "b", "c"].map(c => `var(--tsob-${this.colorType}-${c})`);
			this.fill = _new_arr[0];
			this.stroke = _new_arr[1];
			this.textColor = _new_arr[2];
		}

		TSODial.savedDefaultMyWH = [this.width, this.height];
		if (this.width < this.height) this.height = this.width;
		else this.width = this.height;

		this.radius = "100rem";
		this.positionType = "cxcy";
		this.fill = "var(--clear)";
		this.stroke = "var(--clear)";
		const _mouse_func_xywh = (self, e) => {
			const _rect = self.getBoundingClientRect();
			const _mx = (e.touches ? e.touches[0] : e).clientX;
			const _my = (e.touches ? e.touches[0] : e).clientY;
			const _w = _rect.width;
			const _h = _rect.height;
			const _x = _rect.left;
			const _y = _rect.top;
			return [_mx, _my, _w, _h, _x, _y];
		};
		const _mouse_func_judge = (self, e) => {
			const _rlt = _mouse_func_xywh(self, e);
			const _x = _rlt[0];
			const _rx = _rlt[4];
			const _rw = _rlt[2];
			return (_x > _rx + _rw / 2);
		};

		this.setDisabledFunc(this);
		this.mousePressHandler = () => this.#dialValueButtonUsing = true;
		this.mouseReleasedHandler = () => {
			this.#dialValueButtonUsing = false;
			this.#deltaDegreeInputLock = false;
		}
		this.mouseLeaveHandler = () => {
			this.#dialValueButtonUsing = false;
			this.#deltaDegreeInputLock = false;
		}
		this.mouseMoveHandler = (self, e) => {
			if (this.#sensitivenessButtonUsing || (!TSOButton.judgeMobile && !this.#dialValueButtonUsing)) return;
			const _rst = _mouse_func_xywh(self, e);
			const v = {
				d: 0,
				x: 0,
				y: 0,
				tar: {
					x: _rst[0],
					y: _rst[1]
				},
				ct: {
					x: _rst[4] + _rst[2] / 2,
					y: _rst[5] + _rst[3] / 2
				}
			};
			v.d = this.#dist(v.tar.x, v.tar.y, v.ct.x, v.ct.y);
			v.x = (v.tar.x - v.ct.x) / v.d;
			v.y = (v.tar.y - v.ct.y) / v.d;
			const __deg0 = Math.floor(Math.atan2(v.y, v.x) / Math.PI * 180);
			const __deg1 = __deg0 + 90;
			const __deg2 = __deg1 < 0 ? 360 + __deg1 : __deg1;
			const __deg3 = __deg2 - (v.tar.x < v.ct.x ? 360 : 0);
			if (!this.#deltaDegreeInputLock) this.#deltaDegree = __deg3 - this.dialDegree;
			this.#deltaDegreeInputLock = true;
			const __last_r = __deg3 - this.#deltaDegree;
			const __pow = (this.dialRange.g_deg - this.dialRange.s_deg) / (this.dialRange.step - 1) * (this.sensitivenessValue / this.sensitivenessMax);
			if ((__last_r - this.dialRange.s_deg) % __pow == 0) this.dialDegree = __last_r;
		};

		this.setDisabledFunc(this.dialValueButton);

		this.sensitiveButton.style.zIndex = `${this.dialRange.step + 1}`;
		this.sensitiveButton.text = `x${this.sensitivenessValue}`;
		this.sensitiveButton.mousePressHandler = (self, e) => {
			if (this.#dialValueButtonUsing) return;
			this.#sensitivenessButtonUsing = true;
			const _tf = _mouse_func_judge(self, e);
			self.style.outlineColor = `var(--tso-${_tf ? "red" : "blue"})`;
			self.reloadOutlineStyle();
		}
		this.sensitiveButton.mouseReleasedHandler = () => this.#sensitivenessButtonUsing = false;
		this.sensitiveButton.mouseClickHandler = (self, e) => {
			if (this.#dialValueButtonUsing) return;
			const _tf = _mouse_func_judge(self, e);
			this.sensitivenessValue += (_tf ? 1 : -1);
			if (this.sensitivenessValue < this.sensitivenessMin) this.sensitivenessValue = this.sensitivenessMin;
			else if (this.sensitivenessValue > this.sensitivenessMax) this.sensitivenessValue = this.sensitivenessMax;
			self.shadowRoot.querySelector(`slot[name="text"]`).innerHTML = `x${this.sensitivenessValue}`;
		};
		this.sensitiveButton.blurHandler = self => self.style.outlineWidth = "0";

		for (let i = 0; i < this.dialRange.step; i++) {
			const _tsobj = new TSObject();
			_tsobj.id = `dial-parts-split-${i}`;
			_tsobj.fill = "white";
			_tsobj.stroke = null;
			const _r = (i / (this.dialRange.step - 1) * (this.dialRange.g_deg - this.dialRange.s_deg)) + this.dialRange.s_deg - 90;
			const _w = 0.125;
			const _h = 12.5;
			const _x = 50 + Math.cos(_r / 180 * Math.PI) * (50 - _h / 2);
			const _y = 50 + Math.sin(_r / 180 * Math.PI) * (50 - _h / 2);
			_tsobj.shapeValue = `${_x}%,${_y}%,${_w}rem,${_h}%`;
			_tsobj.positionType = "cxcy";
			_tsobj.rad = _r + 90;
			this.shadowRoot.appendChild(_tsobj);
		}
		this.dialValue = 0;

		document.addEventListener(TSODial.myEventName, () => {
			const now_wh = [window.innerWidth, window.innerHeight];
			if (now_wh[0] < now_wh[1] && TSODial.savedPreWindowWH[0] < TSODial.savedPreWindowWH[1]) {
				this.width = TSODial.savedDefaultMyWH[0] * (now_wh[0] / TSODial.savedPreWindowWH[0]);
				this.height = TSODial.savedDefaultMyWH[1] * (now_wh[1] / TSODial.savedPreWindowWH[1]);
				TSODial.savedPreWindowWH = now_wh.slice();
			}
			if (this.width < this.height) this.height = this.width;
			else this.width = this.height;
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

	setDisabledFunc(arg) {
		arg.baseMouseLeave = false;
		arg.baseMouseOver = false;
		arg.allowBlur = false;
		arg.allowFocus = false;
	}

	/**
	 * @returns {TSOButton}
	 */
	get sensitiveButton() {
		return this.shadowRoot.querySelector("ts-button#sensitive-button");
	}
	/**
	 * @returns {TSOButton}
	 */
	get dialValueButton() {
		return this.shadowRoot.querySelector("ts-button#dial-value-button");
	}

	get dialRange() {
		return {
			min: 0,
			max: 100,
			step: 11,
			s_deg: -150,
			g_deg: 150
		};
	}
	/**
	 * @param {number} arg TSODial.prototype.dialRange.min ~ TSODial.prototype.dialRange.max
	 */
	set dialValue(arg) {
		if (this.dialValue + arg < this.dialRange.min) arg = this.dialRange.min;
		else if (this.dialValue + arg > this.dialRange.max) arg = this.dialRange.max;
		this.#dialValue = arg;
		this.dialValueButton.rad = (arg / this.dialRange.max) * (this.dialRange.g_deg - this.dialRange.s_deg) + this.dialRange.s_deg;
		this.#dialDegree = this.dialValueButton.rad;
	}
	get dialValue() {
		return this.#dialValue;
	}
	set dialDegree(arg) {
		if (arg < this.dialRange.s_deg) arg = this.dialRange.s_deg;
		else if (arg > this.dialRange.g_deg) arg = this.dialRange.g_deg;
		this.#dialDegree = arg;
		this.dialValueButton.rad = this.dialDegree;
		this.#dialValue = (this.dialDegree - this.dialRange.s_deg) / (this.dialRange.g_deg - this.dialRange.s_deg) * this.dialRange.max;
	}
	get dialDegree() {
		return this.#dialDegree;
	}

	set sensitivenessValue(arg) {
		this.#sensitivenessValue = arg;
	}
	get sensitivenessValue() {
		return this.#sensitivenessValue;
	};
	get sensitivenessMin() {
		return 1;
	}
	get sensitivenessMax() {
		return 10;
	}

	#dist(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
	}
}

window.addEventListener("resize", e => {
	document.dispatchEvent(new CustomEvent(TSODial.myEventName));
});

customElements.define(TSODial.myElementName, TSODial);