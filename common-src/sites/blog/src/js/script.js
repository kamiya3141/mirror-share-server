async function mainFunc() {
	const PMD = await import(`./index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

}

window.addEventListener("load", mainFunc);
/*
window.setTimeout(() => {
	myAlertMessage(document.documentElement.getAttribute("data-my-device-type"));
	myAlertMessage(JSON.stringify(device));
}, 1000 * 5);
*/