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

		obj["trigger-element"].forEach(el => {
			document.querySelector(el).addEventListener("click", e => {
				switchingOpenDisplay(switched_elem);
				if (getOpenDisplayStatus(switched_elem))
					switched_elem.focus();
			});
		});
		const focus_out_elem = document.querySelector(obj["focus-out-element"]);
		focus_out_elem.tabIndex = 0;
		focus_out_elem.addEventListener("focusout", e => {
			if (!focus_out_elem.contains(e.relatedTarget))
				switchingOpenDisplay(switched_elem);
			console.log("ok!!");
		});
	});
}

window.addEventListener("load", mainFunc);


function switchingOpenDisplay(elem) {
	let data_is_true = getOpenDisplayStatus(elem);
	elem.setAttribute(attr_name, (data_is_true ? "false" : "true"));
}

function getOpenDisplayStatus(elem) {
	const attr_name = "data-display-open";
	const data = elem.getAttribute(attr_name);
	return Boolean(data == "true");
}