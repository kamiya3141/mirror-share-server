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
			"focus-out-element": "#setting-display-div-main>.display-item-box",
			"switched-element": "#setting-display-section"
		}
	];

	const setting_elem = document.getElementById("display-setting-main-contents-setting");
	const setting_display_main_contents_tab_bar_item_array = [...setting_elem.querySelectorAll(`[id^="tb--"]`)].map(c => String(c.id).replace("tb--", ""));

	console.log(setting_display_main_contents_tab_bar_item_array);

	displayElementQueryArray.forEach(obj => {
		const switched_elem = document.querySelector(obj["switched-element"]);
		switched_elem.tabIndex = 0;
		const focus_out_elem = document.querySelector(obj["focus-out-element"]);
		focus_out_elem.tabIndex = 0;

		obj["trigger-element"].forEach(el => {
			document.querySelector(el).addEventListener("click", e => {
				switchingOpenDisplay(switched_elem);
				if (getOpenDisplayStatus(switched_elem)) {
					focus_out_elem.focus();
					setting_elem.querySelector(`#tb--${setting_display_main_contents_tab_bar_item_array[0]}`).click();
				}
			});
		});
		if (getDeviceInformation("DEBUGMODE"))
			return;
		focus_out_elem.addEventListener("focusout", e => {
			if (!focus_out_elem.contains(e.relatedTarget) && getOpenDisplayStatus(switched_elem))
				switchingOpenDisplay(switched_elem);
		});
	});

	document.getElementById("setting-display--appearance--input-color--prefer-color").value = getDeviceInformation("prefer-color");
	document.getElementById("setting-display--appearance--input-color--prefer-color").addEventListener("change", e => {
		editDeviceInformation("prefer-color", e.target.value);
	});


	setting_display_main_contents_tab_bar_item_array.map(c => `#tb--${c}`).forEach(c1 => {
		setting_elem.querySelector(c1).addEventListener("click", e => {
			setting_display_main_contents_tab_bar_item_array.map(c => `#tc--${c}`).forEach(c2 => {
				if (c1.split("--")[1] == c2.split("--")[1]) {
					setting_elem.querySelector(c1).setAttribute("data-mydef-selected", "true");
					setting_elem.querySelector(c2).style.display = "flex";
				} else {
					setting_elem.querySelector(c2.replace("tc", "tb")).setAttribute("data-mydef-selected", "false");
					setting_elem.querySelector(c2).style.display = "none";
				}
			});
		});
	});

	const themeSettingSelectElement = document.getElementById("setting-display--appearance--input-select--theme-setting");
	[
		{
			"text": "システム",
			"value": "system"
		},
		{
			"text": "ライト",
			"value": "light"
		},
		{
			"text": "ダーク",
			"value": "dark"
		}
	].forEach(c => {
		let opt = document.createElement("option");
		opt.text = c.text;
		opt.value = c.value;
		themeSettingSelectElement.appendChild(opt);
	});
	themeSettingSelectElement.addEventListener("change", e => document.documentElement.setAttribute("data-theme", e.target.value));

	/*
	const b2s = ipt => (ipt ? "true" : "false");
	let tso_msg = new TSOMessage(`<h1>${b2s(device["mobile"])} -:- ${b2s(device["force-mobile"])}</h1>`, "warn");
	tso_msg.textColor = "#000000";
	*/
}

window.addEventListener("load", mainFunc);


function switchingOpenDisplay(elem) {
	const attr_name = "data-display-open";
	const data_is_true = getOpenDisplayStatus(elem);
	elem.setAttribute(attr_name, (data_is_true ? "false" : "true"));
}

function getOpenDisplayStatus(elem) {
	const attr_name = "data-display-open";
	const data = elem.getAttribute(attr_name);
	return Boolean(data == "true");
}