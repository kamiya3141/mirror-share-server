["-header", "", "-footer"].map(c => `#root${c}`).forEach(c => {
	document.querySelector(c).classList.add("display-none");
});




const embedTitleDivElement = document.createElement("div");
embedTitleDivElement.id = "embed-div--title";

document.body.appendChild(embedTitleDivElement);

const SPL_STR_ENV = "-%-";
const SAND_SPL_STR_ENV = _str_ => `${SPL_STR_ENV}${_str_}${SPL_STR_ENV}`;

const targetDirectoryName = new URL(winMyHref).searchParams.get("blog--target-dir");
const targetFileName = new URL(winMyHref).searchParams.get("blog--target-file");
const queryStr = `${(targetDirectoryName ? targetDirectoryName : "")}${targetFileName ? ("/" + targetFileName) : "home"}.md`;
const fileURL = `./src/md/${queryStr}`;
fetch(fileURL).then(res => res.text()).then(data => {
	[...String(data).matchAll(new RegExp("^-%-\n*(.*?)\n*-%-\n*", "gs"))].forEach(c => {
		c[1].replaceAll("\n", "").split(",").forEach(c2 => {
			if (String(c2).includes("TITLE:"))
				embedTitleDivElement.innerHTML = String(c2).replace("TITLE:", "");
		});
	});
});
