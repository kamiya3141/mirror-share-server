const joinBaseHostname = pathname => (pathname = String(pathname), `${winMyHrefPTCHostname}${(pathname[0] != "/" ? "/" : "")}${pathname}`);
const allScriptSettingObjectArrayObject = {
	"common": [
		{
			"src": "src/js/utils.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/device-info.js",
			"type": "text/javascript"
		},
		{
			"src": "src/js/setup.js",
			"type": "text/javascript"
		}
	],
	"after": [
		{
			"src": "src/js/after.js",
			"type": "text/javascript"
		}
	],
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

const hasFlag = _flg => new URL(winMyHref).searchParams.has(_flg);
const getFlag = _flg => new URL(winMyHref).searchParams.get(_flg);

page_flag.forEach(c => setScriptObjectKey = (hasFlag(c) ? c : setScriptObjectKey));

let resultScriptSettingObjectArray = [...allScriptSettingObjectArrayObject["common"], ...allScriptSettingObjectArrayObject[setScriptObjectKey], ...allScriptSettingObjectArrayObject["after"]];

// ↓ カンマ演算子使ってるよ、読みづらいね(笑)
resultScriptSettingObjectArray.map(scriptSettingObject => (scriptSettingObject["defer"] = "", scriptSettingObject["src"] = `./${scriptSettingObject["src"]}`, scriptSettingObject)).forEach(scriptSettingObject => {
	const scriptElement = document.createElement("script");
	Object.entries(scriptSettingObject).forEach(([attributeName, attributeValue]) => scriptElement.setAttribute(attributeName, attributeValue));
	document.body.appendChild(scriptElement);
});
// joinBaseHostname(scriptSettingObject["src"])