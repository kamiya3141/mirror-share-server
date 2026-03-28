async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();
}

window.addEventListener("load", mainFunc);

document.getElementById("open-setting-display-button-element").addEventListener("click", switchingOpenSettingDisplay, true);

function switchingOpenSettingDisplay(e) {
	const data = document.getElementById("setting-display-section").getAttribute("data-setting-menu-open");
	document.getElementById("setting-display-section").setAttribute("data-setting-menu-open", data == "false" ? "true" : "false");
}