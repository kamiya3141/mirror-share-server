const NO_YAJU_QUERY_NAME = "yj";
const YAJU_VALUE = "niKAylKNIEI";

const BASE_URL = "https://share.tshuto.com/common-src/others/link/src";

const MAIN_URL = "-:-JSON-URL-:-";
const DIRS_URL = MAIN_URL.replace("get-files", "get-dirs");

const yajuExist = (new URLSearchParams((new URL(window.location.toString())).search)).has(NO_YAJU_QUERY_NAME);
const main_ol = document.getElementById("main-ol");
const sub_ol = document.getElementById("main-ol");

// 広告用のYoutubeリンクのクエリパラメータのキー "v" の値を格納した配列
const youtube_v_array = [YAJU_VALUE, "39sjhHJrPLA", "6uv0rhZgDy0", "xi1Wk4kt1mA"].reverse();
// 広告の差込み処理
youtube_v_array.forEach(v => sub_ol.appendChild(createElement_li_articleYoutube(v)));
// YAJU & U の消滅処理
if (yajuExist)
	document.getElementById(YAJU_VALUE).parentElement.style.setProperty("display", "none", "important");

// ファイルを捜索
window.fetch(MAIN_URL).then(res => res.json()).then(dt => {
	main_ol = addChildLiElement(main_ol, dt);
});
// ディレクトリの中を捜索 (1回だけ)
window.fetch(DIRS_URL).then(res => res.json()).then(dt => {
	if (checkHasLength(dt)) {
		[...dt].forEach(c => {
			const _url = `${BASE_URL}/${DIRS_URL.split("/").at(-1)}/${c}/`;
			window.fetch(_url).then(res => res.json()).then(dt2 => {
				main_ol.appendChild(createElement_ol_block(c, dt2));
			});
		});
	}
});


function checkHasLength(obj = []) {
	return (Object.hasOwn(_dt, "length") && [..._dt].length > 0);
}

function addChildLiElement(prt, _dt = []) {
	if (checkHasLength(_dt))
		[..._dt].forEach(c => prt.appendChild(createElement_li(c)));
	// 意味ないけど念のため
	return prt;
}

function createElement_ol_block(title = "title", _dt = []) {
	const ol_element = document.createElement("ol");
	ol_element.innerHTML += `<h3 class="ol-title">${title}</h3>`;
	ol_element = addChildLiElement(ol_element, _dt);
	return ol_element;
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