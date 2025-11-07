const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");

const sandboxIframeWindow = sandboxIframe.contentWindow;

const cacheThemeJsonData = {
	"default": {
		"vs": "",
		"hc-light": "",
		"vs-dark": "",
		"hc-black": ""
	},
	"light": {
		"Amy": "",
		"Chrome DevTools": "",
		"Clouds": "",
		"Dawn": "",
		"Dreamweaver": "",
		"Eiffel": "",
		"GitHub Light": "",
		"GitHub": "",
		"IDLE": "",
		"iPlastic": "",
		"Katzenmilch": "",
		"Kuroir Theme": "",
		"LAZY": "",
		"MagicWB (Amiga)": "",
		"Solarized-light": "",
		"Textmate (Mac Classic)": "",
		"Tomorrow": "",
		"Xcode_default": ""
	},
	"dark": {
		"Active4D": "",
		"All Hallows Eve": "",
		"Birds of Paradise": "",
		"Blackboard": "",
		"Brilliance Black": "",
		"Brilliance Dull": "",
		"Clouds Midnight": "",
		"Cobalt": "",
		"Cobalt2": "",
		"Dominion Day": "",
		"Dracula": "",
		"Espresso Libre": "",
		"GitHub Dark": "",
		"idleFingers": "",
		"Merbivore Soft": "",
		"Merbivore": "",
		"monoindustrial": "",
		"Monokai Bright": "",
		"Monokai": "",
		"Night Owl": "",
		"Nord": "",
		"Oceanic Next": "",
		"Slush and Poppies": "",
		"Solarized-dark": "",
		"SpaceCadet": "",
		"Sunburst": "",
		"Tomorrow-Night": "",
		"Tomorrow-Night-Blue": "",
		"Tomorrow-Night-Bright": "",
		"Tomorrow-Night-Eighties": "",
		"Twilight": "",
		"Upstream Sunburst": "",
		"Vibrant Ink": "",
		"Zenburnesque": ""
	},
	"other": {
		"Pastels on Dark": ""
	}
};

const themeSetSelectElement = document.getElementById("theme-set-sel");

(function () {
	const __FORCE_UPPER_CASE = true;
	Object.keys(cacheThemeJsonData).forEach(labelName => {
		const optgroupElement = document.createElement("optgroup");
		optgroupElement.label = __FORCE_UPPER_CASE ? labelName.toUpperCase() : labelName;
		cacheThemeJsonData[labelName].keys().forEach(optionValue => {
			const optionElement = document.createElement("option");
			optionElement.value = optionValue;
			optionElement.textContent = optionValue;
			if (labelName == "default" && optionValue == `vs${checkCurrentSystemThemeLight() ? "" : "-dark"}`)
				optionElement.selected = true;
			optgroupElement.appendChild(optionElement);
		});
		themeSetSelectElement.appendChild(optgroupElement);
	});
})();

require.config({
	paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs" }
});

require(["vs/editor/editor.main"], () => {
	const editor = monaco.editor.create(codeBody, {
		value: ``,
		language: "javascript",
		theme: "vs-dark",
		fontSize: "18",
		// fontFamily: "'Explex-Regular', sans-serif",
		fontLigatures: true,
		automaticLayout: true,
		scrollBeyondLastLine: false,
		wordWrap: "off",
		scrollbar: {
			vertical: "hidden",
			horizontal: "auto",
			handleMouseWheel: false
		}
	});

	async function loadTheme(themeName) {
		const themeAttribute = Object.keys(cacheThemeJsonData).find(c => cacheThemeJsonData[c][themeName]);

		const themeData = cacheThemeJsonData[themeAttribute][themeName].length > 0 ?
			cacheThemeJsonData[themeAttribute][themeName] :
			(await (await fetch(`https://cdn.jsdelivr.net/npm/monaco-themes/themes/${themeName}.json`))().json());

		if (themeAttribute != "default") monaco.editor.defineTheme(themeName, themeData);

		monaco.editor.setTheme(themeName);
	}
	editor.onDidChangeModelContent(e => {
		const code = String(editor.getValue()).replace(new RegExp("document", "g"), `document.getElementById("sandbox-iframe").contentWindow.document`);
		try {
			document.getElementById("sandbox-iframe").contentWindow.document.body.innerHTML = "";
			eval(code);
		} catch (error) {
			console.log(error);
		}
	});

	window.console.log = (...input) => consoleResult.innerHTML = `${input.join("<br>")}`;
	sandboxIframe.contentWindow.console.log = (...input) => console.log(...input);
});