const motionServerArray = [
	{
		"title": "debian13-note-0",
		"word": "dn0"
	},
	{
		"title": "debian13-note-2",
		"word": "dn2"
	},
	{
		"title": "debian13-note-2",
		"word": "dn2"
	}
];

motionServerArray.forEach(m => createMotionContentsSection(createMotionURL(m.word), m.title));

function createMotionURL(word = "") {
	return `https://motion-${word}.tshuto.com`;
}

function createMotionContentsSection(url = "", title = "") {
	const regexp_str = "[a-zA-Z0-9_-]";
	const regexp = new RegExp(regexp_str, "g");
	let clear = !(title.replace(regexp, "").length > 0);

	if (!clear)
		console.error(`タイトルはidの登録に使用するため${regexp_str}以外は使用できません`);
	else {
		const output_string = `
		<section class="motion-contents-all-box">
			<div class="img-box">
				<img class="motion-contents" src="${url}">
			</div>
			<div class="title-box">
				<div class="main-title-box">
					<div class="main-title">
						<div id="main-title">${title}</div>
					</div>
				</div>
				<div id="${title}" class="sub-title" data-mydef--sub-title-status="normal"></div>
			</div>
		</section>`;
		document.getElementById("section-box").innerHTML += output_string;
	}
	return clear;
}