const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const scriptSettingObjectArray = [
	{
		"src": "src/js/device-info.js",
		"type": "text/javascript"
	},
	{
		"src": "src/js/setup.js",
		"type": "text/javascript"
	},
	{
		"src": "src/js/script.js",
		"type": "module"
	}
	// ↓ カンマ演算子使ってるよ、読みづらいね(笑)
].map(scriptSettingObject => (scriptSettingObject["src"] = joinBaseHostname(scriptSettingObject["src"]), scriptSettingObject["defer"] = "", scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});