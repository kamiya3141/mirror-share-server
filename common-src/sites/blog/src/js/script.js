async function mainFunc() {
	const PMD = await import(`./markdown.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.querySelector("div#root .main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

	convertTemplateElement(document.getElementById("setting-site-display-section"));
}

// window.addEventListener("load", mainFunc);
(async () => {
	await mainFunc();
})();