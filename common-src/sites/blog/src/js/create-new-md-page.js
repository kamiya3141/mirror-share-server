var appear_createNewArticleSettingDisplay = async (_tf, _pmd, decoded_json_data = null) => {
	const parent_elem = document.getElementById("create-new-article-setting-display-section");
	switchingOpenDisplay(parent_elem, true, !_tf);
	settingNewArticleSettingDisplay(parent_elem, _pmd, decoded_json_data);
	setDocumentTitle("記事登録ページ");
};

function settingNewArticleSettingDisplay(p_e, _pmd, decoded_json_data) {
	const fm_el = p_e.querySelector("#create-new-article--form");

	const has_id_flag = hasFlag(id_flag);
	const copiedDecodedJsonData = deepCopy(decoded_json_data);

	p_e.querySelector(".submit-button--box").setAttribute("data-mydef--create-new-article--submit-button-box--has-id", String(Boolean(has_id_flag)));
	p_e.querySelector(".submit-button--box").setAttribute("data-mydef--create-new-article--submit-button-box--article-type", copiedDecodedJsonData["type"]);
	p_e.querySelector(".submit-button--box").setAttribute("data-mydef--create-new-article--submit-button-box--article-status", copiedDecodedJsonData["status"]);

	if (has_id_flag && decoded_json_data != null) {
		[...new FormData(fm_el).entries()].map(([k, v]) => [k, fm_el.elements[k]]).forEach(([k, el]) => {
			switch (k) {
				case "tags":
					decoded_json_data[k] = decoded_json_data[k].join(", ");
					break;
				case "slug":
					// decoded_json_data[k] = String(decoded_json_data[k]).split("--").filter((c, i) => i > 0).join("--");
					el.disabled = true;
					break;
			}
			el.value = decoded_json_data[k];
		});
	}

	fm_el.addEventListener("submit", async e => {
		e.preventDefault();
		const button_type = String(e.submitter.name).split("--")[1];
		const data = Object.fromEntries(new FormData(e.target).entries());

		if (has_id_flag)
			Object.entries(copiedDecodedJsonData).forEach(([k, v]) => data[k] = Object.hasOwn(data, k) ? data[k] : v);

		data["tags"] = String(data["tags"]).split(new RegExp(",\\s?"));

		if (has_id_flag && button_type != "updated") {
			const bkp_status = data["status"];
			data["status"] = button_type;
			p_e.querySelector(".submit-button--box").setAttribute("data-mydef--create-new-article--submit-button-box--article-status", data["status"]);

			if (button_type == "deleted") {
				const cfm_res = await myConfirmMessage("この記事を本当に削除しますか？");
				if (!cfm_res) {
					data["status"] = bkp_status;
					p_e.querySelector(".submit-button--box").setAttribute("data-mydef--create-new-article--submit-button-box--article-status", data["status"]);
				}
			}
		}

		console.log(data);

		return;
		const _res = await fetch(_pmd.createAPIURL(`article-${has_id_flag ? "set" : "new"}-api-local.php`), {
			"method": "POST",
			"body": JSON.stringify(data)
		});
		const _dt = await _res.json();
		if (_dt["success"] && button_type == "updated") {
			const next_url = new URL(`${winMyHrefPTCHostname}`);
			next_url.searchParams.set(page_flag[0], "");
			next_url.searchParams.set(id_flag, _dt["slug"]);
			window.location.href = next_url;
		} else
			console.log(_dt);
	});
}