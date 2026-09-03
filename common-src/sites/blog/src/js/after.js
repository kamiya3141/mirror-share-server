const id_flag = "id";
const edit_flag = "edit";
const new_flag = "new";

window.addEventListener("load", async () => {
	setupSiteSettingDisplay();
	if (!hasFlag("create-cache") && hasFlag(id_flag) && getFlag(id_flag).split("--").length == 2 && getFlag(id_flag).split("--")[1] == "articles")
		await loadAllArticles();
});
async function loadAllArticles() {
	const PMD = await import(`./markdown.js`);
	const all_decoded_json_data = await PMD.getAllArticleData();
	await appear_allArticlesDisplay(true, all_decoded_json_data);
}

const siteSettingColorsArray = [
	"setting-site-display--appearance--input-color--main-background-color",
	"setting-site-display--appearance--input-color--main-text-color",
	"setting-site-display--appearance--input-color--element-background-color-1",
	"setting-site-display--appearance--input-color--element-background-color-2"
];

function setupSiteSettingDisplay() {

	const __elem = document.querySelector("#setting-site-display-section");
	__elem.tabIndex = 0;
	[".open-setting-site-display-button-element", "#setting-site-display-div-main #control-box"].forEach(c1 => {
		[...document.querySelectorAll(c1)].forEach(c2 => {
			c2.addEventListener("click", e => {
				const _val = switchingOpenDisplay(__elem);
				editSiteSettingInformation("setting-site-display-open", _val);
			});
		});
	});

	Object.entries({
		"site-setting--disallow-override-colors": async __tf => {
			window.alert(__tf);
		}
	}).forEach(([k, v]) => toggleSwitchChangeEventAddFunctionFuncObj[k] = v);

	// トグルスイッチの設定
	[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"][data-mydef--import-template-type="site-setting"]`)].forEach(c => {
		const site_setting_id = c.getAttribute("template-id-args");
		c.querySelector(".toggle_input").addEventListener("change", async e => {
			if (!get_SetByScript(e.target)) {
				const chk = e.target.checked;
				await toggleSwitchChangeEventAddFunction(site_setting_id, chk, e.target);
				editSiteSettingInformation(site_setting_id, chk);
			}
			edit_SetByScript(e.target, false);
		});
	});

	// 設定画面内の画面切り替えの設定
	const setting_elem = document.getElementById("display-setting-site-main-contents-setting");
	const setting_display_main_contents_tab_bar_item_array = [...setting_elem.querySelectorAll(`[id^="tb--"]`)].map(c => String(c.id).replace("tb--", ""));
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

	// 色設定
	siteSettingColorsArray.forEach(id => setting_elem.querySelector(`#${id}`).addEventListener("change", e => {
		editSiteSettingInformation(`site-setting--${id.split("--").at(-1)}`);
		reloadSiteSettingInformation();
	}));
	[
		{
			"select-id": "setting-site-display--appearance--input-select--design-setting",
			"select-option-data-array": [
				{
					"text": "デフォルト",
					"value": "default"
				},
				{
					"text": "Zenn",
					"value": "zenn"
				},
				{
					"text": "Note",
					"value": "note"
				}
			],
			"select-change-event-function": val => {
				editSiteSettingInformation("site-setting--markdown-design", val);
				if (!getSiteSettingInformation("site-setting--disallow-override-colors")) {
					// 色を推奨値に上書きする(後々実装)
					window.alert(val);
				}
			},
			"init-disabled": true
		}
	].forEach(c1 => {
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
					reloadSiteSettingInformation("select-element-change-event");
			}
			edit_SetByScript(e.target, false);
		});
		document.getElementById(c1["select-id"]).disabled = c1["init-disabled"];
	});
	reloadDisplaySettingValues();
}

function reloadSiteSettingValues() {
	if (getSiteSettingInformation("allow--opening--setting-site-display--after--reload") && getSiteSettingInformation("setting-site-display-open")) {
		editSiteSettingInformation("setting-site-display-open", false);
		document.querySelector(".open-setting-site-display-button-element").click();
	}

	[...document.querySelectorAll("#display-site-setting-main-contents-setting .tab-bar--contents")][Number(getSiteSettingInformation("setting-site-display-init-item-index"))].click();

	[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"][data-mydef--import-template-type="site-setting"]`)].forEach(c => {
		const _arg = c.getAttribute("template-id-args");
		const data = getSiteSettingInformation(_arg);
		if (data != null)
			c.querySelector(".toggle_input").checked = Boolean(data);
	});

	const md_design = document.getElementById("setting-site-display--appearance--input-select--design-setting");
	if (!md_design.disabled)
		md_design.value = getSiteSettingInformation("site-setting--markdown-design");
	siteSettingColorsArray.forEach(id => document.getElementById("display-setting-site-main-contents-setting").querySelector(`#${id}`).value = getSiteSettingInformation(`site-setting--${id.split("--").at(-1)}`));

	document.querySelector("#setting-site-display--specific--input-select--setting-site-display-init-item").value = String(getSiteSettingInformation("setting-site-display-init-item-index"));
}