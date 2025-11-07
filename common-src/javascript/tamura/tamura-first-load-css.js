let host_url = "https://share.tshuto.com";
//host_url = "https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main";

adds_head([
	["link", "icon", "favicon.ico", "image/x-icon"],
	["link", "stylesheet", "common-src/css/base.css"]
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

if (document.getElementById("console-ok") == null) {
	console.clear();
	console.log("コンソールに入力しないでください");
}

function setTheme() {
	const ipt_w = document.documentElement.clientWidth, ipt_h = document.documentElement.clientHeight;
	const tf = Number(Boolean(!window.matchMedia("(prefers-color-scheme: dark)").matches));
	[
		["StylingWidth", [ipt_w, ipt_w].map(c => `${c}px`)],
		["StylingHeight", [ipt_h, ipt_h].map(c => `${c}px`)],
		["MainBackgroundColor", ["#181818", "#ffffff"]],
		["TextColor", ["#ffffff", "#131313"]],
		["ElementBackgroundColor", ["#242424", "#f9f9f9"]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));
}

setTheme();