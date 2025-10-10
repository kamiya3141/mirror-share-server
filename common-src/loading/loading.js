const replaced_string = "/loading.js?";

var loading_base_myurl = String(document.currentScript.src);

if (!loading_base_myurl.includes("?")) {
	const sbstr = replaced_string.substring(0, replaced_string.length - 1);
	if (
		loading_base_myurl.includes(sbstr) &&
		loading_base_myurl.indexOf(sbstr) == loading_base_myurl.length - sbstr.length
	)
		loading_base_myurl += "?";
}

const sch = [...new URLSearchParams(new URL(loading_base_myurl).search)];
if (
	sch.length != 1 ||
	(sch.length == 1 &&
		(sch[0].length > 2 ||
			sch[0].length < 2 ||
			/null|undefined/.test(`${sch[0][0]}${sch[0][1]}`))) ||
	sch == null
) {
	console.log(
		"クエリ数またはクエリパラメータの異常を検知したため、Loading画面の種類はデフォルトに設定されました。",
		`now_url: ${loading_base_myurl}`,
		`now_query_info: ${sch}`
	);
	// 初期化
	loading_base_myurl = `https://share.tshuto.com/common-src/loading${replaced_string}`;
} else {
	loading_base_myurl = loading_base_myurl
		.replace(sch[0][0], `/${sch[0][0]}`)
		.replace("=", sch[0][1] == "" ? "" : "/");
}

loading_base_myurl = loading_base_myurl.replace(replaced_string, "");
const script = document.createElement("script");
script.defer = true;
script.src = "https://share.tshuto.com/common-src/loading/script.js";
document.currentScript.after(script);
