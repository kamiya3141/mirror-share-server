const localStorageDeviceObjectKeyName = "device-data";

const origin_device = {
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

var device = {};

setOriginDeviceValueForDevice();
if (localStorage.getItem(localStorageDeviceObjectKeyName) == null)
	setDeviceDataForLocalStorage(true);

function resetDeviceInformation() {
	/*
	ユーザデータの削除を警告する処理をここに挟む
	*/
	setOriginDeviceValueForDevice();
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

	if (_key == "save--user-data--localstorage" && _value == false) {
		resetDeviceInformation();
	}

	if (Object.hasOwn(device, _key))
		device[_key] = _value;
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません\n${Object.entries(device).map(([k, v]) => (k + " : " + v)).join("\n")}`);
	setDeviceDataForLocalStorage(device["save--user-data--localstorage"]);
}

function reloadDeviceInformation(add_msg = "") {

	if (add_msg == "init")
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
}

// windowイベント設定

window.addEventListener("resize", () => {
	reloadDeviceInformation("resize-event");
});
window.addEventListener("load", () => {
	reloadDeviceInformation("load-event");
});

// ここのdevice直接参照の部分は変更するな,DEBUGMODEの値は変えてもいい
useOldUserAgentDataValue = device["DEBUGMODE"];

// "init" は消すな
reloadDeviceInformation("init");
