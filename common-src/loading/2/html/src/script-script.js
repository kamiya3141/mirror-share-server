document.body.setAttribute("my-attr-jump-href", "false");

let frame_count = 0;
let loading_text_element;
const loading_text = ["Loading", ...(new Array(3)).fill("&#149;")].join("&#8194;");
let SWITCH_FLAG = false;
const frame_rate = 10;

function setup() {
	frame_count = 0;
	loading_text_element = document.getElementById("main-text");
	loading_text_element.classList.add("before");
	loading_text_element.innerHTML = loading_text;
	SWITCH_FLAG = false;
	document.body.setAttribute("my-attr-jump-href", "not-href");
}
function check_flag() {
	if (
		String(document.body.getAttribute("my-attr-jump-href")) == "true" &&
		SWITCH_FLAG == false
	) {
		SWITCH_FLAG = true;
	}
	frame_count++;
	if (frame_count == 360) frame_count = 0;

	loading_text_element = document.getElementById("main-text");

	if (SWITCH_FLAG == true) {
		setTimeout(function () {
			document.body.setAttribute("class", "loading animation-end");
			window.parent.postMessage("end", "*");
		}, 1500);
	} else
		setTimeout(() => check_flag(), 1000 / frame_rate);
}

window.addEventListener("load", () => {
	setup();
	check_flag();
});