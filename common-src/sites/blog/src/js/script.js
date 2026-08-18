const scriptjs_idx = window[winMyHrefHostname]["loaded-array"].push(0);

async function mainFunc() {
	const PMD = await import(`./markdown.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.querySelector("div#root .main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

	window[winMyHrefHostname]["loaded-array"][scriptjs_idx - 1] = 1;
}

window.addEventListener("load", mainFunc);
