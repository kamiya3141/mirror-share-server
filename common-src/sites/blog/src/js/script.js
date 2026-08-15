async function mainFunc() {
	const PMD = await import(`./markdown.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.querySelector("div#root .main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

	setTheme();

}

window.addEventListener("load", mainFunc);
