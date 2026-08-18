import * as MED from "https://js.tshuto.com/utils/my-editor.js";

document.querySelector("#main-section").innerHTML = "";

const PMD = await import(`./markdown.js`);

const has_edit_flag = hasFlag(edit_flag);
const has_new_flag = hasFlag(new_flag);
const has_id_flag = hasFlag(id_flag);

if (has_edit_flag) {
	let correct = true;
	if (has_id_flag) {
		const decoded_json_data = await PMD.getArticleData();
		correct &= decoded_json_data != null;
		if (correct)
			await appear_editArticleDisplay(true, decoded_json_data, PMD, MED);
	} else {
		const decoded_json_data = await PMD.getAllArticleData();
		correct &= decoded_json_data != null;
		correct &= !hasFlag("create-cache");
		if (correct)
			await appear_allArticlesDisplay(true, decoded_json_data);
	}
	if (!correct)
		alert("ID値が不正な値、もしくはクエリパラメータが存在していません");
} else if (has_new_flag) {
	let decoded_json_data = null;
	if (has_id_flag)
		decoded_json_data = await PMD.getArticleData();
	await appear_createNewArticleSettingDisplay(true, PMD, decoded_json_data);
} else
	alert("ID, EDITのどちらも存在しません\nどちらかのクエリパラメータの更新をしてください");