var appear_createNewArticleSettingDisplay = async (_tf, _pmd) => {
	const parent_elem = document.getElementById("create-new-article-setting-display-section");
	switchingOpenDisplay(parent_elem, true, !_tf);
	settingNewArticleSettingDisplay(parent_elem, _pmd);
	setDocumentTitle("記事登録ページ");
};

function settingNewArticleSettingDisplay(p_e, _pmd) {
	const fm_el = p_e.querySelector("#create-new-article--form");
	fm_el.addEventListener("submit", e => {
		const data = Object.fromEntries(new FormData(e.target));
		console.log(data);

	});
}