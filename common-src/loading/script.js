let head = document.getElementsByTagName("head")[0];

let link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("defer", "");
link.setAttribute("href", "https://share.tshuto.com/common-src/loading/loading.css");
head.appendChild(link);

const div = document.createElement("div");
div.id = "loading-display";
document.body.prepend(div);

document.body.style.overflowX = "hidden";
document.body.style.overflowY = "hidden";

const target_svg_url = `${loading_base_myurl}/svg/outer-index.svg`;

let ifr = document.createElement("iframe");
ifr.id = "loading-iframe";
ifr.src = target_svg_url;
ifr.width = "100%";
ifr.height = "100%";
div.appendChild(ifr);

let svg_end_flag = false;

window.addEventListener("message", e => {
	if (e.data == "end") svg_end_flag = true;
});

window.addEventListener("load", e => {
	setTimeout(() => {
		ifr.contentWindow.postMessage("loaded", "*");
	}, 1500);
});

quitLoading();

function quitLoading() {
	if (svg_end_flag) {
		document.getElementById("loading-display").style.display = "none";
		document.body.style.overflowX = "unset";
		document.body.style.overflowY = "unset";
	} else setTimeout(() => quitLoading(), 1000 / 5);
}
