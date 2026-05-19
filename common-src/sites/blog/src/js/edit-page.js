const PMD = await import(`./index-module.js`);
const result = await PMD.parseMD();

const has_edit_flag = hasFlag(page_flag[0]);
const has_new_flag = hasFlag(page_flag[1]);

if (has_edit_flag) {
	const has_id_flag = hasFlag("id");
	let correct = has_id_flag;
	if (has_id_flag) {
		const decoded_json_data = await PMD.getArticleData();
		correct &= decoded_json_data != null;
		if (correct) {
			// 編集画面起動
		}
	} else {
		// 全ての記事を一覧表示(検索バーの表示)

	}
	if (!correct)
		alert("ID値が不正な値、もしくはクエリパラメータが存在していません");
} else if (has_new_flag) {
	// title, slug 等の設定入力画面を起動
} else
	alert("ID, EDITのどちらも存在しません\nどちらかのクエリパラメータの更新をしてください");

function createEditArticleDisplay() {

}