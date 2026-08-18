window[winMyHrefHostname]["loaded-array"] = [];
const my_idx = window[winMyHrefHostname]["loaded-array"].push(0);

window.addEventListener("load", async () => {
	if (hasFlag(id_flag) && getFlag(id_flag).split("--").length == 2 && getFlag(id_flag).split("--")[1] == "articles")
		await loadAllArticles();
});
async function loadAllArticles() {
	const PMD = await import(`./markdown.js`);
	const all_decoded_json_data = await PMD.getAllArticleData();
	await appear_allArticlesDisplay(true, all_decoded_json_data);
	window[winMyHrefHostname]["loaded-array"][my_idx - 1] = 1;
}