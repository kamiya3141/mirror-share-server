/*
// テンプレートファイル内のtemplateを格納
const templateElementArray = [
	"toggle-switch"
].reverse();

for (let ifr_id of templateElementArray) {
	const clone = document.getElementById(ifr_id).contentWindow.document.querySelector("template");
	//console.log(clone);
	//	clone.id = ifr_id;
	document.body.prepend(clone);
}
*/
const codeLangTitle = document.getElementById("title-body");

const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");

const editorThemeSetSelectElement = document.getElementById("editor-theme-set-sel");
const pageThemeSetSelectElement = document.getElementById("page-theme-set-sel");
const restrictThemeSetSelectElement = document.getElementById("restrict-theme-set-sel");

const editorFontSetSelectElement = document.getElementById("editor-font-set-sel");
const pageFontSetSelectElement = document.getElementById("page-font-set-sel");

const useTabEditorSettingSetSelectElement = document.getElementById("editor-setting-use-tab-set-sel");
const tabSizeEditorSettingSetSelectElement = document.getElementById("editor-setting-tab-size-set-sel");
const autoIndentEditorSettingSetSelectElement = document.getElementById("editor-setting-auto-indent-set-sel");


const codeLangTitleObject = {
	"js": {
		"title": "JavaScript",
		"lang": "javascript",
		"file-path": "src/js/main-script-history.js"
	},
	"css": {
		"title": "CSS",
		"lang": "css",
		"file-path": "src/css/main-script-history.css"
	}
};

const outputResultConsole = (...input) => {
	const __str_eof__ = "<br>";
	input = input.map(s => String(s).replaceAll("\n", __str_eof__));
	consoleResult.innerHTML += `${input.join(__str_eof__)}${__str_eof__}`;
};
let sandboxIframeWindow = sandboxIframe.contentWindow;

sandboxIframeWindow.console.log = (...input) => outputResultConsole(...input);
sandboxIframeWindow.console.clear = () => outputResultConsole();
sandboxIframeWindow.addEventListener("error", e => {
	outputResultConsole(`Error: ${e.message}`);
	e.preventDefault();
});

let cacheMainScriptHistoryData = "";
let cacheThemeJsonData = {};
let cacheFontJsonData = {};

const PRIMARY_THEME_KIND_NAME = "default";
const defaultAddFontFamily = ", sans-serif";
const defaultEditorFontFamily = "'Explex'";
let defaultCommonThemeName = "";
const setDefaultCommonThemeName = () => {
	defaultCommonThemeName = `vs${checkCurrentSystemThemeLight() ? "" : "-dark"}`;
};
const getMyStylingFontSize = () => getCSSLengthValue("--myStylingFontSize");
const tabSizeMinMaxObject = {
	"min": 2,
	"max": 8
};

const BASE_URL = "https://share.tshuto.com/common-src/javascript";
const CREATE_MY_FETCH_URL = (mode = "r", key = "js") => {
	const result_url = new URL(`${BASE_URL}/src/php/server.php`);
	result_url.searchParams.set("rewrite-script-file-open-mode", mode);
	result_url.searchParams.set("rewrite-script-file-path", codeLangTitleObject[key]["file-path"]);
	return result_url;
};

const codeLangTitleSelectElement = document.createElement("select");
let codeLangTitleSelectedValue = "";
(() => {
	codeLangTitleSelectElement.id = "code-lang-title-select-element";
	Object.entries(codeLangTitleObject).forEach(([k, v], i) => {
		const lng_opt = document.createElement("option");
		lng_opt.value = k;
		lng_opt.textContent = v["title"];
		lng_opt.selected = Boolean(i == 0);
		if (i == 0)
			codeLangTitleSelectedValue = k;
		codeLangTitleSelectElement.appendChild(lng_opt);
	});
	codeLangTitle.appendChild(codeLangTitleSelectElement);
})();
editDeviceInformation("force-theme", true);

setDefaultCommonThemeName();

require.config({
	paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" }
});

require(["vs/editor/editor.main"], () => {

	(async function () {

		function createOptionElement(_opt_arg, _opt_add_arg = _opt_arg, selectedItem = null) {
			const opt = {
				"value": _opt_arg,
				"text-content": (_opt_add_arg == "unset" ? "default" : _opt_add_arg)
			};
			if (!_opt_arg)
				console.error("第一引数が無効な値に設定されています");
			else if (Array.isArray(_opt_arg))
				[opt["value"], opt["text-content"]] = [..._opt_arg];
			const optionElement = document.createElement("option");
			optionElement.value = opt["value"];
			optionElement.textContent = opt["text-content"];
			if (selectedItem && opt["value"] == selectedItem)
				optionElement.selected = true;
			return optionElement;
		}

		// タブ サイズ
		for (let i = tabSizeMinMaxObject["min"]; i <= tabSizeMinMaxObject["max"]; i++)
			tabSizeEditorSettingSetSelectElement.appendChild(createOptionElement(i, `TabSize: ${i}`, tabSizeMinMaxObject["min"] + 2));

		// テーマ セット
		const __FORCE_UPPER_CASE = false;
		const themeListJsonResponse = await fetch(`${WINV["mySourceFileBasePath"]}/common-src/javascript/src/json/my-themelist.json`);
		const themeListJsonData = await themeListJsonResponse.json();
		cacheThemeJsonData = themeListJsonData;
		for (let labelName of Object.keys(cacheThemeJsonData)) {
			const optgroupElement = document.createElement("optgroup");
			optgroupElement.label = __FORCE_UPPER_CASE ? labelName.toUpperCase() : labelName;
			for (let optionValue of Object.keys(cacheThemeJsonData[labelName])) {
				if (labelName != PRIMARY_THEME_KIND_NAME) {
					const res2 = await fetch(`https://cdn.jsdelivr.net/npm/monaco-themes/themes/${optionValue}.json`);
					const jsonData = await res2.json();
					cacheThemeJsonData[labelName][optionValue]["data"] = jsonData;
				}

				const optionElement = createOptionElement(optionValue);

				if (labelName == PRIMARY_THEME_KIND_NAME && optionValue == defaultCommonThemeName)
					optionElement.selected = true;

				optgroupElement.appendChild(optionElement);
			}
			editorThemeSetSelectElement.appendChild(optgroupElement);
		}
		// フォント セット
		const fontListJsonResponse = await fetch(`${WINV["mySourceFileBasePath"]}/common-src/javascript/src/json/my-fontlist.json`);
		const fontListJsonData = await fontListJsonResponse.json();
		cacheFontJsonData = fontListJsonData["font-data"];
		cacheFontJsonData.forEach(optionValue => {
			const optionElement = createOptionElement(`'${optionValue}'`, optionValue, "Explex");
			editorFontSetSelectElement.appendChild(optionElement);
			pageFontSetSelectElement.appendChild(optionElement.cloneNode(true));
		});

		await getMainScriptHitoryForRemoteFile();

		codeLangTitleSelectElement.addEventListener("change", async e => {
			await saveMainScriptHitoryForRemoteFile(false);
			codeLangTitleSelectedValue = e.target.value;
			await getMainScriptHitoryForRemoteFile();
		});
	})();

	const editor = monaco.editor.create(codeBody, {
		value: cacheMainScriptHistoryData,
		language: codeLangTitleObject[codeLangTitleSelectedValue]["lang"],
		theme: defaultCommonThemeName,
		fontSize: getMyStylingFontSize(),
		fontFamily: `'${defaultEditorFontFamily}'${defaultAddFontFamily}`,
		fontLigatures: true,
		automaticLayout: true,
		scrollBeyondLastLine: false,
		wordWrap: "off",
		scrollbar: {
			vertical: "hidden",
			horizontal: "auto",
			handleMouseWheel: true
		}
	});
	async function getMainScriptHitoryForRemoteFile() {
		const g_res = await fetch(CREATE_MY_FETCH_URL("r", codeLangTitleSelectedValue));
		const g_dt = await g_res.text();
		cacheMainScriptHistoryData = g_dt;
		editor.setValue(cacheMainScriptHistoryData);
	}
	async function saveMainScriptHitoryForRemoteFile(tf = false) {
		const s_res = await fetch(BASE_URL + "/src/php/server.php", {
			"method": "POST",
			"body": JSON.stringify({
				"data-type": "php-input",
				"data": cacheMainScriptHistoryData
			})
		});
		const s_dt = await s_res.text();
		if (s_dt != "true")
			console.log(s_dt);
		if (tf)
			editor.setValue(cacheMainScriptHistoryData);
	}
	codeBody.addEventListener("keydown", async e => {
		if (e.ctrlKey && String(e.key).toLowerCase() == "s") {
			await saveMainScriptHitoryForRemoteFile();
			e.preventDefault();
		}
	});

	function getSelectedValueInSelectElement(_selectElement) {
		const ret = _selectElement.options[_selectElement.selectedIndex];
		let retval = ret.value;
		return retval;
	}

	editorThemeSetSelectElement.addEventListener("change", e => setup());
	pageThemeSetSelectElement.addEventListener("change", e => {
		const val = e.currentTarget.value;
		editDeviceInformation("theme-type", val);
		reloadDeviceInformation();
	});
	restrictThemeSetSelectElement.addEventListener("change", e => {
		const val = e.currentTarget.value == "true";
		let pageThemeSelectedOptionValue = getSelectedValueInSelectElement(pageThemeSetSelectElement);
		pageThemeSelectedOptionValue = (pageThemeSelectedOptionValue == "system" ? checkCurrentSystemThemeLight() : pageThemeSelectedOptionValue == "light");
		const __themeDataArray = ["dark", "light"];
		if (val) {
			for (let c of [...editorThemeSetSelectElement.children]) {
				if (c.getAttribute("label") == __themeDataArray[Number(!Boolean(pageThemeSelectedOptionValue))])
					c.setAttribute("disabled", "true");
				else
					c.removeAttribute("disabled");
			}
		}
	});

	editorFontSetSelectElement.addEventListener("change", e => {
		setup();
	});
	pageFontSetSelectElement.addEventListener("change", e => {
		document.documentElement.style.setProperty("--myStylingFontFamily", `${getSelectedValueInSelectElement(pageFontSetSelectElement)}${defaultAddFontFamily}`);
		setup();
	});

	useTabEditorSettingSetSelectElement.addEventListener("change", e => {
		setup();
	});
	tabSizeEditorSettingSetSelectElement.addEventListener("change", e => {
		setup();
	});
	autoIndentEditorSettingSetSelectElement.addEventListener("change", e => {
		setup();
	});

	setup();

	function setup() {
		try {
			reloadEditorView();
		} catch (err) {
			setTimeout(() => {
				setup();
			}, 10);
		}
	}

	function reloadEditorView() {
		setDefaultCommonThemeName();
		const inputData = {
			fontFamily: `${getSelectedValueInSelectElement(editorFontSetSelectElement)}${defaultAddFontFamily}`,
			fontSize: getMyStylingFontSize(),
			theme: getSelectedValueInSelectElement(editorThemeSetSelectElement),
			tabSize: Number(getSelectedValueInSelectElement(tabSizeEditorSettingSetSelectElement)),
			insertSpaces: (getSelectedValueInSelectElement(useTabEditorSettingSetSelectElement) != "tab"),
			detectIndentation: (getSelectedValueInSelectElement(autoIndentEditorSettingSetSelectElement) == "on")
		};
		editor.updateOptions(inputData);
		monaco.editor.setModelLanguage(editor.getModel(), codeLangTitleObject[codeLangTitleSelectedValue]["lang"]);
		monaco.editor.remeasureFonts();
	}

	function reloadIframeScript(inputCode = "", targetIframeDocumentElement) {
		consoleResult.innerHTML = "";
		switch (codeLangTitleSelectedValue) {
			case "js": {
				[...targetIframeDocumentElement.body.children].forEach(c => {
					if (!(c.hasAttribute("src") && String(c.getAttribute("src")).includes(".tshuto.com") || c.id == "main-js"))
						c.remove();
				});
				const newScriptElement = targetIframeDocumentElement.createElement("script");
				newScriptElement.textContent = `(() => {${inputCode}})();`;
				newScriptElement.id = "main-js";
				const targetScriptElement = targetIframeDocumentElement.querySelector("script#main-js");
				targetScriptElement.replaceWith(newScriptElement);
				break;
			}
			case "css": {
				const style = targetIframeDocumentElement.head.querySelector("style#main-css");
				style.textContent = inputCode;
				break;
			}
			default:
				break;
		}
	}

	editor.onDidChangeModelContent(e => {
		cacheMainScriptHistoryData = String(editor.getValue());
		reloadIframeScript(cacheMainScriptHistoryData, sandboxIframeWindow.document);
	});

	window.addEventListener("resize", () => {
		reloadEditorView();
	});
});