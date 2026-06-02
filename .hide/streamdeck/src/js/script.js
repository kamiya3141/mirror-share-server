function loadedWindowAfter() {
	CURRENT_STACKED_DIR_DEPTH = [DEFINE_JSON_DIR["root"], PAGE_ARRAY[PAGE_ARRAY_INDEX]];
	setButtons();
}

function createButton(key_name = "", decoded_json_data = {}) {
	const btn_el = document.createElement("button");
	btn_el.type = "button";
	const img_el = document.createElement("img");
	img_el.src = convertEnvVars(decoded_json_data["icon"] ? decoded_json_data["icon"] : "%word.url0;void.png");
	btn_el.appendChild(img_el);
	const data_type = convertEnvVars(decoded_json_data["data-type"]);
	btn_el.addEventListener("click", () => {
		if (data_type == DEFINE_JSON_DIR["page"] || data_type == DEFINE_JSON_DIR["directory"])
			MoveToUpDownDirectory(false, key_name);
		else if (data_type == DEFINE_JSON_DIR["button"])
			sendDataForWebSocketServer(CMD_DATA["data"][key_name]["data"]);
		if (data_type == DEFINE_JSON_DIR["page"])
			PAGE_ARRAY_INDEX = PAGE_ARRAY.indexOf(key_name);
	});
	if (Object.hasOwn(decoded_json_data, "force-appear-title") && decoded_json_data["title"])
		btn_el.innerHTML += `<div class="title-element">${String(decoded_json_data["title"])}</div>`;
	return btn_el;
}

function setButtons() {
	const data_type = convertEnvVars(getCurrentStackedObjectData()["data-type"]);
	document.getElementById("move-page--next").disabled = Boolean(data_type != DEFINE_JSON_DIR["page"]);
	document.getElementById("move-page--prev").disabled = Boolean(data_type != DEFINE_JSON_DIR["page"]);
	target_parent_element.innerHTML = "";
	if (STRUCTURE_DATA_VERSION == 1)
		Object.keys(CurrentStackedDirObject()).forEach(c => target_parent_element.appendChild(createButton(c, CMD_DATA["data"][c])));
	else
		CurrentStackedDirObject()["data"].forEach(c => target_parent_element.appendChild(createButton(c["name"], CMD_DATA["data"][c["name"]])));
	document.querySelector("#contents--title-box > .title-element").innerHTML = String(getCurrentStackedObjectData()["title"]);
}

const socket = new WebSocket("wss://ws.tshuto.com");
let socket_activate = true;
socket.addEventListener("close", socketDeactivate);
socket.addEventListener("error", socketDeactivate);
window.setTimeout(() => SendPingPong(), 5 * 1000);

function SendPingPong() {
	if (!socket_activate)
		return;
	socket.send("ping");
	window.setTimeout(() => SendPingPong(), 10 * 1000 + Math.round(Math.random() * 100));
}
/**
 * 
 * @param {Event} _e 
 */
function socketDeactivate(_e) {
	socket_activate = false;
	myAlertMessage(`ws ${_e.type}`);
}

function sendDataForWebSocketServer(decoded_json_data = {}) {
	if (decoded_json_data == null)
		myAlertMessage("送信予定のデータが空です");
	else {
		const send_data = JSON.stringify(decoded_json_data);
		socket.send(send_data);
	}
}