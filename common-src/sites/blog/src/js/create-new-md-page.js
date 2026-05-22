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
		const data = Object.fromEntries(new FormData(e.target).entries());
		console.log(data);
		const _res = await fetch(_pmd.createAPIURL("article-new-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify(data)
		});
		console.log(_res);
		const _dt = await _res.json();
		if (_dt["success"]) {
			const next_url = new URL(`${winMyHrefPTCHostname}`);
			next_url.searchParams.set(page_flag[0], "");
			next_url.searchParams.set(id_flag, _dt["slug"]);
			window.location.href = next_url;
		} else
			console.log(_dt);
	});
}