var appear_editArticleDisplay = async (_tf, article_data, pmd, med) => {
	switchingOpenDisplay(document.getElementById("edit-article-display-section"), true, !_tf);
	setDocumentTitle("記事編集ページ");
	// await settingTextarea(article_data, pmd);
	await settingMyEditor(article_data, pmd, med);
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

		const _res = await fetch(_pmd.createAPIURL("article-new-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify({
				"data-type": "php-input",
				"data": editArticleDisplay_copiedJsonData
			})
		});
		const _dt = await _res.json();
		editArticleDisplay_copiedJsonData["slug"] = current_slug;
		if (_dt["success"])
			window.location.href = `${winMyHrefPTCHNPathname}?${id_flag}=${editArticleDisplay_copiedJsonData["slug"]}`;
	});
	draft_btn.addEventListener("click", async e => {
		if (editArticleDisplay_copiedJsonData["status"] != "draft")
			return;
		/*
		const _res = await fetch(_pmd.createAPIURL("test.php"));
		const _dt = await _res.text();
		console.log(_dt);
		*/
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify({
				"data-type": "php-input",
				"data": editArticleDisplay_copiedJsonData
			})
		});
		const _dt = await _res.json();

		if (_dt["success"])
			console.log("おｋ");

	});
	save_btn.addEventListener("click", async e => {
		if (editArticleDisplay_copiedJsonData["status"] == "draft")
			editArticleDisplay_copiedJsonData["status"] = "published";
		const _res = await fetch(_pmd.createAPIURL("article-set-api-local.php"), {
			"method": "POST",
			"body": JSON.stringify({
				"data-type": "php-input",
				"data": editArticleDisplay_copiedJsonData
			})
		});
		const _dt = await _res.json();
		if (_dt["success"])
			window.location.href = `${winMyHrefPTCHNPathname}?${id_flag}=${editArticleDisplay_copiedJsonData["slug"]}`;
	});
}

async function convertMD(_el, _pmd, p_e) {
	_el.style.height = "auto";
	_el.style.height = `${_el.scrollHeight}px`;
	await convertMarkdown2Html(_el.value, _pmd, p_e);
}

async function inputTextConvertMD(input_text = "", _pmd, parent_elem) {
	convertMarkdown2Html(input_text, _pmd, parent_elem);
}

async function settingTextarea(decoded_json_data = {}, _pmd, _med) {
	editArticleDisplay_copiedJsonData = JSON.parse(JSON.stringify(decoded_json_data));
	const parent_elem = document.querySelector("#edit-article-main-contents");
	const txtara_elem = parent_elem.querySelector("#editor--textarea");
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

async function settingMyEditor(decoded_json_data = {}, _pmd, _med) {
	editArticleDisplay_copiedJsonData = JSON.parse(JSON.stringify(decoded_json_data));
	const parent_elem = document.querySelector("#edit-article-main-contents");
	_med.myEditorsObject["registInputFunc"]("pmd-editor-func", async txt => await inputTextConvertMD(txt, _pmd, parent_elem));
	await _med.settingMyEditor();
	_med.myEditorsObject["values"] = [0, editArticleDisplay_copiedJsonData["content"]];
	const registerButtonsInfo = [
		[
			{
				key: "text-remove",
				appearance_text: `<div style="text-decoration: line-through;">text</div>`,
				func: async function () {
					return {
						text: "",
						before_str: "~~",
						after_str: "~~"
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "text-bold",
				appearance_text: `<div style="font-weight: 900;">text</div>`,
				func: async function () {
					return {
						text: "",
						before_str: "**",
						after_str: "**"
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "text-italic",
				appearance_text: `<div style="font-style: italic;">text</div>`,
				func: async function () {
					return {
						text: "",
						before_str: "*",
						after_str: "*"
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "text-underline",
				appearance_text: `<div style="text-decoration-line: underline; text-decoration-color: var(--myTextColor); text-decoration-thickness: calc(var(--p1) / 4);">text</div>`,
				func: async function () {
					return {
						text: "",
						before_str: "__",
						after_str: "__"
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "code-block",
				appearance_text: `<div style="border: var(--myTextColor) calc(var(--p2) * 0.125) solid;">&gt;_</div>`,
				func: async function () {
					return {
						text: "",
						before_str: "```",
						after_str: "```"
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "a-link",
				appearance_text: `<div>https...</div>`,
				func: async function () {
					let res = await myDataMessage("リンク,表示テキスト,代替文字列");
					if (typeof res != "object")
						return {
							text: "失敗♡",
							before_str: "",
							after_str: ""
						};

					for (let i = 0; i < 2; i++)
						if (res.length == i + 1)
							res.push("");

					return {
						text: `[${res[1]}](${res[0]} ${res[2] ? res[2] : res[1]})`,
						before_str: "",
						after_str: ""
					};
				},
				allow_insert_response_for_editor: true
			},
			{
				key: "img-link",
				appearance_text: `<div>Image</div>`,
				func: async function () {
					let res = await myDataMessage("画像リンク,表示テキスト,代替文字列");
					if (typeof res != "object")
						return {
							text: "失敗♡",
							before_str: "",
							after_str: ""
						};

					for (let i = 0; i < 2; i++)
						if (res.length == i + 1)
							res.push("");

					return {
						text: `![${res[1]}](${res[0]} ${res[2] ? res[2] : res[1]})`,
						before_str: "",
						after_str: ""
					};
				},
				allow_insert_response_for_editor: true
			},
		]
	];
	registerButtonsInfo.forEach((c, i) => {
		c.forEach(obj => _med.myEditorsObject["registSubContentsButton"](i, ...Object.values(obj)));
	});
}
async function convertMarkdown2Html(_txt, _pmd, _pr_el) {
	editArticleDisplay_copiedJsonData["content"] = _txt;
	const _result = await _pmd.parseMD2HTMLv1(editArticleDisplay_copiedJsonData);
	_pr_el.querySelector(".main-contentsbox").innerHTML = _result;
	_pmd.afterFunction();
}