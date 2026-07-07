var MY_DOMAIN = "tshuto.com";
var CREATE_MY_DOMAIN_URL = (_sb = "") => `https://${String(_sb) + ".".repeat(Number(Boolean(String(_sb).length))) + MY_DOMAIN}`;
var tamuraFirstLoadWindowVarsKeyName = "tamuraFirstLoading";
window[tamuraFirstLoadWindowVarsKeyName] = {
	"__MySourceFileBasePathArray": ["https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main", "https://kamiya3141.github.io/mirror-share-server", CREATE_MY_DOMAIN_URL("share")],
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
WINV["resize-event-cancel"] = false;

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

const this_is_svg_file = (new URL(String((document.currentScript.getAttribute("src") ? document.currentScript.getAttribute("src") : document.currentScript.getAttribute("href"))))).searchParams.has("svg") || false;

(() => {
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
var checkCurrentSystemThemeString = (__tf = checkCurrentSystemThemeLight()) => ["dark", "light"][Number(__tf)];
var useOldUserAgentDataValue = false;
var checkCurrentDeviceMobile = () => Boolean((new RegExp("Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini", "i")).test(useOldUserAgentDataValue ? navigator.userAgent : (navigator.userAgentData ? (navigator.userAgentData.mobile ? "Android" : "PC") : navigator.userAgent)));
var checkCurrentDevicePC = () => !checkCurrentDeviceMobile();
var checkCurrentDeviceString = (__tf = checkCurrentDeviceMobile()) => ["desktop", "mobile"][Number(__tf)];

// 毎回書くのがばかばかしいので関数化
var getCSSLengthValue = propertyName => getComputedStyle(document.documentElement).getPropertyValue(propertyName).replace("px", "");

// 前回の真偽値の引数を記録する数値
var setThemeArgsHistory = 0b0000;

// 前回の真偽値を保存するオブジェクト
var setThemeArgsHistoryObject = {
	"__forceTheme": false,
	"__themeType": "system",
	"__forceDevice": false,
	"__deviceType": checkCurrentDeviceString(),
	"__preferColor": "#00ff00",
	"__fontFamily": "var(--note-sans-jp)",
	"__fontFamilyAddString": "sans-serif",
	"__tabSize": 4,
	set "forceTheme"(input) {
		this["__forceTheme"] = Boolean(input);
	},
	set "themeType"(input) {
		this["__themeType"] = String(input);
	},
	set "forceDevice"(input) {
		this["__forceDevice"] = Boolean(input);
	},
	set "deviceType"(input) {
		this["__deviceType"] = String(input);
	},
	get "forceTheme"() {
		return this["__forceTheme"];
	},
	get "themeType"() {
		return this["__themeType"];
	},
	get "forceDevice"() {
		return this["__forceDevice"];
	},
	get "deviceType"() {
		return this["__deviceType"];
	},
	set "preferColor"(input) {
		this["__preferColor"] = String(input);
	},
	get "preferColor"() {
		return this["__preferColor"];
	},
	set "fontFamily"(input) {
		this["__preferColor"] = `${input}, ${this["__fontFamilyAddString"]}`;
	},
	get "fontFamily"() {
		return this["__fontFamily"].replace(`, ${this["__fontFamilyAddString"]}`, "");
	},
	set "tabSize"(input) {
		if (isNaN(Number(input)))
			input = 4;
		this["__tabSize"] = Number(input);
	},
	get "tabSize"() {
		return this["__tabSize"];
	}
};

function dec2bin(ipt, len = 4, with_0b = false) {
	return (with_0b ? "0b" : "") + String(String(ipt.toString(2)).padStart(len, "0"));
}

function setTheme(add_msg = "") {
	let { forceTheme, themeType, forceDevice, deviceType, preferColor, tabSize } = setThemeArgsHistoryObject;
	// let forceTheme, themeType, forceDevice, deviceType;
	// dec2bin(setThemeArgsHistory).split("").map(v => Boolean(Number(v)));

	// カンマ演算子 + 参考演算子
	const n_idx = (___a = Number(["device", "desktop", "mobile"].indexOf(deviceType) - 1), ___a < 0 ? Number(checkCurrentDeviceMobile()) : ___a);
	const r_idx = Number(!Boolean(n_idx));
	let ipt_w = [document.documentElement.clientWidth, window.screen.width];
	let ipt_h = [document.documentElement.clientHeight, window.screen.height];
	[
		["StylingWidth", [ipt_w[n_idx], ipt_w[n_idx]].map(c => `${c}px`)],
		["StylingHeight", [ipt_h[n_idx], ipt_h[n_idx]].map(c => `${c}px`)],
		["StylingRealWidth", [ipt_w[r_idx], ipt_w[r_idx]].map(c => `${c}px`)],
		["StylingRealHeight", [ipt_h[r_idx], ipt_h[r_idx]].map(c => `${c}px`)],
		["StylingFontSize", [`${(ipt_w[0] + ipt_h[0]) * 6 / 1000}px`, `1vmax`]],	//	clamp(8px, 24px)
		["StylingFontFamily", [`"Note Sans JP", sans-serif`, `"Note Sans JP", sans-serif`]],
		["StylingUserPreferColor", [preferColor, preferColor]],
		["StylingTabSize", [tabSize, tabSize]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][n_idx]));

	document.documentElement.setAttribute("data-theme", forceTheme ? themeType : "system");
	document.documentElement.setAttribute("data-my-device-type", (forceDevice && deviceType == "device") ? checkCurrentDeviceString() : deviceType);

	// if (add_msg.length > 0)
	//	console.log(add_msg, forceTheme, themeType, forceDevice, deviceType, preferColor, tabSize);
}

window.addEventListener("resize", () => {
	if (!WINV["resize-event-cancel"])
		setTheme();
});
window.visualViewport.addEventListener("resize", () => {
	if (!WINV["resize-event-cancel"])
		setTheme();
});

window.addEventListener("load", () => {
	if (!WINV["resize-event-cancel"])
		setTheme();
});


const console_clear_ok = document.querySelector("span#console-ok");

if (!this_is_svg_file && console_clear_ok === null) {
	// console.clear();
	console.log("コンソールに入力しないでください");
}