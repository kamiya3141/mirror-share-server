var attrName_SetByScript = "data-mydef--set-by-script";

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
		this["element"].querySelector(this["message--id"]).innerHTML = String(input);
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
			if (this["message-array"].length == 0) {
				console.log("abc");
				return;
			}
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

MyAlertMessageInfoObject["__init__"]();

function myAlertMessage(_str = "Alert Message Template.") {
	MyAlertMessageInfoObject["open-event"](_str);
}

function myConfirmMessage(_str) {
	const res = window.confirm(_str);
	return res;
}


function get_SetByScript(elem) {
	return elem.getAttribute(attrName_SetByScript) == "true";
}
function edit_SetByScript(elem, input_tf = "auto") {
	let set_data = (input_tf != true && input_tf != false) ? !get_SetByScript(elem) : input_tf;
	elem.setAttribute(attrName_SetByScript, String(set_data));
}