// parentElement = document.body;
parentElement.setAttribute("my-attr-jump-href", "false");

parentElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

let frame_count = 0;
let loading_text_element;
const loading_text = ["Loading", ...(new Array(3)).fill("&#149;")].join("&#8194;");
let SWITCH_FLAG = false;

function setup() {
	frame_count = 0;
	loading_text_element = document.getElementById("main-text");
	loading_text_element.classList.add("before");
	loading_text_element.innerHTML = loading_text;
	SWITCH_FLAG = false;
	parentElement.setAttribute("my-attr-jump-href", "not-href");
}
let frame_rate = 30;
window.addEventListener("load", () => {
	setup();
	setInterval(function () {
		if (
			String(parentElement.getAttribute("my-attr-jump-href")) == "true" &&
			SWITCH_FLAG == false
		)
			SWITCH_FLAG = true;
		frame_count++;
		if (frame_count == 360) frame_count = 0;

		loading_text_element = document.getElementById("main-text");

		if (SWITCH_FLAG == true && loading_text_element.innerHTML == loading_text) {
			setTimeout(function () {
				parentElement.setAttribute("class", "loading animation-end");
				window.parent.postMessage("end", "*");
			}, 1500);
		}
	}, 1000 / frame_rate);
});