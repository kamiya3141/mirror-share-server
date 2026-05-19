var appear_editArticleDisplay = (_tf, article_data) => {
	switchingOpenDisplay(document.getElementById("edit-article-display-section"), true, _tf);
	settingTextEditor(article_data["content"]);
};

function settingTextEditor(text_data = "") {
	const textAreaId = "";
	document.getElementById(textAreaId).value = text_data;
}