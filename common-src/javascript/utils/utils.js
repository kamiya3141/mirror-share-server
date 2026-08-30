var attrName_SetByScript = "data-mydef--set-by-script";

const utilsSleep = ms => new Promise(rslv => setTimeout(rslv, ms));

const MyAlertMessageInfoObject = {
	"alert--id": "#alert-display-section",
	"message--id": "#alert--message",
	"ok-button--id": "#alert--ok-button",
	"message-array": [],
	get "element"() {
		return document.querySelector(this["alert--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		this["element"].querySelector(this["message--id"]).innerHTML = String(input).replaceAll("\n", "<br>");
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	},
	get "open-event-var"() {
		return new CustomEvent("alert--event--open");
	},
	"open-event"(input_str = "", setByCloseEvent = false) {
		if (input_str.length > 0)
			this["message-array"].push(input_str);
		if (this["message-array"].length == 1 || setByCloseEvent)
			window.setTimeout(() => this["element"].dispatchEvent(this["open-event-var"]), setByCloseEvent ? 0 : 250);
	},
	get "close-event-var"() {
		return new CustomEvent("alert--event--close");
	},
	"close-event"() {
		this["element"].dispatchEvent(this["close-event-var"]);
	},
	"__init__"() {
		this["element"].addEventListener("alert--event--open", () => {
			if (this["message-array"].length == 0)
				return;
			const ___msg = this["message-array"].shift();
			this["message"] = ___msg;
			switchingOpenDisplay(this["element"]);
		});
		this["element"].addEventListener("alert--event--close", () => {
			this["message"] = "";
			if (this["message-array"].length > 0)
				this["open-event"]("", true);
		});
	}
};
const MyConfirmMessageInfoObject = {
	"confirm--id": "#confirm-display-section",
	"message--id": "#confirm--message",
	"ok-button--id": "#confirm--ok-button",
	"cancel-button--id": "#confirm--cancel-button",
	"result": null,
	get "element"() {
		return document.querySelector(this["confirm--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		this["element"].querySelector(this["message--id"]).innerHTML = String(input).replaceAll("\n", "<br>");
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	},
	get "cancel-button"() {
		return this["element"].querySelector(this["cancel-button--id"]);
	},
	get "open-event-var"() {
		return new CustomEvent("confirm--event--open");
	},
	async "open-event"(input_str = "") {
		this["message"] = input_str;
		this["element"].dispatchEvent(this["open-event-var"]);
		while (this["result"] == null)
			await utilsSleep(250);
		const res = this["result"];
		this["result"] = null;
		return res;
	},
	get "close-event-var"() {
		return new CustomEvent("confirm--event--close");
	},
	"close-event"() {
		this["element"].dispatchEvent(this["close-event-var"]);
	},
	"__init__"() {
		this["element"].addEventListener("confirm--event--open", () => switchingOpenDisplay(this["element"]));
		this["element"].addEventListener("confirm--event--close", () => this["message"] = "");
	}
};

const MyDataMessageInfoObject = {
	"data--id": "#data-display-section",
	"message--id": "#data--message",
	"input--id": "#data--text-input",
	"ok-button--id": "#data--ok-button",
	"cancel-button--id": "#data--cancel-button",
	"result": null,
	get "element"() {
		return document.querySelector(this["data--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		this["element"].querySelector(this["message--id"]).innerHTML = String(input).replaceAll("\n", "<br>");
	},
	get "input"() {
		return this["element"].querySelector(this["input--id"]);
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	},
	get "cancel-button"() {
		return this["element"].querySelector(this["cancel-button--id"]);
	},
	get "open-event-var"() {
		return new CustomEvent("data--event--open");
	},
	async "open-event"(input_str = "", input_init_value = "") {
		this["message"] = input_str;
		this["input"].value = input_init_value;
		this["input"].addEventListener("input", e => this["ok-button"].setAttribute("data-mydef--localdata--input-data", this["input"].value));
		this["element"].dispatchEvent(this["open-event-var"]);
		while (this["result"] == null)
			await utilsSleep(250);
		const res = this["result"];
		this["result"] = null;
		return res;
	},
	get "close-event-var"() {
		return new CustomEvent("data--event--close");
	},
	"close-event"() {
		this["element"].dispatchEvent(this["close-event-var"]);
	},
	"__init__"() {
		this["element"].addEventListener("data--event--open", () => switchingOpenDisplay(this["element"]));
		this["element"].addEventListener("data--event--close", () => {
			this["message"] = "";
			this["input"].value = "";
		});
	}
};

MyAlertMessageInfoObject["__init__"]();
MyConfirmMessageInfoObject["__init__"]();
MyDataMessageInfoObject["__init__"]();

function myAlertMessage(_str = "Alert Message Template.") {
	MyAlertMessageInfoObject["open-event"](_str);
}

async function myConfirmMessage(_str = "Confirm Message Template.") {
	const res = await MyConfirmMessageInfoObject["open-event"](_str);
	return res;
}

async function myDataMessage(_str = "InputData Message Template.", _init_value = "", func = _res => _res) {
	const res0 = await MyDataMessageInfoObject["open-event"](_str, _init_value);
	const res = func(res0);
	return res;
}

function get_SetByScript(elem) {
	return elem.getAttribute(attrName_SetByScript) == "true";
}
function edit_SetByScript(elem, input_tf = "auto") {
	let set_data = (input_tf != true && input_tf != false) ? !get_SetByScript(elem) : input_tf;
	elem.setAttribute(attrName_SetByScript, String(set_data));
}

function setDocumentTitle(_str) {
	if (document.title == "ブログ - TSHUTO")
		document.title = [_str, document.title].join(` | `);
}

/**
 * 
 * @param {String} rgb 書くの面倒だったからchatgptに作ってもらった
 * @returns {String}
 */
function rgbToHex(rgb) {
	const nums = String(rgb).match(/[\d.]+/g);
	const [r, g, b, a] = nums.map(Number);
	let hex = `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
	if (a !== undefined)
		hex += Math.round(a * 255).toString(16).padStart(2, "0");
	return hex;
}

function createRDM() {
	return Math.floor(Math.random() * (10 ** 12));
}

function createPopoverElementsStr(el_str0 = "", el_str1 = el_str0, dir = "width") {
	const rdm = createRDM();
	el_str1 = !el_str1 ? el_str0 : el_str1;
	dir = dir == "width" ? dir : "height";
	return `
		<div class="utils--popover--elements--popover--root" data-mydef--utils--popover--elements--popover--root--img-dir="${dir}">
			<button class="utils--popover--elements--popover--show-button" popovertarget="utils--popover--elements--popover-${rdm}">
				${el_str0}
			</button>
			<div id="utils--popover--elements--popover-${rdm}" class="utils--popover--elements--popover-class" popover="auto">
				<div class="utils--popover--elements--popover--close-button-box">
					<button popovertarget="utils--popover--elements--popover-${rdm}">CLOSE</button>
				</div>
				<div class="utils--popover--elements--popover--main-contents-box">
					${el_str1}
				</div>
			</div>
		</div>
	`.replaceAll("\n", "").replaceAll("\t", "");
}
function addEventPopoverElementsMiniEvent(btn, ppov, stop_propagation = false) {
	btn.addEventListener("click", e => {
		if (stop_propagation)
			e.stopPropagation();
		ppov.showPopover();
		const btn_rect = btn.getBoundingClientRect();
		const ppov_rect = ppov.getBoundingClientRect();
		ppov.style.left = `${Math.max(Number(getCSSLengthValue("--myStylingWidth")) / 8, Math.min(btn_rect.right, window.innerWidth - ppov_rect.width))}px`;
		ppov.style.top = `${Math.max(Number(getCSSLengthValue("--myStylingHeight")) / 8, Math.min(btn_rect.bottom, window.innerHeight - ppov_rect.height))}px`;
	});
}
function imageViewerElement(...img_elm_strs) {
	const rdm = createRDM();
	const root_id = `utils--imgvwr--element--${rdm}`;
	const root_div = createDivElement("utils--imgvwr--element--root", root_id);
	const mainContentsBox_div = createDivElement("utils--imgvwr--element--main-contents-box");
	const leftBox_div = createScrollButtonDivElement("left", "&lt;", root_id);
	const rightBox_div = createScrollButtonDivElement("right", "&gt;", root_id);
	const mainContents_div = createDivElement("utils--imgvwr--element--main-contents");
	mainContents_div.innerHTML = `<div class="utils--imgvwr--element--img-box" data-mydef--utils--imgvwr--img-box--idx="0">${img_elm_strs.join("")}</div>`;

	mainContentsBox_div.appendChild(leftBox_div);
	mainContentsBox_div.appendChild(mainContents_div);
	mainContentsBox_div.appendChild(rightBox_div);
	root_div.appendChild(mainContentsBox_div);

	return root_div;
}

function imageViewerElementString(...img_elm_strs) {
	return imageViewerElement(...img_elm_strs).outerHTML.replaceAll("\n", "").replaceAll("\t", "");
}

function createScrollButtonDivElement(dir = "", btn_txt = "", id = "") {
	const div = createDivElement(`utils--imgvwr--element--button-box utils--imgvwr--element--${dir}-box`);
	div.innerHTML = `<button>${btn_txt}</button>`;
	// div.addEventListener("click", e => imgVwrButtonBoxOnClick(e, dir));
	div.setAttribute("onclick", `javascript:imgVwrButtonBoxOnClick(this, '${dir}', '${id}')`);
	return div;
}

function imgVwrButtonBoxOnClick(elem, dir, id) {
	const root = elem.parentElement;
	const img_box = root.querySelector(".utils--imgvwr--element--img-box");
	if (!img_box)
		return console.error("img_boxが存在しません");
	const chn = img_box.children;
	const chnl = chn.length;
	const idx = Number(img_box.getAttribute("data-mydef--utils--imgvwr--img-box--idx"));
	const add = dir.includes("right") ? 1 : -1;
	const rst_idx = ((idx + add) % chnl + chnl) % chnl;
	img_box.setAttribute("data-mydef--utils--imgvwr--img-box--idx", rst_idx);
	chn[rst_idx].scrollIntoView({
		behavior: "smooth",
		inline: "start",
		block: "nearest",
	});
}

function createDivElement(class_name = "", id = "") {
	const div = document.createElement("div");
	div.id = id;
	div.className = class_name;
	return div;
}