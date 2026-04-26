const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const allScriptSettingObjectArrayObject = {
	"main": [
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
		},
		{
			"src": "src/js/after.js",
			"type": "text/javascript"
		}
	],
	"embed": [
		{
			"src": "src/js/embed.js",
			"type": "text/javascript"
		}
	]
};

const embed_page_flag = new URL(winMyHref).searchParams.get("blog--embed-page");

let resultScriptSettingObjectArray = allScriptSettingObjectArrayObject[embed_page_flag ? "embed" : "main"];

// ↓ カンマ演算子使ってるよ、読みづらいね(笑)
resultScriptSettingObjectArray.map(scriptSettingObject => (scriptSettingObject["defer"] = "", scriptSettingObject["src"] = joinBaseHostname(scriptSettingObject["src"]), scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});