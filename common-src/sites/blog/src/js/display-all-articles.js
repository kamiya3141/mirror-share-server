const my_root_section = document.querySelector("#all-articles-display-section");

var appear_allArticlesDisplay = async (_tf, all_article_data_object = []) => {
	switchingOpenDisplay(document.getElementById("all-articles-display-section"), true, !_tf);
	my_root_section.querySelector("#main--input--type-search").addEventListener("change", async e => {
		const val = String(e.target.value);
		const data_mydef__article_card__array = ["title", "slug", "category", "tags", "excerpt", "type", "status", "content"].map(c => `data-mydef--article-card--${c}`);
		[...my_root_section.querySelector(".article-contents--box").children].forEach(c => c.style.display = (c.getAttribute(data_mydef__article_card__array[5]) == "article" && c.getAttribute(data_mydef__article_card__array[6]) == "published" && val.length >= 0 && data_mydef__article_card__array.some(attr_nm => String(c.getAttribute(attr_nm)).includes(val))) ? "grid" : "none");
	});
	all_article_data_object.forEach(c => createArticleCard(c));
	setDocumentTitle("編集記事選択ページ");
};

function createArticleCard(article_data_object) {
	const all_articles_contents_box = my_root_section.querySelector(".article-contents--box");

	const card_div_element = document.createElement("div");
	card_div_element.classList.add("article-card");
	card_div_element.classList.add("cursor-pointer");
	Object.entries(article_data_object).forEach(([k, v]) => card_div_element.setAttribute(`data-mydef--article-card--${k}`, v));


	// info-item-box
	const card_info_item_box_div_rdm = createRDM();
	const card_info_item_box_div_element = document.createElement("div");
	card_info_item_box_div_element.classList.add("article-card--info-item-box");
	card_info_item_box_div_element.id = `article-card--info-item-box-${card_info_item_box_div_rdm}`;
	card_info_item_box_div_element.setAttribute("popover", "auto");
	// info-item
	[["id", "インデックス"], ["title", "タイトル"], ["slug", "ID"], ["file_name", "ファイル名"], ["category", "カテゴリ"], ["tags", "タグ"], ["excerpt", "見出し"], ["created_at", "作成日"], ["updated_at", "最終更新日"]].forEach(c => {
		const card_info_item_div_element = document.createElement("button");
		card_info_item_div_element.classList.add("article-card--info-item");
		card_info_item_div_element.setAttribute("popovertarget", card_info_item_box_div_element.id);
		card_info_item_div_element.innerHTML = `記事の${c[1]}をコピー`;
		card_info_item_div_element.addEventListener("click", async e => {
			const tf = Object.hasOwn(article_data_object, c[0]);
			if (tf)
				await navigator.clipboard.writeText(article_data_object[c[0]]);
			myAlertMessage(c[1] + tf ? "をコピーしました。" : "が存在しません。");
		});
		card_info_item_box_div_element.appendChild(card_info_item_div_element);
	});

	// info-button-box
	const card_info_button_box_div_element = document.createElement("div");
	card_info_button_box_div_element.classList.add("article-card--info-button-box");
	// info-button
	const card_info_button_div_element = document.createElement("button");
	card_info_button_div_element.classList.add("article-card--info--button");
	addEventPopoverElementsMini(card_info_button_div_element, card_info_item_box_div_element, true);
	const _dev_tp = document.documentElement.getAttribute("data-my-device-type");
	// デスクトップなら ⋯ を、モバイルなら長押し or 右クリック
	if (_dev_tp == "desktop")
		card_info_button_div_element.innerHTML += "&ctdot;";

	// embed
	const card_embed_div_element = document.createElement("div");
	card_embed_div_element.classList.add("artcile-card--embed");
	card_embed_div_element.innerHTML = article_data_object["excerpt"];
	// title
	const card_title_div_element = document.createElement("div");
	card_title_div_element.classList.add("artcile-card--title");
	card_title_div_element.innerHTML = article_data_object["title"];

	card_div_element.appendChild(card_embed_div_element);
	card_div_element.appendChild(card_title_div_element);
	card_info_button_div_element.appendChild(card_info_item_box_div_element);
	card_info_button_box_div_element.appendChild(card_info_button_div_element);
	card_div_element.appendChild(card_info_button_box_div_element);

	card_div_element.addEventListener("contextmenu", e => {
		e.preventDefault();
		card_info_button_div_element.click();
	});
	card_div_element.addEventListener("touchend", e => {
		e.preventDefault();
		card_info_button_div_element.click();
	});
	card_div_element.addEventListener("click", e => {
		const next_url = new URL(winMyHref);
		next_url.searchParams.set(id_flag, card_div_element.getAttribute("data-mydef--article-card--slug"));
		window.location.href = next_url;
	});

	if (hasFlag(id_flag) && (article_data_object["type"] != "article" || article_data_object["status"] != "published"))
		card_div_element.style.display = "none";

	all_articles_contents_box.appendChild(card_div_element);
}