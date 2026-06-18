window.addEventListener("load", async () => {
	if (hasFlag(id_flag) && getFlag(id_flag).split("--").length == 2 && getFlag(id_flag).split("--")[1] == "articles")
		await loadAllArticles();
});
async function loadAllArticles() {
	const PMD = await import(`./index-module.js`);
	const all_decoded_json_data = await PMD.getAllArticleData();
	await appear_allArticlesDisplay(true, all_decoded_json_data);
}