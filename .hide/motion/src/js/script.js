const streamServerInfoArray = [
	{
		"title": "debian13-note-0",
		"url": createMotionURL("dn0"),
		"element": "img"
	},
	{
		"title": "debian13-note-2",
		"url": createMotionURL("dn2"),
		"element": "img"
	}
];

streamServerInfoArray.forEach(async m => await createMotionContentsSection(m.url, m.title, m.element));

function createTshutoURL(_str = "", add_path = "") {
	return `https://${_str}.tshuto.com/${add_path}`;
}
function createMotionURL(word = "") {
	return createTshutoURL(`motion-${word}`);
}

async function createMotionContentsSection(url = "", title = "", element = "") {
	const regexp_str = "[a-zA-Z0-9_-]";
	const regexp = new RegExp(regexp_str, "g");
	// const _res = await window.fetch(url);
	// const _status = _res.ok ? "normal" : "alert";
	const _status = "normal";
	const mainContents = element == "img" ? createPopoverElements(`<img class="motion-contents" src="${url}">`) : `<iframe class="motion-contents" href="${url}"></iframe>`;
	let clear = !(title.replace(regexp, "").length > 0);

	if (!clear)
		console.error(`タイトルはidの登録に使用するため${regexp_str}以外は使用できません`);
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
				<div id="${title}" class="sub-title" data-mydef--sub-title-status="${_status}"></div>
			</div>
		</section>`;
		document.getElementById("section-box").innerHTML += output_string;
	}
	return clear;
}