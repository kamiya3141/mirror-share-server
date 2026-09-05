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

const this_file_url = new URL(String((document.currentScript.getAttribute("src") ? document.currentScript.getAttribute("src") : document.currentScript.getAttribute("href"))));
const this_is_none_version = this_file_url.searchParams.has("none");
const this_is_svg_file = this_file_url.searchParams.has("svg") || false;
const this_is_full_version = this_file_url.searchParams.has("full") || false;
const this_is_only_css = this_file_url.searchParams.has("css") || false;



(() => {
	if (!this_is_svg_file) {
		const font_loading_display_div_element = document.createElement("div");
		font_loading_display_div_element.id = "font_loading_display_div_element-id";
		font_loading_display_div_element.setAttribute("data-mydef--font_loading_display_div_element--default-display-style", "flex");
		font_loading_display_div_element.innerHTML = `
<style>
	#${font_loading_display_div_element.id} {
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		background-color: rgba(0, 0, 0, 0);
		text-align: center;
		z-index: 999;
		justify-content: center;
		align-items: center;

		&::before {
			content: "";
			background-color: #444b;
			backdrop-filter: blur(0.25rem);
			width: 100%;
			height: 100%;
		}

		& .main-title {
			display: inline-block;
			font-family: 'Note Sans JP';
			font-size: 5rem;
		}
	}
</style>
<h1 class="main-title">フォント<br>読み込み中</h1>`;
		font_loading_display_div_element.style.display = "none";
		document.getElementsByTagName("body")[0].prepend(font_loading_display_div_element);

		if (!this_is_none_version) {
			const add_arr_css = this_is_full_version ? [["link", "stylesheet", "common-src/css/utils/utils.css"]] : [];
			adds_head([
				["link", "stylesheet", "common-src/css/base.css"],
				...add_arr_css
			]);

			if (!this_is_only_css) {
				const add_arr_js = this_is_full_version ? ["utils-render.js", "utils.js", "device-info.js", "setup.js", "utils-after.js"].map(c => ["script", `common-src/javascript/utils/${c}`]) : [];
				adds_body([
					["script", "common-src/javascript/function/math.js"],
					["script", "common-src/javascript/function/other.js"],
					...add_arr_js
				]);
			}
		}
	}

	function createLinkElement(arr_ch = []) {
		let l = document.createElement(arr_ch[0]);
		l.setAttribute("rel", arr_ch[1]);
		// l.setAttribute("defer", "");
		l.setAttribute("href", `${winMySrcFileBasePath}/${arr_ch[2]}`);
		if (arr_ch[3] != null) l.setAttribute("type", arr_ch[3]);
		return l;
	}

	function adds_head(arr = [["", "", ""]]) {
		let head = document.getElementsByTagName("head")[0];
		for (let i = 0; i < arr.length; i++) {
			if (arr.length < 1)
				continue;
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
	"__fontFamily": "'Note Sans JP'",
	"__fontFamilyAddString": ", sans-serif",
	"__tabSize": 4,
	"__fontFamilyChangedFlag": "",
	get "__onlyFontFamily"() {
		return this["fontFamily"].replace(this["__fontFamilyAddString"], "");
	},
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
		// フォントファミリが変更されたとき
		if (this["__onlyFontFamily"] != input)
			this["editFontFamilyChangedFlag"](false, this["__onlyFontFamily"], input);
		this["__fontFamily"] = `${input}${this["__fontFamilyAddString"]}`;
	},
	get "fontFamily"() {
		return this["__fontFamily"];
	},
	set "tabSize"(input) {
		if (isNaN(Number(input)))
			input = 4;
		this["__tabSize"] = Number(input);
	},
	get "tabSize"() {
		return this["__tabSize"];
	},
	"editFontFamilyChangedFlag": function (_get_flag = false, ...args) {
		if (!_get_flag) {
			if (this["__fontFamilyChangedFlag"].length)
				this["__fontFamilyChangedFlag"] = "";
			else
				this["__fontFamilyChangedFlag"] = (args.length ? args.join("\n") : "none");
		}
		return this["__fontFamilyChangedFlag"];
	}
};

var hasFlag = _flg => new URL(winMyHref).searchParams.has(_flg);
var getFlag = _flg => new URL(winMyHref).searchParams.get(_flg);

var fontFamilyChangedEventFunc = () => document.dispatchEvent(new CustomEvent("my-event--font-family--changed", {
	"detail": {
		"data": setThemeArgsHistoryObject["editFontFamilyChangedFlag"](true)
	}
}));

function dec2bin(ipt, len = 4, with_0b = false) {
	return (with_0b ? "0b" : "") + String(String(ipt.toString(2)).padStart(len, "0"));
}

function setTheme(add_msg = "") {
	let { forceTheme, themeType, forceDevice, deviceType, preferColor, fontFamily, tabSize } = setThemeArgsHistoryObject;
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
		["StylingFontFamily", [fontFamily, fontFamily], async el => {
			if (setThemeArgsHistoryObject["editFontFamilyChangedFlag"](true)) {
				fontFamilyChangedEventFunc();
				await document.fonts.load(getComputedStyle(el).font);
				setThemeArgsHistoryObject["editFontFamilyChangedFlag"]();
				fontFamilyChangedEventFunc();
				// window.setTimeout(fontFamilyChangedEventFunc, 10);
			}
		}],
		["StylingUserPreferColor", [preferColor, preferColor]],
		["StylingTabSize", [tabSize, tabSize]]
	].forEach(async c => {
		document.documentElement.style.setProperty(`--my${c[0]}`, c[1][n_idx]);
		if (c.length == 3)
			await c[2](document.documentElement);
	});

	document.documentElement.setAttribute("data-theme", forceTheme ? themeType : "system");
	document.documentElement.setAttribute("data-my-device-type", (forceDevice && deviceType == "device") ? checkCurrentDeviceString() : deviceType);

	/*	if (add_msg.length > 0)
		console.log(add_msg, forceTheme, themeType, forceDevice, deviceType, preferColor, fontFamily, tabSize);*/
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


document.addEventListener("my-event--font-family--changed", e => {
	const _display_element = document.getElementById("font_loading_display_div_element-id");
	const _default_display_style = _display_element.getAttribute("data-mydef--font_loading_display_div_element--default-display-style");
	const current_display_style = _display_element.style.display;
	_display_element.style.display = (current_display_style == "none" ? _default_display_style : "none");
	if (e["detail"]) {
		if (Object.hasOwn(e["detail"], "data")) {
			if (typeof e["detail"]["data"] == "string") {
				if (e["detail"]["data"].length > 0 && e["detail"]["data"] != "none")
					console.log(e["detail"]["data"]);
			} else
				console.error(`document::event::${e.type}\nTypeError -> typeof e["detail"]["data"] = ${typeof e["detail"]["data"]}`);
		} else
			console.error(`document::event::${e.type}\nUndefined -> e["detail"] don't have "data" property.\n${e["detail"]}`);
	} else
		console.error(`document::event::${e.type}\nUndefined -> {Event} don't have "detail" property.\n${e}`);
});

const console_clear_ok = document.querySelector("span#console-ok");

if (!this_is_svg_file && console_clear_ok === null) {
	// console.clear();
	console.log("コンソールに入力しないでください");
}