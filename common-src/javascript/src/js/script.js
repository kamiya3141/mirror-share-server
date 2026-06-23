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

WINV["mySourceFileBasePathArrayIndex"] = 2;

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



const outputResultConsole = (...input) => {
	const __str_eof__ = "<br>";
	input = input.map(s => String(s).replaceAll("\n", __str_eof__));
	consoleResult.innerHTML += `${input.join(__str_eof__)}${__str_eof__}`;
};
let sandboxIframeWindow = sandboxIframe.contentWindow;

sandboxIframeWindow.console.log = (...input) => outputResultConsole(...input);
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
		for (let i = 2; i <= 8; i++)
			tabSizeEditorSettingSetSelectElement.appendChild(createOptionElement(i, `TabSize: ${i}`, 4));

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

		const mainScriptHistoryResponse = await fetch(`${WINV["mySourceFileBasePath"]}/common-src/javascript/src/js/main-script-history.js`);
		const mainScriptHistoryData = await mainScriptHistoryResponse.text();
		cacheMainScriptHistoryData = mainScriptHistoryData;
		saveMainScriptHitoryForRemoteFile(true);
	})();

	const editor = monaco.editor.create(codeBody, {
		value: cacheMainScriptHistoryData,
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
	function saveMainScriptHitoryForRemoteFile(tf = false) {
		const url = new URL("https://share.tshuto.com/common-src/javascript/src/php/server.php");
		url.searchParams.set("rewrite-script-file-path", "src/js/main-script-history.js");
		url.searchParams.set("rewrite-script-file-open-mode", "w");

		fetch(url, {
			"method": "POST",
			"body": JSON.stringify({
				"data-type": "php-input",
				"data": cacheMainScriptHistoryData
			})
		}).then(res => res.text()).then(dt => {
			if (dt != "true")
				console.log(dt);
			if (tf)
				editor.setValue(cacheMainScriptHistoryData);
		});
	}
	codeBody.addEventListener("keydown", e => {
		if (e.ctrlKey && String(e.key).toLowerCase() == "s") {
			saveMainScriptHitoryForRemoteFile();
			e.preventDefault();
		}
	});

	function getSelectedValueInSelectElement(_selectElement) {
		const ret = _selectElement.options[_selectElement.selectedIndex];
		let retval = ret.value;
		return retval;
	}

	editorThemeSetSelectElement.addEventListener("change", e => {
		setup();
	});
	pageThemeSetSelectElement.addEventListener("change", e => {
		const val = e.currentTarget.value;
		const input_bit = [val != "system", val == "light", false, false].map(v => Boolean(v)).reverse().reduce((pv, cv, i) => (pv + (Number(cv) * (2 ** i))), 0);
		console.log(input_bit);
		setTheme(input_bit);
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
		monaco.editor.remeasureFonts();
	}

	function reloadIframeScript(inputCode = "", targetIframeDocumentElement) {
		consoleResult.innerHTML = "";
		[...targetIframeDocumentElement.body.children].forEach(c => {
			if (!(c.hasAttribute("src") && String(c.getAttribute("src")).includes(".tshuto.com") || c.id == "main-script"))
				c.remove();
		});
		const newScriptElement = targetIframeDocumentElement.createElement("script");
		newScriptElement.textContent = `(() => {
			${inputCode}
		})();`;
		newScriptElement.id = "main-script";
		const targetScriptElement = targetIframeDocumentElement.querySelector("script#main-script");
		targetScriptElement.replaceWith(newScriptElement);
	}

	editor.onDidChangeModelContent(e => {
		cacheMainScriptHistoryData = String(editor.getValue());
		reloadIframeScript(cacheMainScriptHistoryData, sandboxIframeWindow.document);
	});

	window.addEventListener("resize", () => {
		reloadEditorView();
	});
});