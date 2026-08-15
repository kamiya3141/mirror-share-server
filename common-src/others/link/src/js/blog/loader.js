const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const allScriptSettingObjectArrayObject = {
	"main": [
		{
			"src": "src/js/display-all-articles.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/script.js",
			"type": ""
		}
	],
	"edit": [
		{
			"src": "src/js/display-all-articles.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/appear-edit-display.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/control-sub-page.js",
			"type": "module"
		}
	],
	"new": [
		{
			"src": "src/js/create-new-md-page.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/control-sub-page.js",
			"type": "module"
		}
	],
	"embed": [
		{
			"src": "src/js/embed.js",
			"type": "text/javascript"
		}
	]
};

let setScriptObjectKey = "main";
const id_flag = "id";
const page_flag = ["edit", "new", "embed"];


page_flag.forEach(c => setScriptObjectKey = (hasFlag(c) ? c : setScriptObjectKey));

let resultScriptSettingObjectArray = allScriptSettingObjectArrayObject[setScriptObjectKey];

// ↓ カンマ演算子使ってるよ、読みづらいね(笑)
resultScriptSettingObjectArray.map(scriptSettingObject => (scriptSettingObject["defer"] = "", scriptSettingObject["src"] = `./${scriptSettingObject["src"]}`, scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});