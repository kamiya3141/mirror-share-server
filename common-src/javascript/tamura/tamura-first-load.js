let host_url = "https://share.tshuto.com";
//host_url = "https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main";

adds_head([
	["link", "icon", "favicon.ico", "image/x-icon"],
	["link", "stylesheet", "common-src/css/base.css"]
]);

const only_css = (new URL(String(document.currentScript.getAttribute("src")))).searchParams.has("css");
if (!only_css)
	adds_body([
		["script", "common-src/javascript/function/math.js"],
		["script", "common-src/javascript/function/other.js"]
	]);

function adds_head(arr = [["", "", ""]]) {
	let head = document.getElementsByTagName("head")[0];
	for (let i = 0; i < arr.length; i++) {
		let link = document.createElement(arr[i][0]);
		link.setAttribute("rel", arr[i][1]);
		link.setAttribute("defer", "");
		link.setAttribute("href", `${host_url}/${arr[i][2]}`);
		if (arr[i][3] != null) link.setAttribute("type", arr[i][3]);
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
		elem.setAttribute("src", `${host_url}/${arr[i][1]}`);
		body.prepend(elem);
	}
}

if (document.getElementById("console-ok") == null) {
	console.clear();
	console.log("コンソールに入力しないでください");
}

var checkCurrentSystemThemeLight = () => Boolean(!window.matchMedia("(prefers-color-scheme: dark)").matches);
var checkCurrentSystemThemeDark = () => !checkCurrentSystemThemeLight();
var checkCurrentDeviceMobile = () => Boolean((new RegExp("Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini", "i")).test(navigator.userAgentData ? (navigator.userAgentData.mobile ? "Android" : "PC") : navigator.userAgent));
var checkCurrentDevicePC = () => !checkCurrentDeviceMobile();

function setTheme() {
	const ipt_w = document.documentElement.clientWidth, ipt_h = document.documentElement.clientHeight;
	const tf = Number(checkCurrentSystemThemeLight());
	const pc_or_mobile = Number(checkCurrentDeviceMobile);
	[
		["StylingWidth", [ipt_w, ipt_w].map(c => `${c}px`)],
		["StylingHeight", [ipt_h, ipt_h].map(c => `${c}px`)],
		["MainBackgroundColor", ["#242424", "#ffffff"]],
		["TextColor", ["#ffffff", "#131313"]],
		["ElementBackgroundColor", ["#181818", "#f9f9f9"]],
		["ElementBackgroundColor2", ["#303030", "#ffffff"]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));
	[
		["StylingFont", [`${(ipt_w + ipt_h) * 6 / 1000}px`, `1rem`]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));
}

setTheme();