parentElement = document.querySelector("svg#parent-svg");
parentElement.setAttribute("my-attr-jump-href", "false");

parentElement.setAttribute("viewBox", `0 0 ${common_r * 2} ${common_r * 2}`);
let frame_count = floor(random(0, 360));
let circle_array = [];
const graph_r1 = height / 3;
const graph_r2 = height / 2 - height / 2.5;
let graph_rad = 0;
let graph_rad2 = 0;
const adding_number_org = 9;
const adding_number = adding_number_org + 0.01;
let add_str = "";
let loading_text_id;
const loading_text = ["Loading...", "Completed!"];
let SWITCH_FLAG = false;

function setup() {
	frame_count = floor(random(0, 360));
	circle_array = [];
	graph_rad = 0;
	graph_rad2 = 0;
	add_str = "";
	for (let i = 0; i < adding_number_org; i++) {
		let _rad = 360 / adding_number_org * (i + 1);
		let _x =
			common_cx +
			cos(radians(graph_rad + _rad)) * (graph_r1 + graph_r2 * sin(radians(graph_rad2)));
		let _y =
			common_cy +
			sin(radians(graph_rad + _rad)) * (graph_r1 + graph_r2 * sin(radians(graph_rad2)));
		let all_circle_str = "";
		let all_circle_arr = [];
		for (let j = 0; j < adding_number_org * 1; j++) {
			all_circle_str += all_circle_arr[
				all_circle_arr.push(
					new Circle(`circle-id-${i}-${j}`, `circle-class`, _x, _y, common_small_r, _rad)
				) - 1
			].create();
		}
		circle_array.push(all_circle_arr);
		add_str += all_circle_str;
	}
	parentElement.innerHTML =
		`
			<text id="loading-text-id" class="loading-text-class" text-anchor="middle" x="${common_r}" y="${common_r}" font-size="${common_small_r *
			3}" fill="red">
			</text>
		` + add_str;
	loading_text_id = document.getElementById("loading-text-id");
	loading_text_id.classList.add("before");
	loading_text_id.innerHTML = loading_text[0];
	SWITCH_FLAG = false;
	parentElement.setAttribute("my-attr-jump-href", "not-href");
}
let frame_rate = 50;
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
		graph_rad++;
		if (graph_rad == 360) graph_rad = 0;
		graph_rad2 += adding_number;
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
		circle_array.forEach(val => {
			val.forEach((val2, idx) => {
				val2.fill(hsbToRgb(frame_count, 100, 100, 1 - (idx + 1) / val.length));
				if (idx == 0) {
					if (!SWITCH_FLAG) {
						val2.goto_xy(
							common_cx +
								cos(radians(graph_rad + val2.rad)) *
									(graph_r1 + graph_r2 * sin(radians(graph_rad2))),
							common_cy +
								sin(radians(graph_rad + val2.rad)) *
									(graph_r1 + graph_r2 * sin(radians(graph_rad2)))
						);
					} else {
						if (
							(val2.x > 0 && val2.x < width && val2.y > 0 && val2.y < height) ||
							true
						) {
							let dist_m_c = dist(val2.x, val2.y, val[idx + 1].x, val[idx + 1].y);
							val2.goto_xy(
								val2.x + (val2.x - val[idx + 1].x) / dist_m_c * common_small_r / 2,
								val2.y + (val2.y - val[idx + 1].y) / dist_m_c * common_small_r / 2
							);
						}
					}
				} else {
					val2.goto_xy(val[idx - 1].px, val[idx - 1].py);
				}
			});
		});
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
