require.config({
	paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" }
});
fetch("-:-CODE-URL-:-").then(res => res.text()).then(dt => {
	require(["vs/editor/editor.main"], () => {
		const codeExtentions = "-:-CODE-EXT-:-";
		const monacoEditorIdArray = [...monaco.languages.getLanguages()];
		let codeInfo = monacoEditorIdArray.filter(c => c["extensions"] && c["extensions"].includes(codeExtentions));
		if (codeInfo.length == 0)
			codeInfo.push(monacoEditorIdArray[0]);
		const container = document.getElementById("code-body");
		const editor = monaco.editor.create(document.getElementById("code-body"), {
			value: dt,
			language: codeInfo[0]["id"],
			theme: "vs-dark",//"hc-black",
			fontSize: "18",
			// fontFamily: "'Explex-Regular', sans-serif",
			fontLigatures: true,
			readOnly: true,
			automaticLayout: true,
			scrollBeyondLastLine: false,
			wordWrap: "off",
			scrollbar: {
				vertical: "hidden",
				horizontal: "auto",
				handleMouseWheel: false
			},
			minimap: {
				enabled: false
			}
		});
		document.getElementById("code-title").innerHTML = codeInfo[0]["id"];

		function updateHeight() {
			let _h = Number(editor.getContentHeight());
			container.style.height = `${_h}px`;
			editor.layout();
		}
		updateHeight();

		editor.onDidContentSizeChange(updateHeight);
	});
});