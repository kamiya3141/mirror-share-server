var attrName_SetByScript = "data-mydef--set-by-script";

const MyAlertMessageInfoObject = {
	"alert--id": "#alert-display-section",
	"message--id": "#alert--message",
	"ok-button--id": "#alert--ok-button",
	get "element"() {
		return document.querySelector(this["alert--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		console.log(this["element"], "message");
		this["element"].querySelector(this["message--id"]).innerHTML = String(input);
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	}
};

function myAlertMessage(_str = "Alert Message Template.") {
	MyAlertMessageInfoObject["message"] = _str;
	switchingOpenDisplay(MyAlertMessageInfoObject["element"]);
	// window.alert(_str);
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