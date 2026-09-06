const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const allScriptSettingObjectArrayObject = {
	"main": [
		{
			"src": "src/js/display-all-articles.js"
		},
		{
			"src": "src/js/script.js"
		}
	],
	"edit": [
		{
			"src": "src/js/display-all-articles.js"
		},
		{
			"src": "src/js/appear-edit-display.js"
		},
		{
			"src": "src/js/control-sub-page.js",
			"type": "module"
		}
	],
	"new": [
		{
			"src": "src/js/create-new-md-page.js"
		},
		{
			"src": "src/js/control-sub-page.js",
			"type": "module"
		}
	],
	"embed": [
		{
			"src": "src/js/embed.js"
		}
	]
};

let setScriptObjectKey = "main";
const page_flag = ["edit", "new", "embed"];


page_flag.forEach(c => setScriptObjectKey = (hasFlag(c) ? c : setScriptObjectKey));

let resultScriptSettingObjectArray = allScriptSettingObjectArrayObject[setScriptObjectKey];

// ↓ カンマ演算子使ってるよ、読みづらいね(笑)
resultScriptSettingObjectArray.map(scriptSettingObject => (scriptSettingObject["defer"] = "", scriptSettingObject["src"] = `./${scriptSettingObject["src"]}`, scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).reverse().forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});