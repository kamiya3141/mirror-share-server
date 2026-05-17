function loadedFunc() {

	const saveUserDataLocalstorage = getDeviceInformation("save--user-data--localstorage");

	const displayElementQueryArray = [
		{
			"trigger-element": [".open-setting-display-button-element", "#setting-display-div-main #control-box"],
			"focus-out-element": "#setting-display-div-main>.display-item-box",
			"switched-element": "#setting-display-section",
			"tf-func": (__tf, __elem) => editDeviceInformation("setting-display-open", __tf)
		},
		{
			"trigger-element": ["#alert-display-div-main #alert--ok-button"],
			"focus-out-element": "",
			"switched-element": "#alert-display-section",
			"tf-func": (__tf, __elem) => {
				if (!__tf)
					MyAlertMessageInfoObject["close-event"]();
			}
		},
		{
			"trigger-element": ["#confirm-display-div-main #confirm--ok-button", "#confirm-display-div-main #confirm--cancel-button"],
			"focus-out-element": "",
			"switched-element": "#confirm-display-section",
			"tf-func": (__tf, __elem) => {
				if (!__tf) {
					MyConfirmMessageInfoObject["result"] = String(__elem.id).includes("ok");
					MyConfirmMessageInfoObject["close-event"]();
				}
			}
		}
	];

	const setting_elem = document.getElementById("display-setting-main-contents-setting");
	const setting_display_main_contents_tab_bar_item_array = [...setting_elem.querySelectorAll(`[id^="tb--"]`)].map(c => String(c.id).replace("tb--", ""));

	displayElementQueryArray.forEach(obj => {
		const switched_elem = document.querySelector(obj["switched-element"]);
		switched_elem.tabIndex = 0;
		let focus_out_elem = null;

		if (!getDeviceInformation("DEBUGMODE") && Object.hasOwn(obj, "focus-out-element") && String(obj["focus-out-element"]).length > 0) {
			focus_out_elem = document.querySelector(obj["focus-out-element"]);
			focus_out_elem.tabIndex = 0;
			focus_out_elem.addEventListener("focusout", e => {
				if (!focus_out_elem.contains(e.relatedTarget) && getOpenDisplayStatus(switched_elem)) {
					if (obj["trigger-element"].length > 0)
						document.querySelectorAll(obj["trigger-element"][0]).item(0).click();
				}
			});
		}

		obj["trigger-element"].forEach(el => {
			[...document.querySelectorAll(el)].forEach(el2 => {
				el2.addEventListener("click", e => {
					const return_data = switchingOpenDisplay(switched_elem);
					obj["tf-func"](return_data, e.target);
					if (getOpenDisplayStatus(switched_elem)) {
						if (focus_out_elem != null)
							focus_out_elem.focus();
						setting_elem.querySelector(`#tb--${setting_display_main_contents_tab_bar_item_array[getDeviceInformation("setting-display-init-item-index")]}`).click();
					}
				});
			});
		});

	});

	const userPreferColorElement = document.getElementById("setting-display--appearance--input-color--prefer-color");
	userPreferColorElement.value = getDeviceInformation("prefer-color");
	userPreferColorElement.addEventListener("change", e => {
		let __includes_special_color = ["MainBackgroundColor", "TextColor", "ElementBackgroundColor", "ElementBackgroundColor2"].map(c => rgbToHex(getCSSLengthValue(`--my${c}`))).includes(e.target.value);
		if (__includes_special_color) {
			myAlertMessage("指定不可能な値が選択されました。\n値を戻します。");
			e.target.value = getDeviceInformation("prefer-color");
		} else {
			editDeviceInformation("prefer-color", e.target.value);
			reloadDeviceInformation("prefer-color");
		}
	});


	setting_display_main_contents_tab_bar_item_array.map(c => `#tb--${c}`).forEach(c1 => {
		setting_elem.querySelector(c1).addEventListener("click", e => {
			setting_display_main_contents_tab_bar_item_array.map(c => `#tc--${c}`).forEach(c2 => {
				if (c1.split("--")[1] == c2.split("--")[1]) {
					setting_elem.querySelector(c1).setAttribute("data-mydef--selected", "true");
					setting_elem.querySelector(c2).style.display = "flex";
				} else {
					setting_elem.querySelector(c2.replace("tc", "tb")).setAttribute("data-mydef--selected", "false");
					setting_elem.querySelector(c2).style.display = "none";
				}
			});
		});
	});

	const settingSelectElementDataArray = [
		{
			"select-id": "setting-display--appearance--input-select--theme-setting",
			"select-option-data-array": [
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
			],
			"select-change-event-function": val => {
				editDeviceInformation("theme-type", val);
			},
			"init-disabled": true
		},
		{
			"select-id": "setting-display--appearance--input-select--device-mode-setting",
			"select-option-data-array": [
				{
					"text": "デバイス",
					"value": "device"
				},
				{
					"text": "デスクトップ",
					"value": "desktop"
				},
				{
					"text": "モバイル",
					"value": "mobile"
				}
			],
			"select-change-event-function": val => {
				editDeviceInformation("device-type", val);
			},
			"init-disabled": true
		},
		{
			"select-id": "setting-display--specific--input-select--setting-display-init-item",
			"select-option-data-array": [
				{
					"text": "表示設定",
					"value": "0"
				},
				{
					"text": "詳細設定",
					"value": "1"
				},
				{
					"text": "ユーザデータの設定",
					"value": "2"
				},
				{
					"text": "設定の初期化",
					"value": "3"
				}
			],
			"select-change-event-function": val => {
				editDeviceInformation("setting-display-init-item-index", Number(val));
			},
			"init-disabled": false,
			"reload-cancel": true
		}
	];


	settingSelectElementDataArray.forEach(c1 => {
		c1["select-option-data-array"].forEach(c2 => {
			let opt = document.createElement("option");
			Object.assign(opt, c2);
			document.getElementById(c1["select-id"]).appendChild(opt);
		});
		document.getElementById(c1["select-id"]).addEventListener("change", e => {
			const data_is_true = get_SetByScript(e.target);
			if (!data_is_true) {
				c1["select-change-event-function"](e.target.value);
				if (!(Object.hasOwn(c1, "reload-cancel") && c1["reload-cancel"] == true))
					reloadDeviceInformation("select-element-change-event");
			}
			edit_SetByScript(e.target, false);
		});
		document.getElementById(c1["select-id"]).disabled = c1["init-disabled"];
	});

	// すべて読みこんだ後に、deviceの値を設定画面に反映していく処理
	if (saveUserDataLocalstorage) {
		if (getDeviceInformation("allow--opening--setting-display--after--reload") && getDeviceInformation("setting-display-open")) {
			editDeviceInformation("setting-display-open", false);
			document.querySelector(displayElementQueryArray[0]["trigger-element"][0]).click();
		}

		[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"]`)].forEach(c => {
			const _arg = c.getAttribute("template-id-args");
			const data = getDeviceInformation(_arg);
			if (data)
				c.querySelector(".toggle_input").click();
		});

		if (getDeviceInformation("force-theme"))
			document.querySelector("#setting-display--appearance--input-select--theme-setting").value = getDeviceInformation("theme-type");

		if (getDeviceInformation("force-device"))
			document.querySelector("#setting-display--appearance--input-select--device-mode-setting").value = getDeviceInformation("device-type");
	}

	const targetDirectoryName = new URL(winMyHref).searchParams.get("blog--target-dir");
	const targetFileName = new URL(winMyHref).searchParams.get("blog--target-file");

	if (targetDirectoryName == "" && targetFileName == "article")
		loadAllArticles();

	/*
	const b2s = ipt => (ipt ? "true" : "false");
	let tso_msg = new TSOMessage(`<h1>${b2s(device["mobile"])} -:- ${b2s(device["force-device"])}</h1>`, "warn");
	tso_msg.textColor = "#000000";
	*/
}


window.addEventListener("load", loadedFunc);

function loadAllArticles() {
	const parent_recent_articles = document.getElementById("article--article--recent-article");
	const parent_populor_articles = document.getElementById("article--article--populor-article");
	const parent_laugh_articles = document.getElementById("article--article--laugh-article");

	const target_url = `${winMyHrefPTCHostname}/get-files/src/md/article`;

	fetch(target_url).then(res => res.json()).then(dt => {
		const _data_array = [...dt];

	});
}

function switchingOpenDisplay(elem, forceStatusValue = false, inputData = "auto") {
	const attr_name = "data-display-open";
	let data_is_true = getOpenDisplayStatus(elem);
	if (forceStatusValue) {
		if (inputData == "true" || inputData == true)
			data_is_true = "true";
		else if (inputData == "false" || inputData == false)
			data_is_true = "false";
		else {
			console.error("inputDataがtrue, false意外だったので、強制的にfalseにしました。");
			data_is_true = "false";
		}
	}
	if (!get_SetByScript(elem))
		elem.setAttribute(attr_name, (data_is_true ? "false" : "true"));
	edit_SetByScript(elem, false);
	return !data_is_true;
}

function getOpenDisplayStatus(elem) {
	const attr_name = "data-display-open";
	const data = elem.getAttribute(attr_name);
	return Boolean(data == "true");
}