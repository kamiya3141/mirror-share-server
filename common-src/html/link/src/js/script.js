window.fetch("-:-JSON-URL-:-").then(res => res.json()).then(dt => {
	const ol_title = document.getElementById("ol-title");
	const base_url = String(dt["basename"]).substring(0, 4).includes("http") ? dt["basename"] : "https://share.tshuto.com/get/common-src/others/link/";
	const type_arr = [
		["number", _dt => {
			const _tar_obj = _dt["info"]["range"];
			const _arr_len = Number(_tar_obj[1]) - Number(_tar_obj[0]) + 1;
			let _url_arr = [];
			for (let i = 0; i < _arr_len; i++)
				_url_arr.push(new URL(`${dt["path"]}/${dt["basename"]}${i + Number(_tar_obj[0])}${dt["ext"]}`, base_url).href);
			return _url_arr;
		}],
		["string", _dt => {
			const _tar_obj = _dt["info"]["range"];
			let _url_arr = [];
			for (let i = 0; i < _tar_obj.length; i++)
				_url_arr.push(
					new URL(`${_dt["path"]}/${_dt["basename"]}${_dt["ext"] == "range" ? "." + _tar_obj[i] : _dt["ext"]}`, base_url).href);
			return _url_arr;
		}],
		["free", _dt => {
			const _tar_obj = _dt["info"]["files"];
			let _url_arr = [];
			for (let i = 0; i < _tar_obj.length; i++)
				_url_arr.push(new URL(`${_dt["path"]}/${_tar_obj[i]}${_dt["ext"]}`, base_url).href);
			return _url_arr;
		}]];
	if (!dt.hasOwnProperty("info") || !dt["info"].hasOwnProperty("type") || (dt.hasOwnProperty("info") && dt["info"].hasOwnProperty("type") && !type_arr.some(c => c[0] == dt["info"]["type"]))) {
		document.body.appendChild(createL("Access denied", false));
	} else {
		for (let v of type_arr)
			if (v[0] == dt["info"]["type"])
				[...v[1](dt)].reverse().forEach(c => ol_title.parentElement.insertBefore(createL(c), ol_title.nextSibling));
	}
});

function createL(inner_text = "", with_a_element = true) {
	const el = document.createElement("li");
	el.innerHTML = with_a_element ? `<a href="${inner_text}" download>${inner_text}</a>` : inner_text;
	return el;
}