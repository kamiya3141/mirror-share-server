var appear_createNewArticleSettingDisplay = async (_tf, _pmd) => {
	const parent_elem = document.getElementById("create-new-article-setting-display-section");
	switchingOpenDisplay(parent_elem, true, !_tf);
	settingNewArticleSettingDisplay(parent_elem, _pmd);
	setDocumentTitle("記事登録ページ");
};

function settingNewArticleSettingDisplay(p_e, _pmd) {
	const fm_el = p_e.querySelector("#create-new-article--form");
	fm_el.addEventListener("submit", async e => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		console.log(form_data);
		const _res = await fetch(_pmd.createAPIURL("article-new-api-local.php"),
			{
				"method": "POST",
				"body": form_data
			}
		);
		const _dt = await _res.json();
		alert(_dt);
	});
}