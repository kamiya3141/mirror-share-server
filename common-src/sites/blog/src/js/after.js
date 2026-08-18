window[winMyHrefHostname] = {};
window[winMyHrefHostname]["loaded-array"] = [];
const afterjs_idx = window[winMyHrefHostname]["loaded-array"].push(0);

const id_flag = "id";

window.addEventListener("load", async () => {
	if (!hasFlag("create-cache") && hasFlag(id_flag) && getFlag(id_flag).split("--").length == 2 && getFlag(id_flag).split("--")[1] == "articles")
		await loadAllArticles();
	else
		window[winMyHrefHostname]["loaded-array"][afterjs_idx - 1] = 1;
});
async function loadAllArticles() {
	const PMD = await import(`./markdown.js`);
	const all_decoded_json_data = await PMD.getAllArticleData();
	await appear_allArticlesDisplay(true, all_decoded_json_data);
	window[winMyHrefHostname]["loaded-array"][afterjs_idx - 1] = 1;
}