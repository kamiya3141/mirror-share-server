const localStorageDeviceObjectKeyName = "device-data";

var device = {
	"force-theme": false,
	"theme": false,
	"force-device": false,
	"mobile": false,
	"width": 0,
	"height": 0,
	"realWidth": 0,
	"realHeight": 0,
	"prefer-color": "#00ff00",
	"setting-display-init-item-index": 0,
	"save--user-data--localstorage": false,
	"setting-display-open": false,
	"DEBUGMODE": true
};

function getDeviceInformation(_key = "") {
	let ret_val = null;

	if (Object.hasOwn(device, _key))
		ret_val = device[_key];
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません\n${Object.entries(device).map(([k, v]) => (k + " : " + v)).join("\n")}`);

	return ret_val;
}

function editDeviceInformation(_key = "", _value = null) {
	if (Object.hasOwn(device, _key))
		device[_key] = _value;
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません\n${Object.entries(device).map(([k, v]) => (k + " : " + v)).join("\n")}`);
	setDeviceDataForLocalStorage(device["save--user-data--localstorage"]);
}

function reloadDeviceInformation(add_msg = "") {

	if (add_msg == "init" && localStorage.getItem(localStorageDeviceObjectKeyName) != null)
		syncDeviceDataForLocalStorage();

	editDeviceInformation("width", Number(getCSSLengthValue("--myStylingWidth")));
	editDeviceInformation("height", Number(getCSSLengthValue("--myStylingHeight")));
	editDeviceInformation("realWidth", Number(getCSSLengthValue("--myStylingRealWidth")));
	editDeviceInformation("realHeight", Number(getCSSLengthValue("--myStylingRealHeight")));

	setThemeArgsHistoryObject["forceTheme"] = device["force-theme"];
	setThemeArgsHistoryObject["themeLight"] = device["theme"];
	setThemeArgsHistoryObject["forceDevice"] = device["force-device"];
	setThemeArgsHistoryObject["deviceMobile"] = device["mobile"];

	setTheme();

	console.log(add_msg.length == 0 ? "reloadD" : add_msg, device, setThemeArgsHistoryObject);
}

function setDeviceDataForLocalStorage(set_data_flag = false) {
	if (set_data_flag)
		localStorage.setItem(localStorageDeviceObjectKeyName, JSON.stringify(device));
}

function getDeviceDataForLocalStorage() {
	return JSON.parse(localStorage.getItem(localStorageDeviceObjectKeyName));
}

function syncDeviceDataForLocalStorage() {
	Object.assign(device, getDeviceDataForLocalStorage());
}

window.addEventListener("resize", () => {
	reloadDeviceInformation("resize-event");
});
window.addEventListener("load", () => {
	reloadDeviceInformation("load-event");
});

useOldUserAgentDataValue = device["DEBUGMODE"];

// "init" は消すな
reloadDeviceInformation("init");
