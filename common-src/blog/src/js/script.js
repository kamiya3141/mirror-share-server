async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;

	PMD.afterFunction();


	const displayElementQueryArray = [
		{
			"trigger-element": ["#open-setting-display-button-element", "#setting-display-div-main #control-box"],
			"focus-out-element": "#setting-display-div-main .display-item-box",
			"switched-element": "#setting-display-section"
		}
	];

	displayElementQueryArray.forEach(obj => {
		let switched_elem = document.querySelector(obj["switched-element"]);
		switched_elem.tabIndex = 0;
		obj["trigger-element"].forEach(el => {
			document.querySelector(el).addEventListener("click", e => {
				switchingOpenDisplay(switched_elem);
			}, true);
		});
		document.querySelector(obj["focus-out-element"]).addEventListener("focusout", e => {
			switchingOpenDisplay(switched_elem);
			console.log("ok!!");
		}, true);
	});
}

window.addEventListener("load", mainFunc);


function switchingOpenDisplay(elem = "") {
	const attr_name = "data-display-open";
	const data = elem.getAttribute(attr_name);
	let data_is_true = Boolean(data == "true");

	if (!data_is_true)
		elem.focus();

	elem.setAttribute(attr_name, (data_is_true ? "false" : "true"));
}