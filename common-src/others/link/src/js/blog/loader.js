const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const scriptSettingObjectArray = [
	{
		"src": "src/js/device-info.js",
		"type": ""
	},
	{
		"src": "src/js/setup.js",
		"type": ""
	},
	{
		"src": "src/js/script.js",
		"type": "module"
	}
].map(scriptSettingObject => (scriptSettingObject["src"] = joinBaseHostname(scriptSettingObject["src"]), scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});