let displayElementQueryArray = [];

function loadedFunc() {

	[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"][data-mydef--import-template-type="utils-setting"]`)].forEach(c => {
		const device_setting_id = c.getAttribute("template-id-args");
		c.querySelector(".toggle_input").addEventListener("change", async e => {
			if (!get_SetByScript(e.target)) {
				const chk = e.target.checked;
				editDeviceInformation(device_setting_id, chk);
				await toggleSwitchChangeEventAddFunction(device_setting_id, chk, e.target);
				reloadDeviceInformation("toggle-switch-template");
			}
			edit_SetByScript(e.target, false);
		});
	});

	displayElementQueryArray = [
		{
			"trigger-element": [".open-setting-display-button-element", "#setting-display-div-main #control-box"],
			"focus-out-element": "#setting-display-div-main>.display-item-box",
			"switched-element": "#setting-display-section",
			"tf-func": (__tf, __elem) => {
				editDeviceInformation("setting-display-open", __tf);
			}
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
		},
		{
			"trigger-element": ["#data-display-div-main #data--ok-button", "#data-display-div-main #data--cancel-button"],
			"focus-out-element": "",
			"switched-element": "#data-display-section",
			"tf-func": (__tf, __elem) => {
				if (!__tf) {
					if (String(__elem.id).includes("ok"))
						MyDataMessageInfoObject["result"] = [...String(__elem.getAttribute("data-mydef--localdata--input-data")).split(new RegExp(", ?"))];
					else
						MyDataMessageInfoObject["result"] = [""];
					MyDataMessageInfoObject["close-event"]();
				}
			}
		}
	];

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
					/*
					if (getOpenDisplayStatus(switched_elem)) {
						if (focus_out_elem != null)
							focus_out_elem.focus();
						setting_elem.querySelector(`#tb--${setting_display_main_contents_tab_bar_item_array[getDeviceInformation("setting-display-init-item-index")]}`).click();
					}
					*/
				});
			});
		});

	});

	const userPreferColorElement = document.getElementById("setting-display--appearance--input-color--prefer-color");
	userPreferColorElement.value = getDeviceInformation("prefer-color");
	userPreferColorElement.addEventListener("change", e => {
		let __includes_special_color = ["myMainBackgroundColor", "myTextColor", "myElementBackgroundColor", "myElementBackgroundColor2", "A-Element-VISITED-COLOR"].map(c => rgbToHex(getCSSLengthValue(`--${c}`))).includes(e.target.value);
		if (__includes_special_color) {
			myAlertMessage("指定不可能な値が選択されました。\n値を戻します。");
			e.target.value = getDeviceInformation("prefer-color");
		} else {
			editDeviceInformation("prefer-color", e.target.value);
			reloadDeviceInformation("prefer-color");
		}
	});

	const setting_elem = document.getElementById("display-setting-main-contents-setting");
	const setting_display_main_contents_tab_bar_item_array = [...setting_elem.querySelectorAll(`[id^="tb--"]`)].map(c => String(c.id).replace("tb--", "#"));

	setting_display_main_contents_tab_bar_item_array.map(c => c.replace("#", "#tb--")).forEach(c1 => {
		setting_elem.querySelector(c1).addEventListener("click", e => {
			setting_display_main_contents_tab_bar_item_array.map(c => c.replace("#", "#tc--")).forEach(c2 => {
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
			"select-id": "setting-display--appearance--input-select--font-setting",
			"select-option-data-array": [
				{
					"text": "デフォルト",
					"value": "note-sans-jp"
				},
				{
					"text": "0xProto",
					"value": "zxproto"
				},
				{
					"text": "0xProto-Regular",
					"value": "zxproto-r"
				},
				{
					"text": "0xProto-Bold",
					"value": "zxproto-b"
				},
				{
					"text": "0xProto-Italic",
					"value": "zxproto-i"
				},
				{
					"text": "Explex",
					"value": "explex"
				},
				{
					"text": "Explex-Regular",
					"value": "explex-r"
				},
				{
					"text": "Explex-Italic",
					"value": "explex-i"
				},
				{
					"text": "Explex-Bold",
					"value": "explex-b"
				},
				{
					"text": "Explex-BoldItalic",
					"value": "explex-bi"
				},
				{
					"text": "Explex35",
					"value": "explex35"
				},
				{
					"text": "Explex35-Regular",
					"value": "explex35-r"
				},
				{
					"text": "Explex35-Italic",
					"value": "explex35-i"
				},
				{
					"text": "Explex35-Bold",
					"value": "explex35-b"
				},
				{
					"text": "Explex35-BoldItalic",
					"value": "explex35-bi"
				},
				{
					"text": "ExplexConsole",
					"value": "explexc"
				},
				{
					"text": "ExplexConsole-Regular",
					"value": "explexc-r"
				},
				{
					"text": "ExplexConsole-Italic",
					"value": "explexc-i"
				},
				{
					"text": "ExplexConsole-Bold",
					"value": "explexc-b"
				},
				{
					"text": "ExplexConsole-BoldItalic",
					"value": "explexc-bi"
				},
				{
					"text": "Explex35Console",
					"value": "explex35c"
				},
				{
					"text": "Explex35Console-Regular",
					"value": "explex35c-r"
				},
				{
					"text": "Explex35Console-Italic",
					"value": "explex35c-i"
				},
				{
					"text": "Explex35Console-Bold",
					"value": "explex35c-b"
				},
				{
					"text": "Explex35Console-BoldItalic",
					"value": "explex35c-bi"
				},
				{
					"text": "karakaze-Regular",
					"value": "karakaze-r"
				},
				{
					"text": "riipop-Regular",
					"value": "riipop-r"
				},
				{
					"text": "Soei-HG",
					"value": "soei-hg"
				},
				{
					"text": "Soei-HGS",
					"value": "soei-hgs"
				},
				{
					"text": "Soei-HGP",
					"value": "soei-hgp"
				},
				{
					"text": "Fira Code",
					"value": "firacode"
				},
				{
					"text": "Fira Code VF",
					"value": "firacode-vf"
				},
				{
					"text": "Onryou",
					"value": "onryou"
				},
				{
					"text": "HackGen-Regular",
					"value": "hack-r"
				},
				{
					"text": "HackGen-Bold",
					"value": "hack-b"
				},
				{
					"text": "HackGen35-Regular",
					"value": "hack35-r"
				},
				{
					"text": "HackGen35-Bold",
					"value": "hack35-b"
				},
				{
					"text": "HackGenConsole-Regular",
					"value": "hackc-r"
				},
				{
					"text": "HackGenConsole-Bold",
					"value": "hackc-b"
				},
				{
					"text": "HackGen35Console-Regular",
					"value": "hack35c-r"
				},
				{
					"text": "HackGen35Console-Bold",
					"value": "hack35c-b"
				},
				{
					"text": "Sotoportego",
					"value": "sotoportego"
				}
			],
			"select-change-event-function": val => {
				editDeviceInformation("font-family", val);
			},
			"init-disabled": false
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
	if (getDeviceInformation("save--user-data--localstorage"))
		reloadDisplaySettingValues();
}

window.addEventListener("load", () => {
	loadedFunc();
});
document.addEventListener("setting-display-reload", () => {
	reloadDisplaySettingValues();
});

function reloadDisplaySettingValues() {
	if (getDeviceInformation("allow--opening--setting-display--after--reload") && getDeviceInformation("setting-display-open")) {
		editDeviceInformation("setting-display-open", false);
		document.querySelector(displayElementQueryArray[0]["trigger-element"][0]).click();
	}
	[...document.querySelectorAll("#display-setting-main-contents-setting .tab-bar--contents")][Number(getDeviceInformation("setting-display-init-item-index"))].click();

	[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"][data-mydef--import-template-type="utils-setting"]`)].forEach(c => {
		const _arg = c.getAttribute("template-id-args");
		const data = getDeviceInformation(_arg);
		if (data != null)
			c.querySelector(".toggle_input").checked = Boolean(data);
	});

	if (getDeviceInformation("force-theme")) {
		const _sel = document.querySelector("#setting-display--appearance--input-select--theme-setting");
		_sel.disabled = false;
		_sel.value = getDeviceInformation("theme-type");
	}
	if (getDeviceInformation("force-device")) {
		const _sel = document.querySelector("#setting-display--appearance--input-select--device-mode-setting");
		_sel.disabled = false;
		_sel.value = getDeviceInformation("device-type");
	}
	document.querySelector("#setting-display--appearance--input-select--font-setting").value = String(getDeviceInformation("font-family"));
	document.querySelector("#setting-display--specific--input-select--setting-display-init-item").value = String(getDeviceInformation("setting-display-init-item-index"));
}