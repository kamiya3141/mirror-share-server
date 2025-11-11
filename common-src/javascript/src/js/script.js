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
const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");
const editorThemeSetSelectElement = document.getElementById("editor-theme-set-sel");
const pageThemeSetSelectElement = document.getElementById("page-theme-set-sel");
const restrictThemeSetSelectElement = document.getElementById("restrict-theme-set-sel");
const editorFontSetSelectElement = document.getElementById("editor-font-set-sel");
console.log(editorFontSetSelectElement);
const pageFontSetSelectElement = document.getElementById("page-font-set-sel");

const outputResultConsole = (...input) => {
	input = input.map(s => String(s).replaceAll("\n", "<br>"));
	consoleResult.innerHTML += `${input.join("<br>")}`;
};
let sandboxIframeWindow = sandboxIframe.contentWindow;

sandboxIframeWindow.console.log = (...input) => outputResultConsole(...input);
sandboxIframeWindow.addEventListener("error", e => {
	outputResultConsole(`Error: ${e.message}`);
	e.preventDefault();
});

let cacheThemeJsonData = {};
let cacheFontJsonData = {};

const PRIMARY_THEME_KIND_NAME = "default";
const defaultAddFontFamily = ", sans-serif";
const defaultEditorFontFamily = "Explex";
let defaultCommonThemeName = "";
const setDefaultCommonThemeName = () => {
	defaultCommonThemeName = `vs${checkCurrentSystemThemeLight() ? "" : "-dark"}`;
};
const getMyStylingFontSize = () => getComputedStyle(document.documentElement).getPropertyValue("--myStylingFontSize").replace(new RegExp("px|rem|em|%", "gi"), "");

setDefaultCommonThemeName();

(async function () {
	function createOptionElement(_opt_arg, _opt_add_arg = _opt_arg) {
		const opt = {
			"value": _opt_arg,
			"text-content": _opt_add_arg
		};
		if (!_opt_arg)
			console.error("第一引数が無効な値に設定されています");
		else if (Array.isArray(_opt_arg))
			[opt["value"], opt["text-content"]] = [..._opt_arg];
		const optionElement = document.createElement("option");
		optionElement.value = opt["value"];
		optionElement.textContent = opt["text-content"];
		return optionElement;
	}

	// テーマ セット
	const __FORCE_UPPER_CASE = true;
	const themeListJsonResponse = await fetch("./src/json/my-themelist.json");
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
	const fontListJsonResponse = await fetch("./src/json/my-fontlist.json");
	const fontListJsonData = await fontListJsonResponse.json();
	cacheFontJsonData = fontListJsonData;
	Object.entries(cacheFontJsonData).forEach(optionValueAndTextContentArray => {
		const optionElement = createOptionElement(optionValueAndTextContentArray[1], optionValueAndTextContentArray[1]);
		editorFontSetSelectElement.appendChild(optionElement);
		pageFontSetSelectElement.appendChild(optionElement.cloneNode(true));
	});
})();

require.config({
	paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" }
});

require(["vs/editor/editor.main"], () => {
	const editor = monaco.editor.create(codeBody, {
		value: ``,
		language: "javascript",
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

	function setLoadedTheme(themeName = null) {
		if (!themeName || String(themeName).length == 0)
			return;
		const themeAttribute = Object.keys(cacheThemeJsonData).find(c => cacheThemeJsonData[c].hasOwnProperty(themeName)) || "null";
		const resultThemeName = cacheThemeJsonData[themeAttribute][themeName]["name"];
		if (themeAttribute != PRIMARY_THEME_KIND_NAME) {
			const themeData = cacheThemeJsonData[themeAttribute][themeName]["data"];
			monaco.editor.defineTheme(resultThemeName, themeData);
		}
		monaco.editor.setTheme(resultThemeName);
	}

	function getSelectedValueInSelectElement(_selectElement) {
		const ret = _selectElement.options[_selectElement.selectedIndex];
		let retval = "";
		try {
			retval = ret.value;
		} catch (err) {
			console.info(_selectElement);
			return null;
		}
		return retval;
	}

	editorThemeSetSelectElement.addEventListener("change", e => {
		setLoadedTheme(getSelectedValueInSelectElement(editorThemeSetSelectElement));
	});

	editorFontSetSelectElement.addEventListener("change", e => {
		reloadEditorView();
	});
	pageFontSetSelectElement.addEventListener("change", e => {
		document.documentElement.style.setProperty("--myStylingFontFamily", `${getSelectedValueInSelectElement(pageFontSetSelectElement)}${defaultAddFontFamily}`);
	});

	setTimeout(() => {
		reloadEditorView();
	}, 1500);


	function reloadEditorView() {
		setDefaultCommonThemeName();
		editor.updateOptions({
			fontFamily: `${getSelectedValueInSelectElement(editorFontSetSelectElement)}${defaultAddFontFamily}`,
			fontSize: getMyStylingFontSize(),
			theme: getSelectedValueInSelectElement(editorThemeSetSelectElement)
		});
		monaco.editor.remeasureFonts();
	}

	function reloadIframeScript(inputCode = "", targetIframeDocumentElement) {
		const newScriptElement = targetIframeDocumentElement.createElement("script");
		newScriptElement.textContent = inputCode;
		newScriptElement.id = "main-script";
		consoleResult.innerHTML = "";
		const targetScriptElement = targetIframeDocumentElement.querySelector("script#main-script");
		targetScriptElement.textContent = "";
		targetScriptElement.replaceWith(newScriptElement);
	}

	editor.onDidChangeModelContent(e => {
		let code = String(editor.getValue());
		reloadIframeScript(code, sandboxIframeWindow.document);
	});

	window.addEventListener("resize", () => {
		reloadEditorView();
	});
});