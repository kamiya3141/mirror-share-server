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

const SiteSettingInformation = new LocalStorageObject("site-setting-data", origin_site_setting, "save--setting-site-data--localstorage");
SiteSettingInformation.registerAddFunction("reset", () => document.dispatchEvent(new CustomEvent("setting-site-display-reload")));


function getSiteSettingInformation(_key = "") {
	return SiteSettingInformation.get(_key);
}

function editSiteSettingInformation(_key = "", _value = null) {
	SiteSettingInformation.set(_key, _value);
}

function reloadSiteSettingInformation(add_msg = "") {
	if (add_msg == "init")
		SiteSettingInformation.reload();
	if (!getSiteSettingInformation("site-setting--disallow-override-colors"))
		[
			["MainBackgroundColor", "site-setting--main-background-color"],
			["TextColor", "site-setting--main-text-color"],
			["ElementBackgroundColor", "site-setting--element-background-color-1"],
			["ElementBackgroundColor2", "site-setting--element-background-color-2"]
		].forEach(arr => document.documentElement.style.setProperty(`--myStylingLocalMarkdown${arr[0]}`, getSiteSettingInformation(arr[1])));
}

// "init" は消すな
reloadSiteSettingInformation("init");