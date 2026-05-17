async function mainFunc() {
	const PMD = await import(`./index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

}

window.addEventListener("load", mainFunc);

window.setTimeout(async () => {
	myAlertMessage(document.documentElement.getAttribute("data-my-device-type"));
	const res = await myConfirmMessage("abc???");
	console.log(res);
}, 1000 * 3);