var target_parent_element = document.querySelector("#button-box--item-box");

function loadedWindowAfter() {
	CURRENT_STACKED_DIR_DEPTH = [DEFINE_JSON_DIR["root"], "page--1"];
	setButtons();
}

function createButton(key_name = "", decoded_json_data = {}) {
	const btn_el = document.createElement("button");
	btn_el.type = "button";
	const img_el = document.createElement("img");
	img_el.src = convertEnvVars(decoded_json_data["icon"] ? decoded_json_data["icon"] : "%word.url0;void.png");
	btn_el.appendChild(img_el);
	btn_el.addEventListener("click", () => {
		const data_type = convertEnvVars(decoded_json_data["data-type"]);
		if (data_type == DEFINE_JSON_DIR["page"] || data_type == DEFINE_JSON_DIR["directory"])
			MoveToUpDownDirectory(false, key_name);
		else if (data_type == DEFINE_JSON_DIR["button"])
			sendDataForWebSocketServer(CMD_DATA["data"][key_name]["data"]);

		console.log(data_type, decoded_json_data["data-type"]);
	});
	return btn_el;
}

function setButtons() {
	target_parent_element.innerHTML = "";
	Object.keys(CurrentStackedDirObject()).forEach(c => target_parent_element.appendChild(createButton(c, CMD_DATA["data"][c])));
}

function sendDataForWebSocketServer(decoded_json_data = {}) {
	if (decoded_json_data == null)
		myAlertMessage("送信予定のデータが空です");
	else {
		const send_data = JSON.stringify(decoded_json_data);
	}
}