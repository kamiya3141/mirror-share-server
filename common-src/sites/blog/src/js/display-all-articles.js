var appear_allArticlesDisplay = (_tf, all_article_data_object = []) => {
	switchingOpenDisplay(document.getElementById("all-articles-display-section"), true, _tf);
	console.log(all_article_data_object);
	all_article_data_object.forEach(c => createArticleCard(c));
};

function createArticleCard(article_data_object) {
	const all_articles_contents_box = document.querySelector("#all-articles-display-section .article-contents--box");
	const card_div_element = document.createElement("div");
	card_div_element.classList.add("article-card");
	Object.entries(article_data_object).forEach(([k, v]) => card_div_element.setAttribute(`data-mydef--article-card--${k}`, v));

	const card_embed_div_element = document.createElement("div");
	card_embed_div_element.classList.add("artcile-card--embed");
	card_embed_div_element.innerHTML = article_data_object["excerpt"];

	const card_title_div_element = document.createElement("div");
	card_title_div_element.classList.add("artcile-card--title");
	card_title_div_element.innerHTML = article_data_object["title"];

	card_div_element.appendChild(card_embed_div_element);
	card_div_element.appendChild(card_title_div_element);

	all_articles_contents_box.appendChild(card_div_element);
}