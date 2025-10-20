parentElement = document.querySelector("svg#parent-svg");
parentElement.setAttribute("my-attr-jump-href", "false");

parentElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

let frame_count = 0;
let loading_text_id;
const loading_text = ["Loading...", "Completed!"];
let SWITCH_FLAG = false;

function setup() {
	frame_count = 0;
	parentElement.innerHTML += `<image href="https://share.tshuto.com/favicon.ico" x="${width / 2 - common_small_r * 3}" y="${height / 4 - common_small_r * 3}" width="${common_small_r * 6}" height="${common_small_r * 6}"></image><text id="loading-text-id" class="loading-text-class" text-anchor="middle" x="${width /
		2}" y="${height / 2}" font-size="${common_small_r * 3}" fill="blue"></text>`;

	loading_text_id = document.getElementById("loading-text-id");
	loading_text_id.classList.add("before");
	loading_text_id.innerHTML = loading_text[0];
	SWITCH_FLAG = false;
	parentElement.setAttribute("my-attr-jump-href", "not-href");
}
let frame_rate = 30;
window.addEventListener("load", () => {
	setup();
	setInterval(function () {
		//フラグを折る条件
		if (
			String(parentElement.getAttribute("my-attr-jump-href")) == "true" &&
			SWITCH_FLAG == false
		)
			SWITCH_FLAG = true;
		frame_count++;
		if (frame_count == 360) frame_count = 0;

		if (SWITCH_FLAG == true && loading_text_id.innerHTML == loading_text[0]) {
			//loading_text_id.classList.remove("before");
			//loading_text_id.classList.add("after");
			//loading_text_id.innerHTML = loading_text[1];
			setTimeout(function () {
				//setup();
				parentElement.setAttribute("class", "loading animation-end");
				window.parent.postMessage("end", "*");
			}, 1500);
		}
	}, 1000 / frame_rate);
});