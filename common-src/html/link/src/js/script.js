const NO_YAJU_QUERY_NAME_ARRAY = ["yj", "yaju", "yajuu"];
const NO_ARTICLE_QUERY_NAME = "atc";
const YAJU_VALUE = "niKAylKNIEI";

const MAIN_URL = "-:-JSON-URL-:-";
console.log(MAIN_URL);

const MAIN_BASE_URL = MAIN_URL.replace("get-files/", "");
const DIRS_URL = MAIN_URL.replace("get-files/", "get-dirs/");

const FREE_LINK_JSON_FILENAME = "link";

const current_query = new URLSearchParams((new URL(window.location.toString())).search);
const yajuExist = NO_YAJU_QUERY_NAME_ARRAY.some(c => current_query.has(c));
const notArticleFlagExist = current_query.has(NO_ARTICLE_QUERY_NAME);
const main_ol = document.getElementById("main-ol");
const sub_ol = document.getElementById("sub-ol");

// 広告用のYoutubeリンクのクエリパラメータのキー "v" の値を格納した配列
const youtube_v_array = [YAJU_VALUE, "39sjhHJrPLA", "6uv0rhZgDy0", "xi1Wk4kt1mA"].reverse();
// 広告拒否ではないのなら広告を貼る
if (notArticleFlagExist)
	sub_ol.appendChild(createElement_li_articleYoutube(youtube_v_array.at(-1)));
else
	youtube_v_array.forEach(v => sub_ol.appendChild(createElement_li_articleYoutube(v)));
// YAJU & U の消滅処理
if (yajuExist)
	document.getElementById(YAJU_VALUE).parentElement.style.setProperty("display", "none", "important");

// ファイルを捜索
window.fetch(MAIN_URL).then(res => res.json()).then(dt0 => {
	if (checkHasLength(dt0)) {
		let dt = deleteSlashInArray(dt0);
		const _filename = FREE_LINK_JSON_FILENAME + ".json";
		if (dt.includes(_filename)) {
			dt.splice(dt.indexOf(_filename), 1);
			loadLinkJson(MAIN_BASE_URL);
		} else
			addChildLiElement(main_ol, dt.map(c => MAIN_BASE_URL + c));
	}
});

// ディレクトリの中を捜索 (1回だけ)
window.fetch(DIRS_URL).then(res => res.json()).then(dt => {
	if (checkHasLength(dt)) {
		deleteSlashInArray(dt).forEach(c => {
			const _url = `${MAIN_URL + c}/`;
			window.fetch(_url).then(res => res.json()).then(dt2 => main_ol.appendChild(createElement_ol_block(c, deleteSlashInArray(dt2).map(c2 => `${_url.replace("get-files/", "")}${c2}`))));
		});
	}
});

if (notArticleFlagExist) {
	const tsm = document.querySelector(`ts-message[color-type="normal"]`);
	tsm.remove();
}
if (yajuExist) {
	console.log(yajuExist);
	const tsm = document.querySelector(`ts-message[color-type="alert"]`);
	tsm.remove();
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

function loadLinkJson(base_url = MAIN_BASE_URL) {
	window.fetch(`${base_url}/${FREE_LINK_JSON_FILENAME}.json`).then(res => res.json()).then(dt2 => {
		if (checkHasLength(dt2["data"]))
			main_ol.appendChild(createElement_ol_block("free-type-link", [...dt2["data"]]));
	})
}
function checkHasLength(obj = []) {
	return (Object.hasOwn(obj, "length") && [...obj].length > 0);
}
function deleteSlashInArray(arr = []) {
	return arr.map(c => c.replace("/", ""));
}
function addChildLiElement(prt, _dt = []) {
	if (checkHasLength(_dt))
		[..._dt].forEach(c => prt.appendChild(createElement_li(c)));
	// 意味ないけど念のため
	return prt;
}

function createElement_ol_block(title = "title", _dt = []) {
	const ol_element = document.createElement("ol");
	const title_h2_element = document.createElement("h2");
	title_h2_element.classList.add("ol-title");
	title_h2_element.innerHTML = `・${title}：`;
	addChildLiElement(ol_element, _dt);
	return createElement_li(`${title_h2_element.outerHTML}${ol_element.outerHTML}`, false);
}
function createElement_li(inner_text = "", with_a_element = true) {
	const el = document.createElement("li");
	el.innerHTML = with_a_element ? `<a href="${inner_text}" download>${inner_text}</a>` : inner_text;
	return el;
}
function createElement_li_articleYoutube(v = YAJU_VALUE) {
	const article_element_text = `<article class="youtube" id="${v}"><iframe src="https://www.youtube.com/embed/${v}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></article>`;
	const retval = createElement_li(article_element_text, false);
	return retval;
}