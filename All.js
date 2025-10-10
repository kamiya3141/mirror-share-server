async function loadAllScript(arr, i, ld_lc = false) {
	const _dt = await fetch(`${!ld_lc ? "https://share.tshuto.com" : "http://localhost:4545"}/common-src/javascript/def/${arr[i][0]}/.tsotemplate`);
	const _txt = await _dt.text();
	window.TSObjectTemplateMap.set(arr[i][0], new DOMParser().parseFromString(_txt, "text/html"));
	await loadScript(arr[i], ld_lc);
	if (++i == arr.length) {
		document.dispatchEvent(new CustomEvent(window.TSObjectAllLibraryLoadedEventName));
		window.TSObjectAllLibraryLoadedFlag = true;
		return;
	}
	await loadAllScript(arr, i, ld_lc);
}

async function loadScript(src_arr, ld_lc = false) {
	const script = document.createElement("script");
	script.async = true;
	script.defer = true;
	script.src = src_arr[1] == "l" ? `https://jsd.tshuto.com/?n=${src_arr[0]}&v=${src_arr[1]}` : `${!ld_lc ? "https://share.tshuto.com/common-src" : "./.."}/javascript/def/${src_arr[0]}/${src_arr[1]}/${src_arr[0]}.js`;
	document.head.appendChild(script);
	await new Promise((resolve, reject) => {
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load script"));
	});
	return script;
}

async function loadAllLatestScript(ld_lc = false) {
	await loadRelationJSON(ld_lc);
	const _dt = await fetch(!ld_lc ? "https://jsd.tshuto.com/all" : "http://localhost:4545/src/jsd/others/jsd-all.txt");
	const _txt = await _dt.text();
	const result0 = _txt.split(",").reverse();
	//const result = [["Object", "l"], ["Message", "l"], ["Button", "l"]];
	const result_order = extractOrder(window.TSObjectRelationObject);
	const result = result0.map(c => [c.split("/").at(-1), c.split("/").at(-2)]).sort((a, b) => (result_order.indexOf(a[0]) - result_order.indexOf(b[0])));
	await loadAllScript(result, 0, ld_lc);
}

window.TSObjectAllLibraryLoadedFlag = false;
window.TSObjectAllLibraryLoadedEventName = "tsobject-library-loaded";
window.TSObjectTemplateMap = new Map();
window.TSObjectRelationObject = {};

function extractOrder(obj, result = []) {
	for (const key in obj) {
		result.push(key);
		if (obj[key]) extractOrder(obj[key], result);
	}
	return result;
}

async function loadRelationJSON(ld_lc = false) {
	const _dt_jsn = await fetch(`${!ld_lc ? "https://share.tshuto.com" : "http://localhost:4545"}/relation.json`);
	const _jsn = await _dt_jsn.json();
	window.TSObjectRelationObject = _jsn;
}
const ld_lc_tf = new URL(document.currentScript.src).toString().includes("?loadLocalFile");
loadAllLatestScript(ld_lc_tf);

/*
1: 実は、省略形式、jsd.tshuto.com/?n=XXX&v=YYY 形式は読み込みが遅いです。
2: srcが長くても、読み込みが早いのは直接指定の share.tshuto.com/common-src/javascript/def/AAA/BBB/AAA.js 形式です。
3: 省略形式はあくまで、開発者（私自身）がコードを書きやすくするために生み出したものです。
 - もしjsd系列のライブラリを使用するなら直接形式を強く推奨します。
*/
