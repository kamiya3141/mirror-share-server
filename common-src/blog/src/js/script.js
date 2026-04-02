async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();
}

window.addEventListener("load", mainFunc);


const displayElementQueryArray = [
	{
		"trigger-element": ["#open-setting-display-button-element", "#setting-display-div-main #control-box"],
		"focus-out-element": "#setting-display-div-main",
		"switched-element": "#setting-display-section"
	}
];

displayElementQueryArray.forEach(obj => {
	obj["trigger-element"].forEach(el => {
		document.querySelector(el).addEventListener("click", e => {
			switchingOpenDisplay(obj["switched-element"]);
		}, true);
	});
	document.querySelector(obj["focus-out-element"]).addEventListener("focusout", e => {
		switchingOpenDisplay(obj["switched-element"]);
	}, true);
});


function switchingOpenDisplay(query = "") {
	const attr_name = "data-display-open";
	const data = document.querySelector(query).getAttribute(attr_name);
	document.querySelector(query).setAttribute(attr_name, (data == "false" ? "true" : "false"));
}