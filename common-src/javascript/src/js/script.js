const codeBody = document.getElementById("code-body");
const sandboxIframe = document.getElementById("sandbox-iframe");
const consoleResult = document.getElementById("console-result");

const sandboxIframeWindow = sandboxIframe.contentWindow;

const cacheThemeJsonData = new Object();

require.config({
	paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs" }
});

window.console.log = (...input) => consoleResult.innerHTML = `${input.join("<br>")}`;
sandboxIframe.contentWindow.console.log = (...input) => console.log(...input);

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
		const themeData = cacheThemeJsonData.hasOwnProperty(themeName) ?
			cacheThemeJsonData[themeName] :
			(await (await fetch(`https://cdn.jsdelivr.net/npm/monaco-themes/themes/${themeName}.json`))().json());
		monaco.editor.defineTheme(themeName, themeData);
		monaco.editor.setTheme(themeName);
	}

	editor.onDidChangeModelContent(e => {
		const code = String(editor.getValue()).replace(new RegExp("document", "g"), `document.getElementById("sandbox-iframe").contentWindow.document`);
		try {
			eval(code);
		} catch (error) {
			console.log(error);
		}
	});
});