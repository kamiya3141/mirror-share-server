var appear_editArticleDisplay = (_tf, article_data, pmd) => {
	switchingOpenDisplay(document.getElementById("edit-article-display-section"), true, !_tf);
	settingTextEditor(article_data, pmd);
};
let editArticleDisplay_copiedJsonData = {};

function settingTextEditor(decoded_json_data = {}, _pmd) {
	editArticleDisplay_copiedJsonData = JSON.parse(JSON.stringify(decoded_json_data));
	const parent_elem = document.querySelector("#edit-article-main-contents");
	const txtara_elem = parent_elem.querySelector("#editor--textarea");
	const resdis_elem = parent_elem.querySelector(".result-display--root");
	txtara_elem.addEventListener("input", async e => {
		const _txt_el = e.target;

		_txt_el.style.height = "auto";
		_txt_el.style.height = `${_txt_el.scrollHeight}px`;

		editArticleDisplay_copiedJsonData["content"] = _txt_el.value;
		const _result = await _pmd.parseMD2HTMLv1(editArticleDisplay_copiedJsonData);
		parent_elem.querySelector(".main-contentsbox").innerHTML = _result;
		_pmd.afterFunction();
	});
	txtara_elem.value = editArticleDisplay_copiedJsonData["content"];
}