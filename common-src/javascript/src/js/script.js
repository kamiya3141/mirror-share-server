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

const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");
const editorThemeSetSelectElement = document.getElementById("editor-theme-set-sel");
const pageThemeSetSelectElement = document.getElementById("page-theme-set-sel");
const restrictThemeSetSelectElement = document.getElementById("restrict-theme-set-sel");

const sandboxIframeWindow = sandboxIframe.contentWindow;

let cacheThemeJsonData = {};

const PRIMARY_THEME_KIND_NAME = "default";
let defaultCommonThemeName = "";
const setDefaultCommonThemeName = () => {
	defaultCommonThemeName = `vs${checkCurrentSystemThemeLight() ? "" : "-dark"}`;
};
const getMyStylingFontSize = (computedFontSize = getComputedStyle(document.documentElement).getPropertyValue("--myStylingFont")) => computedFontSize.replace(new RegExp("px|rem|em|%", "gi"), "");

setDefaultCommonThemeName();

(async function () {
	const __FORCE_UPPER_CASE = true;

	const res = await fetch("./src/json/my-themelist.json");
	const data = await res.json();
	cacheThemeJsonData = data;
	for (let labelName of Object.keys(cacheThemeJsonData)) {
		const optgroupElement = document.createElement("optgroup");
		optgroupElement.label = __FORCE_UPPER_CASE ? labelName.toUpperCase() : labelName;
		Object.keys(cacheThemeJsonData[labelName]).forEach(async (optionValue) => {
			if (labelName != PRIMARY_THEME_KIND_NAME) {
				const res2 = await fetch(`https://cdn.jsdelivr.net/npm/monaco-themes/themes/${optionValue}.json`);
				const jsonData = await res2.json();
				cacheThemeJsonData[labelName][optionValue]["data"] = jsonData;
			}
			const optionElement = document.createElement("option");
			optionElement.value = optionValue;
			optionElement.textContent = optionValue;
			if (labelName == PRIMARY_THEME_KIND_NAME && optionValue == defaultCommonThemeName) {
				optionElement.selected = true;
			}
			optgroupElement.appendChild(optionElement);
		});
		editorThemeSetSelectElement.appendChild(optgroupElement);
	};
})();

window.console.log = (...input) => {
	input = input.map(s => String(s).replaceAll("\n", "<br>"));
	consoleResult.innerHTML = `${input.join("<br>")}`;
};
sandboxIframe.contentWindow.console.log = (...input) => console.log(...input);

require.config({
	paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" }
});

require(["vs/editor/editor.main"], () => {
	const editor = monaco.editor.create(codeBody, {
		value: ``,
		language: "javascript",
		theme: defaultCommonThemeName,
		fontSize: getMyStylingFontSize(),
		fontFamily: "'Explex', sans-serif",
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

	function loadTheme(themeName = null) {
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

	editorThemeSetSelectElement.addEventListener("change", e => {
		loadTheme(editorThemeSetSelectElement.options[editorThemeSetSelectElement.selectedIndex].value);
	});

	setTimeout(() => {
		setEditorView();
	}, 1500);


	function setEditorView() {
		setDefaultCommonThemeName();
		editor.updateOptions({
			fontSize: getMyStylingFontSize(),
			theme: editorThemeSetSelectElement.options[editorThemeSetSelectElement.selectedIndex].value
		});
		monaco.editor.remeasureFonts();
	}

	window.addEventListener("resize", () => {
		setEditorView();
	});


	editor.onDidChangeModelContent(e => {
		let code = String(editor.getValue());
		code = code.replace(new RegExp("document|window.document", "g"), `document.getElementById("sandbox-iframe").contentWindow.document`);
		code = code.replace(new RegExp("window", "g"), `document.getElementById("sandbox-iframe").contentWindow`);
		try {
			document.getElementById("sandbox-iframe").contentWindow.document.body.innerHTML = "";
			eval(code);
		} catch (error) {
			console.log(error);
		}
	});
});