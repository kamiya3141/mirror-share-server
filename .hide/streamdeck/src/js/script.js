function loadedWindowAfter() {

}

function createButton(input_src = "") {
	const btn_el = document.createElement("button");
	btn_el.type = "button";
	const img_el = document.createElement("img");
	img_el.src = convertEnvVars(input_src);
	btn_el.appendChild(img_el);
	return btn_el;
}