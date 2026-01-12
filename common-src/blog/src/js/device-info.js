var device = {
	"force-theme": false,
	"theme": true,
	"force-mobile": false,
	"mobile": true,
	"width": 0,
	"height": 0,
	"realWidth": 0,
	"realHeight": 0,
	"DEBUGMODE": true
};

function editDeviceInformation(_key = "", _value = null) {
	if (Object.hasOwn(device, _key))
		device[_key] = _value;
	else
		console.error(`function error: "editDeviceInformation"\n\tマップ変数:deviceに${_key}というキーはありません`);
	reloadDeviceInformation();
}

function reloadDeviceInformation() {
	device["width"] = Number(getCSSLengthValue("--myStylingWidth"));
	device["height"] = Number(getCSSLengthValue("--myStylingHeight"));
	device["realWidth"] = Number(getCSSLengthValue("--myStylingRealWidth"));
	device["realHeight"] = Number(getCSSLengthValue("--myStylingRealHeight"));
	device["mobile"] = checkCurrentDeviceMobile();
	if (device["force-mobile"] === false)
		device["force-mobile"] = Boolean(!device["mobile"] && device["width"] < device["height"]);
	document.body.className = (device["force-mobile"] || device["mobile"] ? "mobile" : "desktop");
	setTheme(["force-theme", "theme", "force-mobile", "mobile"].map((v, i) => Number(Boolean(device[v])) * (2 ** i)).reduce((pv, cv, idx) => pv + cv, 0));
}

window.addEventListener("resize", () => {
	reloadDeviceInformation();
});
window.addEventListener("load", () => {
	reloadDeviceInformation();
});

reloadDeviceInformation();

useOldUserAgentDataValue = device["DEBUGMODE"];