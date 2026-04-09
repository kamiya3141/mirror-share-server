var tamuraFirstLoadWindowVarsKeyName = "tamuraFirstLoading";
window[tamuraFirstLoadWindowVarsKeyName] = {
	"__MySourceFileBasePathArray": ["https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main", "https://kamiya3141.github.io/mirror-share-server", "https://share.tshuto.com"],
	"__MySourceFileBasePathArrayIndex": 1,
	"myHref": new URL(window.location.toString()),
	get "mySourceFileBasePath"() {
		return this["__MySourceFileBasePathArray"][this["__MySourceFileBasePathArrayIndex"]];
	},
	get "mySourceFileBasePathArray"() {
		return this["__MySourceFileBasePathArray"];
	},
	get "mySourceFileBasePathArrayIndex"() {
		return this["__MySourceFileBasePathArrayIndex"];
	},
	set "mySourceFileBasePathArrayIndex"(input) {
		const inputType = String(typeof input);
		const inputInArrayLengthRange = Boolean(input > 0 && input < this["__MySourceFileBasePathArray"].length);

		if (inputType == "number") {
			if (inputInArrayLengthRange)
				this["__MySourceFileBasePathArrayIndex"] = Number(input);
			else
				console.error(`window["tamuraFirstLoading"]["mySourceFileBasePathArrayIndex"]に範囲外の値が入力されました。\ninput: ${input}`);
		} else
			console.error(`window["tamuraFirstLoading"]["mySourceFileBasePathArrayIndex"]に整数以外の値が入力されました。\ntypeof input: ${inputType}`);
	}
};

var WINV = window[tamuraFirstLoadWindowVarsKeyName];

WINV["mySourceFileBasePathArrayIndex"] = 1;

// window.location.href
/**
 * @type {URL} 現在のwindow.location.href
 */
var winMyHref = WINV["myHref"];
var winMyHrefHostname = winMyHref.hostname;
var winMyHrefPathname = winMyHref.pathname;
var winMyHrefPTCHostname = `${winMyHref.protocol}//${winMyHrefHostname}`;
var winMyHrefPTCHNPathname = `${winMyHrefPTCHostname}${winMyHrefPathname}`;

// 相対パスで指定されたソースファイル取得時に元となるURLはGitHubのMirrorServer、share-serverのどちらか
var winMySrcFileBasePath = WINV["mySourceFileBasePath"];

(() => {
	const this_is_svg_file = (new URL(String((document.currentScript.getAttribute("src") ? document.currentScript.getAttribute("src") : document.currentScript.getAttribute("href"))))).searchParams.has("svg") || false;

	if (!this_is_svg_file) {

		adds_head([
			["link", "icon", "favicon.ico", "image/x-icon"],
			["link", "stylesheet", "common-src/css/base.css"]
		]);

		const only_css = (new URL(String(document.currentScript.getAttribute("src")))).searchParams.has("css") || true;
		if (!only_css)
			adds_body([
				["script", "common-src/javascript/function/math.js"],
				["script", "common-src/javascript/function/other.js"]
			]);
	}

	function createLinkElement(arr_ch = []) {
		let l = document.createElement(arr_ch[0]);
		l.setAttribute("rel", arr_ch[1]);
		l.setAttribute("defer", "");
		l.setAttribute("href", `${winMySrcFileBasePath}/${arr_ch[2]}`);
		if (arr_ch[3] != null) l.setAttribute("type", arr_ch[3]);
		return l;
	}

	function adds_head(arr = [["", "", ""]]) {
		let head = document.getElementsByTagName("head")[0];
		for (let i = 0; i < arr.length; i++) {
			let link = createLinkElement(arr[i]);
			if (String(arr[i][2]).includes("/base.css")) {
				if ([...head.getElementsByTagName("link")].some(c => String(c.getAttribute("href")).includes("/base.css")))
					continue;
			}
			head.appendChild(link);
		}
	}

	function adds_body(arr = [["", ""]]) {
		let body = document.getElementsByTagName("body")[0];
		arr = arr.reverse();
		for (let i = 0; i < arr.length; i++) {
			let elem = document.createElement(arr[i][0]);
			elem.setAttribute("defer", "");
			elem.setAttribute("src", `${winMySrcFileBasePath}/${arr[i][1]}`);
			body.prepend(elem);
		}
	}

})();

var checkCurrentSystemThemeLight = () => Boolean(!window.matchMedia("(prefers-color-scheme: dark)").matches);
var checkCurrentSystemThemeDark = () => !checkCurrentSystemThemeLight();
var useOldUserAgentDataValue = false;
var checkCurrentDeviceMobile = () => Boolean((new RegExp("Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini", "i")).test(useOldUserAgentDataValue ? navigator.userAgent : (navigator.userAgentData ? (navigator.userAgentData.mobile ? "Android" : "PC") : navigator.userAgent)));
var checkCurrentDevicePC = () => !checkCurrentDeviceMobile();

// 毎回書くのがばかばかしいので関数化
var getCSSLengthValue = propertyName => getComputedStyle(document.documentElement).getPropertyValue(propertyName).replace("px", "");

// 前回の真偽値の引数を記録する数値
var setThemeArgsHistory = 0b0000;

// 前回の真偽値を保存するオブジェクト
var setThemeArgsHistoryObject = {
	"__forceTheme": false,
	"__themeLight": false,
	"__forceDevice": false,
	"__deviceMobile": false,
	"__check_and_input_boolean_func": (input = false, key_name = "") => {
		if (typeof input != "boolean")
			console.error(`setThemeArgsHistoryObject["${key_name}"]に真偽値以外の入力がありました。\ninput: ${input}\nkey_name: ${key_name}`);
		else
			this[`__${key_name}`] = input;
	},
	set "forceTheme"(input) {
		this["__forceTheme"] = Boolean(input);
	},
	set "themeLight"(input) {
		this["__themeLight"] = Boolean(input);
	},
	set "forceDevice"(input) {
		this["__forceDevice"] = Boolean(input);
	},
	set "deviceMobile"(input) {
		this["__deviceMobile"] = Boolean(input);
	},
	get "forceTheme"() {
		return this["__forceTheme"];
	},
	get "themeLight"() {
		return this["__themeLight"];
	},
	get "forceDevice"() {
		return this["__forceDevice"];
	},
	get "deviceMobile"() {
		return this["__deviceMobile"];
	}
};

function dec2bin(ipt, len = 4, with_0b = false) {
	return (with_0b ? "0b" : "") + String(String(ipt.toString(2)).padStart(len, "0"));
}

function setTheme() {
	let { forceTheme, themeLight, forceDevice, deviceMobile } = setThemeArgsHistoryObject;
	// console.log(forceTheme, themeLight, forceDevice, deviceMobile);
	// let forceTheme, themeLight, forceDevice, deviceMobile;
	// dec2bin(setThemeArgsHistory).split("").map(v => Boolean(Number(v)));

	const n_idx = Number(deviceMobile);
	const r_idx = Number(!Boolean(n_idx));
	let ipt_w = [document.documentElement.clientWidth, screen.width];
	let ipt_h = [document.documentElement.clientHeight, screen.height];
	const tf = Number(forceDevice ? deviceMobile : Boolean(n_idx));
	[
		["StylingWidth", [ipt_w[n_idx], ipt_w[n_idx]].map(c => `${c}px`)],
		["StylingHeight", [ipt_h[n_idx], ipt_h[n_idx]].map(c => `${c}px`)],
		["StylingRealWidth", [ipt_w[r_idx], ipt_w[r_idx]].map(c => `${c}px`)],
		["StylingRealHeight", [ipt_h[r_idx], ipt_h[r_idx]].map(c => `${c}px`)],
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));
	[
		["StylingFont", [`${(ipt_w[1] + ipt_h[1]) * 6 / 1000}px`, `1rem`]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));

	document.documentElement.setAttribute("data-theme", forceTheme ? ["dark", "light"][Number(themeLight)] : "system");

	const dt_my_dv_type = (Boolean(tf) ? "mobile" : "desktop");
	document.documentElement.setAttribute("data-my-device-type", dt_my_dv_type);
	if (dt_my_dv_type == "mobile")
		console.log(checkCurrentDeviceMobile(), n_idx, [forceDevice, deviceMobile, Boolean(n_idx)], [deviceMobile, Number(deviceMobile)], [Boolean(n_idx), Number(Boolean(n_idx))]);
}

window.addEventListener("resize", () => {
	setTheme();
});

window.addEventListener("load", () => {
	setTheme();
});

/*
if (document.querySelector("span#console-ok") === null) {
	console.clear();
	console.log("コンソールに入力しないでください");
}
*/