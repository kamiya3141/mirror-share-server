var attrName_SetByScript = "data-mydef--set-by-script";

var myPMD = null;

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

MyAlertMessageInfoObject["__init__"]();
MyConfirmMessageInfoObject["__init__"]();

function myAlertMessage(_str = "Alert Message Template.") {
	MyAlertMessageInfoObject["open-event"](_str);
}

async function myConfirmMessage(_str) {
	//const res = window.confirm(_str);
	const res = await MyConfirmMessageInfoObject["open-event"](_str);
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