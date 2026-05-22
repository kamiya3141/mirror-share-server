async function mainFunc() {
	const PMD = await import(`./index-module.js`);
	myPMD = PMD;
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.querySelector("div#root .main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();

}

window.addEventListener("load", mainFunc);
