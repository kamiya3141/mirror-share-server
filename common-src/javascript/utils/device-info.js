function resetDeviceInformationData(allowDisplayWarningMessage = true) {
	if (allowDisplayWarningMessage)
		myAlertMessage("ユーザデータを初期化します。\nページがリロードされると元に戻るためご注意ください。");
	setOriginDeviceValueForDevice();
	document.dispatchEvent(new CustomEvent("setting-display-reload"));
}

function removeDeviceInformationData(allowDisplayWarningMessage = true) {
	resetDeviceInformationData(false);
	setDeviceDataForLocalStorage(true);
	if (allowDisplayWarningMessage)
		myAlertMessage("ユーザーデータを削除しました。");
}

function setOriginDeviceValueForDevice() {
	Object.assign(device, origin_device);
}

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
	setDeviceDataForLocalStorage(_key == "save--user-data--localstorage" ? true : getDeviceInformation("save--user-data--localstorage"));
}

function reloadDeviceInformation(add_msg = "") {

	if (add_msg == "init")
		syncDeviceDataForLocalStorage();

	editDeviceInformation("width", Number(getCSSLengthValue("--myStylingWidth")));
	editDeviceInformation("height", Number(getCSSLengthValue("--myStylingHeight")));
	editDeviceInformation("realWidth", Number(getCSSLengthValue("--myStylingRealWidth")));
	editDeviceInformation("realHeight", Number(getCSSLengthValue("--myStylingRealHeight")));

	setThemeArgsHistoryObject["forceTheme"] = getDeviceInformation("force-theme");
	// edit の方に書くかは今後次第
	setThemeArgsHistoryObject["themeType"] = getDeviceInformation("force-theme") ? getDeviceInformation("theme-type") : checkCurrentSystemThemeString();


	setThemeArgsHistoryObject["forceDevice"] = getDeviceInformation("force-device");

	// edit の方に書くかは今後次第
	const _tf = Boolean(document.documentElement.getAttribute("data-my-device-type") == "mobile" ? (getDeviceInformation("realWidth") < getDeviceInformation("realHeight")) : (getDeviceInformation("width") < getDeviceInformation("height")));
	setThemeArgsHistoryObject["deviceType"] = getDeviceInformation("force-device") ? getDeviceInformation("device-type") : (getDeviceInformation("allow--changing--device-mode--for--display-size") ? checkCurrentDeviceString(_tf) : checkCurrentDeviceString());
	setThemeArgsHistoryObject["preferColor"] = getDeviceInformation("prefer-color");

	setThemeArgsHistoryObject["fontFamily"] = getCSSLengthValue(`--${getDeviceInformation("font-family")}`);

	setTheme(add_msg.length == 0 ? "reloadD" : add_msg);
}


// localStorage

function setDeviceDataForLocalStorage(set_data_flag = false) {
	if (set_data_flag)
		localStorage.setItem(localStorageDeviceObjectKeyName, JSON.stringify(device));
}

function getDeviceDataForLocalStorage() {
	return JSON.parse(localStorage.getItem(localStorageDeviceObjectKeyName));
}

function syncDeviceDataForLocalStorage() {
	Object.assign(device, getDeviceDataForLocalStorage());
	device["DEBUGMODE"] = origin_device["DEBUGMODE"];
}

const localStorageDeviceObjectKeyName = "device-data";

const origin_device = {
	"force-theme": false,
	"theme-type": "system",
	"force-device": false,
	"device-type": "device",
	"width": 0,
	"height": 0,
	"realWidth": 0,
	"realHeight": 0,
	"prefer-color": "#00ff00",
	"font-family": "note-sans-jp",
	"setting-display-init-item-index": 0,
	"allow--changing--device-mode--for--display-size": false,
	"allow--opening--setting-display--after--reload": false,
	"save--user-data--localstorage": false,
	"setting-display-open": false,
	"DEBUGMODE": true
};

var device = {};


setOriginDeviceValueForDevice();
if (localStorage.getItem(localStorageDeviceObjectKeyName) == null)
	setDeviceDataForLocalStorage(true);

// windowイベント設定
// tamura-first-load.js のresize-eventの実行をキャンセル
WINV["resize-event-cancel"] = true;
window.addEventListener("resize", e => {
	reloadDeviceInformation(`window.event.${e.type}`);
});

window.visualViewport.addEventListener("resize", e => {
	reloadDeviceInformation(`window.visualViewport.event.${e.type}`);
});

window.addEventListener("load", e => {
	reloadDeviceInformation(`window.event.${e.type}`);
});

// ここのdevice直接参照の部分は変更するな,DEBUGMODEの値は変えてもいい
useOldUserAgentDataValue = device["DEBUGMODE"];

// "init" は消すな
reloadDeviceInformation("init");
