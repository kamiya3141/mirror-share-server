parentElement = document.querySelector("svg#parent-svg");
parentElement.setAttribute("my-attr-jump-href", "false");

parentElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

const animateInfoArray = [
	["x1", `0;${width};0;${width};0`],
	["x2", `${width};0;${width};0;${width}`],
	["y1", `0;0;${height};${height};0`],
	["y2", `0;${height};${height};0;0`]
];
animateInfoArray.forEach(c =>
	document.querySelector(`animate[attributeName=${c[0]}]`).setAttribute("values", c[1])
);

let frame_count = 0;
const lineGrad = document.getElementById("grad1");
const lineGrad_dur = 4;
let loading_text_id;
const loading_text = ["Loading...", "Completed!"];
let SWITCH_FLAG = false;

function setup() {
	frame_count = 0;
	parentElement.innerHTML += `<text id="loading-text-id" class="loading-text-class" text-anchor="middle" x="${width /
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
	setInterval(function() {
		//フラグを折る条件
		if (
			String(parentElement.getAttribute("my-attr-jump-href")) == "true" &&
			SWITCH_FLAG == false
		)
			SWITCH_FLAG = true;
		frame_count++;
		if (frame_count == 360) frame_count = 0;

		if (SWITCH_FLAG == true && loading_text_id.innerHTML == loading_text[0]) {
			loading_text_id.classList.remove("before");
			loading_text_id.classList.add("after");
			loading_text_id.innerHTML = loading_text[1];
			setTimeout(function() {
				//setup();
				parentElement.setAttribute("class", "loading animation-end");
				window.parent.postMessage("end", "*");
			}, 3000);
		}
	}, 1000 / frame_rate);
});
function hsbToRgb(h, s, b, alpha = "1") {
	s /= 100;
	b /= 100;
	let c = b * s;
	let x = c * (1 - Math.abs(h / 60 % 2 - 1));
	let m = b - c;
	let r = 0,
		g = 0,
		bl = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		bl = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		bl = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		bl = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		bl = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		bl = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		bl = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	bl = Math.round((bl + m) * 255);

	return `rgba(${r},${g},${bl},${alpha})`;
}
