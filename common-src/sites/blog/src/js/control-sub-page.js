document.querySelector("#main-section").innerHTML = "";

const PMD = await import(`./index-module.js`);

const has_edit_flag = hasFlag(page_flag[0]);
const has_new_flag = hasFlag(page_flag[1]);

if (has_edit_flag) {
	const has_id_flag = hasFlag(id_flag);
	let correct = true;
	if (has_id_flag) {
		const decoded_json_data = await PMD.getArticleData();
		correct &= decoded_json_data != null;
		if (correct)
			await appear_editArticleDisplay(true, decoded_json_data, PMD);
	} else {
		const decoded_json_data = await PMD.getAllArticleData();
		correct &= decoded_json_data != null;
		if (correct)
			await appear_allArticlesDisplay(true, decoded_json_data);
	}
	if (!correct)
		alert("ID値が不正な値、もしくはクエリパラメータが存在していません");
} else if (has_new_flag)
	await appear_createNewArticleSettingDisplay(true, PMD);
else
	alert("ID, EDITのどちらも存在しません\nどちらかのクエリパラメータの更新をしてください");