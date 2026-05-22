var appear_editArticleDisplay = async (_tf, article_data, pmd) => {
	switchingOpenDisplay(document.getElementById("edit-article-display-section"), true, !_tf);
	setDocumentTitle("記事編集ページ");
	await settingTextEditor(article_data, pmd);
	settingButtons(pmd);
};
let editArticleDisplay_copiedJsonData = {};

function settingButtons(_pmd) {
	const backup_btn = document.querySelector("#edit-article-display--input--button--backup");
	const draft_btn = document.querySelector("#edit-article-display--input--button--draft");
	const save_btn = document.querySelector("#edit-article-display--input--button--save");

	if (editArticleDisplay_copiedJsonData["status"] == "draft")
		backup_btn.disabled = true;
	if (editArticleDisplay_copiedJsonData["status"] != "draft")
		draft_btn.disabled = true;

	backup_btn.addEventListener("click", async e => {
		editArticleDisplay_copiedJsonData["type"] = "backup";
		editArticleDisplay_copiedJsonData["status"] = "privated";
		const current_slug = String(editArticleDisplay_copiedJsonData["slug"]);
		let current_slug_split = current_slug.split("--");
		editArticleDisplay_copiedJsonData["slug"] = current_slug_split.length == 2 ? current_slug_split[1] : (() => current_slug_split.map((c, i) => c = (i == 0 ? "" : c)).join("--"));
		const _res = await fetch(_pmd.createAPIURL("article-new-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify(editArticleDisplay_copiedJsonData)
		});
		const _dt = await _res.json();
		editArticleDisplay_copiedJsonData["slug"] = current_slug;
		if (_dt["success"])
			window.location.href = `${winMyHrefPTCHostname}?${id_flag}=${editArticleDisplay_copiedJsonData["slug"]}`;
	});
	draft_btn.addEventListener("click", async e => {
		if (editArticleDisplay_copiedJsonData["status"] != "draft")
			return;
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify(editArticleDisplay_copiedJsonData)
		});
		const _dt = await _res.json();
		if (_dt["success"])
			window.location.href = winMyHrefPTCHostname;
	});
	save_btn.addEventListener("click", async e => {
		if (editArticleDisplay_copiedJsonData["status"] == "draft")
			editArticleDisplay_copiedJsonData["status"] = "published";
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify(editArticleDisplay_copiedJsonData)
		});
		const _dt = await _res.json();
		if (_dt["success"])
			window.location.href = `${winMyHrefPTCHostname}?${id_flag}=${editArticleDisplay_copiedJsonData["slug"]}`;
	});
}

async function settingTextEditor(decoded_json_data = {}, _pmd) {
	editArticleDisplay_copiedJsonData = JSON.parse(JSON.stringify(decoded_json_data));
	const parent_elem = document.querySelector("#edit-article-main-contents");
	const txtara_elem = parent_elem.querySelector("#editor--textarea");
	const resdis_elem = parent_elem.querySelector(".result-display--root");
	txtara_elem.addEventListener("input", async e => {
		const _txt_el = e.target;
		_txt_el.style.height = "auto";
		_txt_el.style.height = `${_txt_el.scrollHeight}px`;
		await convertMarkdown2Html(_txt_el.value, _pmd, parent_elem);
	});
	txtara_elem.value = editArticleDisplay_copiedJsonData["content"];
	await convertMarkdown2Html(txtara_elem.value, _pmd, parent_elem);
}

async function convertMarkdown2Html(_txt, _pmd, _pr_el) {
	editArticleDisplay_copiedJsonData["content"] = _txt;
	const _result = await _pmd.parseMD2HTMLv1(editArticleDisplay_copiedJsonData);
	_pr_el.querySelector(".main-contentsbox").innerHTML = _result;
	_pmd.afterFunction();
}