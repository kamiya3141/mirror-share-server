function resetSiteSettingInformationData(allowDisplayWarningMessage = true) {
	if (allowDisplayWarningMessage)
		myAlertMessage("サイト設定を初期化します。\nページがリロードされると元に戻るためご注意ください。");
	setOriginSiteSettingValueForSiteSetting();
	document.dispatchEvent(new CustomEvent("setting-site-display-reload"));
}

function removeSiteSettingInformationData(allowDisplayWarningMessage = true) {
	resetSiteSettingInformationData(false);
	setSiteSettingDataForLocalStorage(true);
	if (allowDisplayWarningMessage)
		myAlertMessage("サイト設定を削除しました。");
}

function setOriginSiteSettingValueForSiteSetting() {
	Object.assign(site_setting, origin_site_setting);
}

function getSiteSettingInformation(_key = "") {
	let ret_val = null;

	if (Object.hasOwn(site_setting, _key))
		ret_val = site_setting[_key];
	else
		console.error(`function error: "editSiteSettingInformation"\n\tマップ変数:site_settingに${_key}というキーはありません\n${Object.entries(site_setting).map(([k, v]) => (k + " : " + v)).join("\n")}`);

	return ret_val;
}

function editSiteSettingInformation(_key = "", _value = null) {
	if (Object.hasOwn(site_setting, _key))
		site_setting[_key] = _value;
	else
		console.error(`function error: "editSiteSettingInformation"\n\tマップ変数:site_settingに${_key}というキーはありません\n${Object.entries(site_setting).map(([k, v]) => (k + " : " + v)).join("\n")}`);
	setSiteSettingDataForLocalStorage(_key == "save--setting-site--localstorage" ? true : getSiteSettingInformation("save--setting-site--localstorage"));
}

function reloadSiteSettingInformation(add_msg = "") {
	if (add_msg == "init")
		syncSiteSettingDataForLocalStorage();
	[
		["MainBackgroundColor", "site-setting--main-background-color"],
		["TextColor", "site-setting--main-text-color"],
		["ElementBackgroundColor", "site-setting--element-background-color-1"],
		["ElementBackgroundColor2", "site-setting--element-background-color-2"]
	].forEach(arr => {
		document.documentElement.style.setProperty(`--myStylingLocalMarkdown${arr[0]}`, rgbToHex(getSiteSettingInformation(arr[1])));
	});
}

// localStorage

function setSiteSettingDataForLocalStorage(set_data_flag = false) {
	if (set_data_flag)
		localStorage.setItem(localStorageSiteSettingObjectKeyName, JSON.stringify(site_setting));
}

function getSiteSettingDataForLocalStorage() {
	return JSON.parse(localStorage.getItem(localStorageSiteSettingObjectKeyName));
}

function syncSiteSettingDataForLocalStorage() {
	Object.assign(site_setting, getSiteSettingDataForLocalStorage());
}

const localStorageSiteSettingObjectKeyName = "site-setting-data";

const origin_site_setting = {
	"site-setting--main-background-color": getCSSLengthValue("--myMainBackgroundColor"),
	"site-setting--main-text-color": getCSSLengthValue("--myTextColor"),
	"site-setting--element-background-color-1": getCSSLengthValue("--myElementBackgroundColor"),
	"site-setting--element-background-color-2": getCSSLengthValue("--myElementBackgroundColor2"),
	"site-setting--markdown-design": "default",
	"site-setting--disallow-override-colors": false,
	"setting-site-display-init-item-index": 0,
	"allow--opening--setting-site-display--after--reload": false,
	"save--setting-site-data--localstorage": false,
	"setting-site-display-open": false
};

var site_setting = {};

setOriginSiteSettingValueForSiteSetting();
if (localStorage.getItem(localStorageSiteSettingObjectKeyName) == null)
	setSiteSettingDataForLocalStorage(true);

// "init" は消すな
reloadSiteSettingInformation("init");
