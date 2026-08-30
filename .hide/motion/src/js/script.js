const streamServerInfoArray = [
	{
		"title": "debian13-note-0",
		"url": createMotionURL("dn0"),
		"element": "img"
	},
	{
		"title": "debian13-note-1",
		"url": createMotionURL("dn1"),
		"element": "img"
	},
	{
		"title": "debian13-note-2",
		"url": createMotionURL("dn2"),
		"element": "img"
	}
];

(() => {
	let input_strings_array = {
		"desktop": [],
		"mobile": ""
	};
	streamServerInfoArray.forEach(m => {
		// 個別にランダムなidをセットするから、別々でcreateMotionContentsSectionをする
		input_strings_array["desktop"].push(createMotionContentsSection(m.url, m.title, m.element, "height"));
		input_strings_array["mobile"] += createMotionContentsSection(m.url, m.title, m.element, "width");
	});
	document.getElementById("section-box-desktop").innerHTML += imageViewerElementString(...input_strings_array["desktop"]);
	document.getElementById("section-box-mobile").innerHTML += input_strings_array["mobile"];
})();

function createTshutoURL(_str = "", add_path = "") {
	return `https://${_str}.tshuto.com/${add_path}`;
}
function createMotionURL(word = "") {
	return createTshutoURL(`motion-${word}`);
}

function createMotionContentsSection(url = "", title = "", element = "", dir = "width") {
	const regexp_str = "[a-zA-Z0-9_-]";
	const regexp = new RegExp(regexp_str, "g");
	// const _res = await window.fetch(url);
	// const _status = _res.ok ? "normal" : "alert";
	const _status = "normal";
	const mainContents = element == "img" ? createPopoverElementsStr(`<img class="motion-contents" src="${url}">`, "", dir) : `<iframe class="motion-contents" href="${url}"></iframe>`;
	let result = !(title.replace(regexp, "").length > 0);

	if (!result)
		result = console.error(`タイトルはidの登録に使用するため${regexp_str}以外は使用できません`);
	else {
		const output_string = `
		<section class="motion-contents-all-box">
			<div class="img-box">
				${mainContents}
			</div>
			<div class="title-box">
				<div class="main-title-box">
					<div class="main-title">
						<div id="main-title">${title}</div>
					</div>
				</div>
				<!-- <div id="${title}" class="sub-title" data-mydef--sub-title-status="${_status}"></div> -->
			</div>
		</section>`;
		result = output_string;
	}
	return result;
}