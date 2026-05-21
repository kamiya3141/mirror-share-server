async function mainFunc() {
	const PMD = await import(`./index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.querySelector("div#root .main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

}

window.addEventListener("load", mainFunc);

window.setTimeout(async () => {
	// myAlertMessage(document.documentElement.getAttribute("data-my-device-type"));
	// await myConfirmMessage("abc???");
}, 1000 * 3);