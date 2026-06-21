const NO_YAJU_QUERY_NAME_ARRAY = ["yj", "yaju", "yajuu"];
const NO_ARTICLE_QUERY_NAME_ARRAY = ["atc", "ad", "adv"];
const YAJU_VALUE = "niKAylKNIEI";

const MAIN_URL = "-:-JSON-URL-:-";
console.log(MAIN_URL);

const STR_DEF_GET_DIRS = "get-dirs/";
const STR_DEF_GET_FILES = "get-files/";

const FREE_LINK_JSON_FILENAME = "link";
const FREE_LINK_JSON_FILEFULLNAME = `${FREE_LINK_JSON_FILENAME}.json`;

const current_query = new URLSearchParams((new URL(window.location.toString())).search);
const yajuExist = NO_YAJU_QUERY_NAME_ARRAY.some(c => current_query.has(c));
const notArticleFlagExist = NO_ARTICLE_QUERY_NAME_ARRAY.some(c => current_query.has(c));

let main_ol = document.getElementById("main-ol");
let sub_ol = document.getElementById("sub-ol");

// 広告用のYoutubeリンクのクエリパラメータのキー "v" の値を格納した配列
const youtube_v_array = [YAJU_VALUE, "39sjhHJrPLA", "6uv0rhZgDy0", "xi1Wk4kt1mA"].reverse();

const RECURSE_COUNT = 10;

window.addEventListener("load", () => setup());

function setup() {
	// 広告拒否ではないのなら広告を貼る
	if (notArticleFlagExist)
		sub_ol.appendChild(createElement_li_articleYoutube(youtube_v_array.at(-1)));
	else
		youtube_v_array.forEach(v => sub_ol.appendChild(createElement_li_articleYoutube(v)));
	// YAJU & U の消滅処理
	if (yajuExist)
		document.getElementById(YAJU_VALUE).parentElement.style.setProperty("display", "none", "important");

	if (notArticleFlagExist) {
		const tsm = document.querySelector(`ts-message[color-type="normal"]`);
		tsm.remove();
	}
	if (yajuExist) {
		console.log(yajuExist);
		const tsm = document.querySelector(`ts-message[color-type="alert"]`);
		tsm.remove();
	}

	// ファイル捜索
	main_ol = recursiveGetFileInDir(MAIN_URL, main_ol, RECURSE_COUNT);

}

function moveNonArticlePage() {
	const new_url = new URL(window.location.toString());
	new_url.searchParams.set(NO_ARTICLE_QUERY_NAME, "");
	if (yajuExist)
		new_url.searchParams.set(NO_YAJU_QUERY_NAME_ARRAY[0], "");
	window.location.href = new_url;
}

function moveNonYajuPage() {
	const new_url = new URL(window.location.toString());
	new_url.searchParams.set(NO_YAJU_QUERY_NAME_ARRAY[0], "");
	if (notArticleFlagExist)
		new_url.searchParams.set(NO_ARTICLE_QUERY_NAME, "");
	window.location.href = new_url;
}

async function loadLinkJson(base_url, parent_element) {
	const res = await window.fetch(base_url + FREE_LINK_JSON_FILEFULLNAME);
	const dt2 = await res.json();
	if (checkHasLength(dt2["data"]))
		parent_element.appendChild(createElement_ol_block("free-type-link", [...dt2["data"]]));
	return parent_element;
}
function checkHasLength(obj = []) {
	return (Object.hasOwn(obj, "length") && [...obj].length > 0);
}
function deleteSlashInArray(arr = []) {
	// ここに書くべきではないけど、/initを削除
	if (!checkHasLength(arr))
		return [];
	if (arr.includes("/init"))
		arr.splice(arr.indexOf("/init"), 1);
	return arr.map(c => c.replace("/", ""));
}
function addChildLiElement(prt, _dt = [], with_a_element = true) {
	if (checkHasLength(_dt))
		[..._dt].forEach(c => {
			prt.appendChild(createElement_li(c, with_a_element));
		});
	// 意味ないけど念のため
	return prt;
}

function arrayInsert(input_array = [], idx = 0, any_var = null) {
	return [...input_array.slice(0, idx), any_var, ...input_array.slice(idx)];
}
function deleteGFGD(target_url = new URL(""), with_protocol = true) {
	// 確実にURLになるように変換
	target_url = new URL(String(target_url));
	const url_result = target_url.hostname + String(target_url.pathname).replace(new RegExp(`${STR_DEF_GET_DIRS}|${STR_DEF_GET_FILES}`), "");
	return with_protocol ? new URL(`https://${url_result}`) : url_result;
}
function createGetDirsOrFilesUrl(target_url = new URL(""), get_dirs_flag = true) {
	target_url = String(deleteGFGD(target_url, false));
	const url_result = arrayInsert(target_url.split("/"), 1, (get_dirs_flag ? STR_DEF_GET_DIRS : STR_DEF_GET_FILES).replace("/", "")).join("/");
	return new URL(`https://${url_result}`);
}
async function recursiveGetFileInDir(target_url, parent_element, n = 1) {
	if (!target_url || n < 1)
		return;
	const n_begin_tf = Boolean(n == RECURSE_COUNT);
	let n_begin_get_data = "";

	if (String(target_url).at(-1) != "/")
		target_url += "/";

	const getFilesUrlString = createGetDirsOrFilesUrl(target_url, false);
	const getDirsUrlString = createGetDirsOrFilesUrl(target_url);

	let res, dt0, dt;

	res = await window.fetch(getFilesUrlString);
	dt0 = await res.json();
	dt = deleteSlashInArray(dt0);
	if (dt.includes(FREE_LINK_JSON_FILEFULLNAME)) {
		dt.splice(dt.indexOf(FREE_LINK_JSON_FILEFULLNAME), 1);
		parent_element = await loadLinkJson(String(deleteGFGD(target_url)), parent_element);
	}
	if (checkHasLength(dt)) {
		addChildLiElement(parent_element, dt.map(c => String(deleteGFGD(getFilesUrlString)) + c));
		n_begin_get_data = STR_DEF_GET_FILES;
	}

	res = await window.fetch(getDirsUrlString);
	dt0 = await res.json();
	dt = deleteSlashInArray(dt0);
	if (dt.length)
		n_begin_get_data = STR_DEF_GET_DIRS;

	for (let c of dt) {
		let ol_element = document.createElement("ol");
		ol_element = await recursiveGetFileInDir(`${getDirsUrlString + c}/`, ol_element, n - 1);
		parent_element.appendChild(createElement_ol_block(`${getDirsUrlString}${c}`.split("/").at(-1), ol_element, true));
	}

	if (!n_begin_get_data && n_begin_tf)
		parent_element.appendChild(createElement_li("データがありません", false));

	return parent_element;
}

function createElement_ol_block(title = "title", _dt = [], _direct_ol = false) {
	const title_h2_element = document.createElement("h2");
	title_h2_element.classList.add("ol-title");
	title_h2_element.innerHTML = `・${title}：`;
	let ol_element;
	if (!_direct_ol) {
		ol_element = document.createElement("ol");
		addChildLiElement(ol_element, _dt);
	} else
		ol_element = _dt;

	return createElement_li(`${title_h2_element.outerHTML}${ol_element.outerHTML}`, false);
}
function createElement_li(inner_text = "", with_a_element = true) {
	const el = document.createElement("li");
	if (!with_a_element)
		el.innerHTML = inner_text;
	else {
		const get_url = `https://${new URL(inner_text).hostname}/get/${new URL(inner_text).pathname}`;
		const view_url = `https://${new URL(inner_text).hostname}/view/${new URL(inner_text).pathname}`;
		el.innerHTML = `<pre><a href="${get_url}" download>${get_url}</a>  |  <a href="${view_url}">VIEW</a></pre>`;
	}
	return el;
}
function createElement_li_articleYoutube(v = YAJU_VALUE) {
	const article_element_text = `<article class="youtube" id="${v}"><iframe src="https://www.youtube.com/embed/${v}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></article>`;
	const retval = createElement_li(article_element_text, false);
	return retval;
}