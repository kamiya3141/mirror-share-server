async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();
}

window.addEventListener("load", mainFunc);

const displayElementIdArray = [
	"open-setting-display-button-element"
];
displayElementIdArray.forEach(id => {
	document.getElementById(id).addEventListener("click", e => {
		switchingOpenDisplay(id);
	}, true);
});


function switchingOpenDisplay(_id = "") {
	const attr_name = "data-display-open";
	const data = document.getElementById(_id).getAttribute(attr_name);
	document.getElementById(_id).setAttribute(attr_name, (data == "false" ? "true" : "false"));
}