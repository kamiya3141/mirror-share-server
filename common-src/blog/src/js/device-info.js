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
	"save--user-data--localstorage": false,
	"DEBUGMODE": true
};

function getDeviceInformation(_key = "") {
	let ret_val = null;

	if (Object.hasOwn(device, _key))
		ret_val = device[_key];
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません`);

	return ret_val;
}

function editDeviceInformation(_key = "", _value = null) {
	if (Object.hasOwn(device, _key))
		device[_key] = _value;
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません`);
}

function reloadDeviceInformation(add_msg = "") {
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

window.addEventListener("resize", () => {
	reloadDeviceInformation("resize-event");
});
window.addEventListener("load", () => {
	reloadDeviceInformation("load-event");
});

useOldUserAgentDataValue = device["DEBUGMODE"];

reloadDeviceInformation("init");
