const streamServerInfoArray = [
	{
		"title": "STOP",
		"url": createTshutoURL("api", "motion")
	},
	{
		"title": "RESTART",
		"url": createTshutoURL("api", "motion")
	}
];

streamServerInfoArray.forEach(m => createMotionContentsSection(m.title));
streamServerInfoArray.forEach(m => {
	document.querySelector(`#button-${m.title}`).addEventListener("click", e => {
		window.alert("clicked");
		const _url = new URL(m.url);
		_url.searchParams.set("motion-order", m.title.toLowerCase());
		window.fetch(_url).then(res => res.text()).then(dt => {
			window.alert(dt);
		});
	});
});

function createTshutoURL(_str = "", add_path = "") {
	return `https://${_str}.tshuto.com/${add_path}`;
}

function createMotionContentsSection(title = "") {
	const regexp_str = "[a-zA-Z0-9_-]";
	const regexp = new RegExp(regexp_str, "g");
	const mainContents = `<input type="button" class="motion-contents" id="button-${title}" value="${title}">`;
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
						<div id="main-title">${title.toLowerCase()}</div>
					</div>
				</div>
				<div id="${title}" class="sub-title" data-mydef--sub-title-status="normal"></div>
			</div>
		</section>`;
		document.getElementById("section-box").innerHTML += output_string;
	}
	return clear;
}
