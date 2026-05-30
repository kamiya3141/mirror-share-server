function loadedWindowAfter() {
	CURRENT_STACKED_DIR_DEPTH = [STRUCTURE_DATA["name"]];
}

function createButton(input_src = "", decoded_json_data = {}) {
	const btn_el = document.createElement("button");
	btn_el.type = "button";
	const img_el = document.createElement("img");
	img_el.src = convertEnvVars(input_src);
	const div_el = document.createElement("div");
	div_el.classList.add("expanded-clear-element");
	div_el.addEventListener("click", e => {
		
	});
	btn_el.appendChild(img_el);
	btn_el.appendChild(div_el);
	return btn_el;
}