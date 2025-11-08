const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");

const sandboxIframeWindow = sandboxIframe.contentWindow;

const cacheThemeJsonData = {
	"default": {
		"vs": {
			"name": "vs"
		},
		"hc-light": {
			"name": "hc-light"
		},
		"vs-dark": {
			"name": "vs-dark"
		},
		"hc-black": {
			"name": "hc-black"
		}
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
const themeNameDataObject = {
	"active4d": "Active4D",
	"all-hallows-eve": "All Hallows Eve",
	"amy": "Amy",
	"birds-of-paradise": "Birds of Paradise",
	"blackboard": "Blackboard",
	"brilliance-black": "Brilliance Black",
	"brilliance-dull": "Brilliance Dull",
	"chrome-devtools": "Chrome DevTools",
	"clouds-midnight": "Clouds Midnight",
	"clouds": "Clouds",
	"cobalt": "Cobalt",
	"cobalt2": "Cobalt2",
	"dominion-day": "Dominion Day",
	"dawn": "Dawn",
	"dracula": "Dracula",
	"dreamweaver": "Dreamweaver",
	"eiffel": "Eiffel",
	"espresso-libre": "Espresso Libre",
	"github-dark": "GitHub Dark",
	"github-light": "GitHub Light",
	"github": "GitHub",
	"idle": "IDLE",
	"katzenmilch": "Katzenmilch",
	"kuroir-theme": "Kuroir Theme",
	"lazy": "LAZY",
	"magicwb--amiga-": "MagicWB (Amiga)",
	"merbivore-soft": "Merbivore Soft",
	"merbivore": "Merbivore",
	"monokai-bright": "Monokai Bright",
	"monokai": "Monokai",
	"night-owl": "Night Owl",
	"nord": "Nord",
	"oceanic-next": "Oceanic Next",
	"pastels-on-dark": "Pastels on Dark",
	"slush-and-poppies": "Slush and Poppies",
	"solarized-dark": "Solarized-dark",
	"solarized-light": "Solarized-light",
	"spacecadet": "SpaceCadet",
	"sunburst": "Sunburst",
	"textmate--mac-classic-": "Textmate (Mac Classic)",
	"tomorrow-night-blue": "Tomorrow-Night-Blue",
	"tomorrow-night-bright": "Tomorrow-Night-Bright",
	"tomorrow-night-eighties": "Tomorrow-Night-Eighties",
	"tomorrow-night": "Tomorrow-Night",
	"tomorrow": "Tomorrow",
	"twilight": "Twilight",
	"upstream-sunburst": "Upstream Sunburst",
	"vibrant-ink": "Vibrant Ink",
	"xcode-default": "Xcode_default",
	"zenburnesque": "Zenburnesque",
	"iplastic": "iPlastic",
	"idlefingers": "idleFingers",
	"krtheme": "krTheme",
	"monoindustrial": "monoindustrial"
};

Object.keys(themeNameDataObject).forEach(monacoOnlyThemeName => {
	const themeName = themeNameDataObject[monacoOnlyThemeName];
	Object.keys(cacheThemeJsonData).forEach(labelName => {
		if (cacheThemeJsonData[labelName].hasOwnProperty(themeName))
			cacheThemeJsonData[labelName][themeName] = {
				"name": monacoOnlyThemeName,
				"data": ""
			};
	});
});

const PRIMARY_THEME_KIND_NAME = "default";

/* --- 全部先にロードする --- */
const ALLOW_ALL_THEME_LOAD = true;

const themeSetSelectElement = document.getElementById("theme-set-sel");
const asyncSetSelectElement = document.getElementById("async-set-sel");

(function () {
	const __FORCE_UPPER_CASE = true;
	Object.keys(cacheThemeJsonData).forEach(labelName => {
		const optgroupElement = document.createElement("optgroup");
		optgroupElement.label = __FORCE_UPPER_CASE ? labelName.toUpperCase() : labelName;
		Object.keys(cacheThemeJsonData[labelName]).forEach(optionValue => {
			const optionElement = document.createElement("option");
			optionElement.value = optionValue;
			optionElement.textContent = optionValue;
			if (labelName == PRIMARY_THEME_KIND_NAME && optionValue == `vs${checkCurrentSystemThemeLight() ? "" : "-dark"}`)
				optionElement.selected = true;
			optgroupElement.appendChild(optionElement);
		});
		themeSetSelectElement.appendChild(optgroupElement);
	});
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
		theme: themeSetSelectElement.options[themeSetSelectElement.selectedIndex].value,
		fontSize: "18",
		// fontFamily: "'Explex-Regular', sans-serif",
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

	async function loadTheme(themeName = null, prepareLoading = false) {
		if (!themeName || String(themeName).length == 0)
			return;
		const themeAttribute = Object.keys(cacheThemeJsonData).find(c => cacheThemeJsonData[c].hasOwnProperty(themeName)) || "null";
		const resultThemeName = cacheThemeJsonData[themeAttribute][themeName]["name"];
		if (themeAttribute != PRIMARY_THEME_KIND_NAME) {
			const themeData = cacheThemeJsonData[themeAttribute][themeName]["data"] ? cacheThemeJsonData[themeAttribute][themeName]["data"] : (await (async function () {
				const res = await fetch(`https://cdn.jsdelivr.net/npm/monaco-themes/themes/${themeName}.json`);
				const jsonData = await res.json();
				cacheThemeJsonData[themeAttribute][themeName]["data"] = jsonData;
				return jsonData;
			})());
			monaco.editor.defineTheme(resultThemeName, themeData);
		}
		if (!prepareLoading)
			monaco.editor.setTheme(resultThemeName);
	}
	themeSetSelectElement.addEventListener("change", e => {
		loadTheme(themeSetSelectElement.options[themeSetSelectElement.selectedIndex].value);
	});

	if (ALLOW_ALL_THEME_LOAD)
		[...themeSetSelectElement.options].forEach(opt => {
			loadTheme(opt.value, true);
		});
	setTimeout(() => {
		loadTheme(themeSetSelectElement.options[themeSetSelectElement.selectedIndex].value);
	}, 1500);


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