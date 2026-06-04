document.documentElement.style.setProperty("--myStylingLocalGridCols", "5");

var STRUCTURE_DATA_VERSION = 2;

var CMD_DATA = {};
var STRUCTURE_DATA = {};
var PAGE_ARRAY = [];
var PAGE_ARRAY_INDEX = 0;

var target_parent_element = document.querySelector("#button-box--item-box");


const MY_FUNCTIONS = {
	"set-cols-3": () => {
		[["GridCols", 3], ["IconSize", 18]].forEach(c => document.documentElement.style.setProperty(`--myStylingLocal${c[0]}`, String(c[1])));
	},
	"set-cols-5": () => {
		[["GridCols", 5], ["IconSize", 15]].forEach(c => document.documentElement.style.setProperty(`--myStylingLocal${c[0]}`, String(c[1])));
	},
	"set-cols-7": () => {
		[["GridCols", 7], ["IconSize", 12]].forEach(c => document.documentElement.style.setProperty(`--myStylingLocal${c[0]}`, String(c[1])));
	}
};
let CURRENT_STACKED_DIR_DEPTH = [];
let DEFINE_JSON_DIR = {
	"root": "root",
	"page": "page",
	"directory": "dir",
	"special": "sp",
	"special-button": "sp-btn",
	"button": "icon"
	/*"url0": "https://file-nextcloud.tshuto.com/image/icon-png/"*/
};

async function loadedWindowSetupFunc() {
	const res0 = await fetch(`./src/json/cmd-data.json`);
	CMD_DATA = await res0.json();
	const res1 = await fetch(`./src/json/structure-data-${STRUCTURE_DATA_VERSION}.json`);
	STRUCTURE_DATA = await res1.json();
	if (STRUCTURE_DATA_VERSION == 1)
		PAGE_ARRAY = Object.keys(STRUCTURE_DATA["root"]);
	else
		PAGE_ARRAY = STRUCTURE_DATA["data"][0]["data"].map(c => c["name"]);
	loadedWindowAfter();
}

window.addEventListener("load", async () => await loadedWindowSetupFunc());

function convertEnvVars(input_str = "") {
	const my_reg = new RegExp("([%&])(.*)");
	const match_result = input_str.match(my_reg);
	if (match_result == null && !input_str.includes(";"))
		return input_str;
	if (match_result[1] == "%")
		input_str = input_str.split(";").map((c, i, arr) => (c = arr.length == 1 ? DotToObject(CMD_DATA["define"], match_result[2], true) : convertEnvVars(c))).join("");
	else {
		if (Object.hasOwn(MY_FUNCTIONS, match_result[2]))
			input_str = MY_FUNCTIONS[match_result[2]];
		else
			input_str = null;
	}
	return input_str;
}

function DotToObject(org_obj = {}, input_str = "", strc_ver_1 = false) {
	const _obj = org_obj;
	return input_str.split(".").reduce((obj, key) => {
		if (STRUCTURE_DATA_VERSION != 1 && !strc_ver_1) {
			if (obj["data"].hasOwnProperty("length"))
				return obj["data"].find(c => c["name"] == key);
			else {
				console.error("DotToObject実行中にエラーが発生：\nobjはlengthを持ちません");
				myAlertMessage("DotToObject実行中にエラーが発生：\nobjはlengthを持ちません");
			}
		}
		return obj[key];
	}, _obj);
}



function CurrentStackedDirObject(strc_ver_1 = false) {
	return DotToObject(STRUCTURE_DATA, CURRENT_STACKED_DIR_DEPTH.join("."), strc_ver_1);
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

function MoveToPage(next_prev_tf = true, sp_page = false) {
	let data_type = convertEnvVars(getCurrentStackedObjectData()["data-type"]);
	const _fnc = () => {
		if (next_prev_tf)
			PAGE_ARRAY_INDEX = ++PAGE_ARRAY_INDEX % PAGE_ARRAY.length;
		else
			PAGE_ARRAY_INDEX--;
		if (PAGE_ARRAY_INDEX < 0)
			PAGE_ARRAY_INDEX = PAGE_ARRAY.length - 1;
		CURRENT_STACKED_DIR_DEPTH.pop();
		CURRENT_STACKED_DIR_DEPTH.push(PAGE_ARRAY[PAGE_ARRAY_INDEX]);
		data_type = convertEnvVars(getCurrentStackedObjectData()["data-type"]);
	};
	_fnc();
	while (data_type != DEFINE_JSON_DIR[sp_page ? "special" : "page"])
		_fnc();
	setButtons();
}