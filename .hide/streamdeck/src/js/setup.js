var CMD_DATA = {};
var STRUCTURE_DATA = {};
var PAGE_ARRAY = [];
var PAGE_ARRAY_INDEX = 0;

var target_parent_element = document.querySelector("#button-box--item-box");


const MY_FUNCTIONS = {};
let CURRENT_STACKED_DIR_DEPTH = [];
let DEFINE_JSON_DIR = {
	"root": "root",
	"page": "page",
	"directory": "dir",
	"button": "icon",
	"url0": "https://nextcloud.tshuto.com/remote.php/dav/files/shuuto/Other-Data/public/image/icon-png/"
};

async function loadedWindowSetupFunc() {
	const res0 = await fetch(`./src/json/cmd-data.json`);
	CMD_DATA = await res0.json();
	const res1 = await fetch(`./src/json/structure-data.json`);
	STRUCTURE_DATA = await res1.json();

	PAGE_ARRAY = Object.keys(STRUCTURE_DATA["root"]);

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
	const _obj = org_obj;
	return input_str.split(".").reduce((obj, key) => obj[key], _obj);
}

function CurrentStackedDirObject() {
	return DotToObject(STRUCTURE_DATA, CURRENT_STACKED_DIR_DEPTH.join("."));
}

function getCurrentStackedObjectData() {
	return CMD_DATA["data"][CURRENT_STACKED_DIR_DEPTH.at(-1)];
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
	setButtons();
}

function MoveToPage(next_prev_tf = true) {
	const data_type = convertEnvVars(getCurrentStackedObjectData()["data-type"]);
	if (data_type == DEFINE_JSON_DIR["page"]) {
		if (next_prev_tf)
			PAGE_ARRAY_INDEX = ++PAGE_ARRAY_INDEX % PAGE_ARRAY.length;
		else
			PAGE_ARRAY_INDEX--;
		if (PAGE_ARRAY_INDEX < 0)
			PAGE_ARRAY_INDEX = PAGE_ARRAY.length - 1;
		CURRENT_STACKED_DIR_DEPTH.pop();
		CURRENT_STACKED_DIR_DEPTH.push(PAGE_ARRAY[PAGE_ARRAY_INDEX]);
	}
	setButtons();
}