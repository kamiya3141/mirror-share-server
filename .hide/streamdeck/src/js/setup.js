var CMD_DATA = {};
var STRUCTURE_DATA = {};

const MY_FUNCTIONS = {};
let CURRENT_STACKED_DIR_DEPTH = [];

// [...document.querySelectorAll("frame")].forEach(c => c.onload = () => c.style.visibility = "visible");

async function loadedWindowSetupFunc() {
	const res0 = await fetch(`./src/json/cmd-data.json`);
	CMD_DATA = await res0.json();
	const res1 = await fetch(`./src/json/structure-data.json`);
	STRUCTURE_DATA = await res1.json();

	loadedWindowAfter();
}

window.addEventListener("load", async () => await loadedWindowSetupFunc());

function convertEnvVars(input_str = "") {
	const my_reg = new RegExp("([%&])(.*)");
	const match_result = input_str.match(my_reg);
	if (match_result == null && !input_str.includes(";"))
		return input_str;
	if (match_result[1] == "%") {
		input_str = input_str.split(";").map((c, i, arr) => (c = arr.length == 1 ? DotToObject(CMD_DATA["define"], match_result[2]) : convertEnvVars(c))).join("");
	} else
		input_str = MY_FUNCTIONS[match_result[2]];
	return input_str;
}

function DotToObject(org_obj = {}, input_str = "") {
	const _obj = structuredClone(org_obj);
	return input_str.split(".").reduce((c, currentValue) => currentValue[c], _obj);
}

function MoveToUpDownDirectory(up_down_tf = true, dir_name = "") {
	if (up_down_tf == true) {
		if (CURRENT_STACKED_DIR_DEPTH.length > 1) {
			CURRENT_STACKED_DIR_DEPTH.pop();
		} else
			myAlertMessage("これ以上のデータにはアクセスできません");
	} else if (dir_name) {
		CURRENT_STACKED_DIR_DEPTH.push(dir_name);
	} else
		myAlertMessage(`指定されたディレクトリ名は無効です\n${String(dir_name)}`);
	return CurrentStackedDirObject();
}

function CurrentStackedDirObject() {
	return DotToObject(STRUCTURE_DATA, CURRENT_STACKED_DIR_DEPTH.join("."));
}