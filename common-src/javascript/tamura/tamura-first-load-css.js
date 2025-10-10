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
		head.appendChild(link);
	}
}

if (document.getElementById("console-ok") == null) {
	console.clear();
	console.log("コンソールに入力しないでください");
}

const metaThemeWhite = document.createElement("meta");
const metaThemeBlack = document.createElement("meta");

metaThemeWhite.setAttribute("name", "theme-color");
metaThemeWhite.setAttribute("media", "(prefers-color-scheme: light)");
metaThemeWhite.setAttribute("content", "white");
document.getElementsByTagName("head")[0].appendChild(metaThemeWhite);

metaThemeBlack.setAttribute("name", "theme-color");
metaThemeBlack.setAttribute("media", "(prefers-color-scheme: dark)");
metaThemeBlack.setAttribute("content", "black");
document.getElementsByTagName("head")[0].appendChild(metaThemeBlack);
