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

	if (editArticleDisplay_copiedJsonData["type"] == "backup" || editArticleDisplay_copiedJsonData["status"] == "deleted") {
		backup_btn.disabled = true;
		draft_btn.disabled = true;
		save_btn.disabled = true;
		myAlertMessage("バックアップまたは削除済みデータのため編集できません");
	}

	backup_btn.addEventListener("click", async e => {
		editArticleDisplay_copiedJsonData["type"] = "backup";
		editArticleDisplay_copiedJsonData["status"] = "privated";
		const current_slug = String(editArticleDisplay_copiedJsonData["slug"]);
		let current_slug_split = current_slug.split("--");
		editArticleDisplay_copiedJsonData["slug"] = current_slug_split.length == 2 ? current_slug_split[1] : (() => current_slug_split.map((c, i) => c = (i == 0 ? "" : c)).join("--"));

		const _res = await fetch(_pmd.createAPIURL("article-new-api-local2.php"), {
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
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local2.php"), {
			"method": "POST",
			"body": JSON.stringify(editArticleDisplay_copiedJsonData)
		});
		const _dt = await _res.json();

		if (_dt["success"])
			console.log("おｋ");
	});
	save_btn.addEventListener("click", async e => {
		if (editArticleDisplay_copiedJsonData["status"] == "draft")
			editArticleDisplay_copiedJsonData["status"] = "published";
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local2.php"), {
			"method": "POST",
			"body": JSON.stringify(editArticleDisplay_copiedJsonData)
		});
		const _dt = await _res.json();
		if (_dt["success"])
			window.location.href = `${winMyHrefPTCHostname}?${id_flag}=${editArticleDisplay_copiedJsonData["slug"]}`;
	});
}

async function convertMD(_el, _pmd, p_e) {
	_el.style.height = "auto";
	_el.style.height = `${_el.scrollHeight}px`;
	await convertMarkdown2Html(_el.value, _pmd, p_e);
}

async function settingTextEditor(decoded_json_data = {}, _pmd) {
	editArticleDisplay_copiedJsonData = JSON.parse(JSON.stringify(decoded_json_data));
	const parent_elem = document.querySelector("#edit-article-main-contents");
	/** @type {HTMLTextAreaElement} */
	const txtara_elem = parent_elem.querySelector("#editor--textarea");
	const resdis_elem = parent_elem.querySelector(".result-display--root");
	txtara_elem.addEventListener("input", async e => await convertMD(txtara_elem, _pmd, parent_elem));
	txtara_elem.addEventListener("keydown", async e => {
		const key_object = {
			"Tab": "\t"
		};
		if (Object.keys(key_object).some(c => c == e.key))
			e.preventDefault();
		else
			return;
		const start = txtara_elem.selectionStart;
		const end = txtara_elem.selectionEnd;
		const value = txtara_elem.value;
		const selected = value.slice(start, end);

		// 単一行なら普通にtab挿入
		if (!selected.includes("\n")) {
			txtara_elem.setRangeText(key_object[e.key], start, end, "end");
			return;
		}

		// 選択開始行の先頭
		const lineStart = value.lastIndexOf("\n", start - 1) + 1;
		// 行単位取得
		const lines = value.slice(lineStart, end).split("\n");

		// 各行にtab追加
		const indented = lines.map(v => key_object[e.key] + v).join("\n");

		txtara_elem.setRangeText(indented, lineStart, end, "select");

		// 選択範囲補正
		txtara_elem.selectionStart = start + key_object[e.key].length;
		txtara_elem.selectionEnd = end + lines.length;

		await convertMD(txtara_elem, _pmd, parent_elem);

	});
	txtara_elem.value = editArticleDisplay_copiedJsonData["content"];
	await convertMD(txtara_elem, _pmd, parent_elem);

	if (editArticleDisplay_copiedJsonData["type"] == "backup")
		txtara_elem.readOnly = true;
}

async function convertMarkdown2Html(_txt, _pmd, _pr_el) {
	editArticleDisplay_copiedJsonData["content"] = _txt;
	const _result = await _pmd.parseMD2HTMLv1(editArticleDisplay_copiedJsonData);
	_pr_el.querySelector(".main-contentsbox").innerHTML = _result;
	_pmd.afterFunction();
}