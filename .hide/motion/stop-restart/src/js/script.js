const streamServerInfoObject = {
	"stop-other-processing": false,
	"switching--stop-other-processing": function () {
		this["stop-other-processing"] = !this["stop-other-processing"];
	},
	"info-array": [
		{
			"title": "STOP",
			"url": createTshutoURL("api", "motion")
		},
		{
			"title": "RESTART",
			"url": createTshutoURL("api", "motion")
		}
	]
};

streamServerInfoObject["info-array"].forEach(m => createMotionContentsSection(m));

function createTshutoURL(_str = "", add_path = "") {
	return `https://${_str}.tshuto.com/${add_path}`;
}

function onclick_func(obj = { "title": "", "url": "" }) {
	if (!streamServerInfoObject["stop-other-processing"]) {
		streamServerInfoObject["switching--stop-other-processing"]();
		window.alert("clicked");
		const _url = new URL(obj["url"]);
		_url.searchParams.set("motion-order", obj["title"].toLowerCase());
		window.fetch(_url).then(res => res.text()).then(dt => {
			window.alert(dt);
			window.setTimeout(() => {
				streamServerInfoObject["switching--stop-other-processing"]();
			}, 10 * 1000);
		});
	} else
		window.alert("processing other button now...");
}

function createMotionContentsSection(obj = { "title": "", "url": "" }) {
	const title = obj["title"];
	const url = obj["url"];
	const regexp_str = "[a-zA-Z0-9_-]";
	const regexp = new RegExp(regexp_str, "g");
	const onclick_str = `javascript:onclick_func(${JSON.stringify(obj).replaceAll(`"`, `'`)})`;
	const mainContents = `<input type="button" class="motion-contents" id="button-${title}" value="${title}" onclick="${onclick_str}">`;
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
