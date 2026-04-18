const SPL_STR = "-:-";
const SAND_SPL_STR = _str_ => `${SPL_STR}${_str_}${SPL_STR}`;

const before_replace_str_define_array = [
	[
		/<(\/?.+)>\n/g,
		cts => `<${cts}>`,
		null,
		false
	],
	[
		new RegExp(`(${SAND_SPL_STR("MYHOSTNAME")})`, "g"),
		hostname => winMyHrefHostname,
		null,
		null,
		null
	],
	[
		/```([^\n]*?):([^\n]*?)\n([\s\S]*?)```/g,
		(nm, cts) => createCodeInnerHTMLString("line-multi code-frame-normal code-iframe-common-styles", nm, cts),
		[2, 3],
		null,
		null
	],
	[
		/```([^\n]*?)\n([\s\S]*?)```/g,
		(nm, cts) => createCodeInnerHTMLString("line-multi code-frame-normal code-iframe-common-styles", nm, cts),
		[1, 2],
		null,
		null
	],
	[
		/```([^\r\n]*?)```/g,
		cts => createCodeInnerHTMLString("line-solo code-frame-mini", "none", cts, true),
		null,
		null,
		null
	],
	[
		/`([^\r\n]*?)`/g,
		cts => createCodeInnerHTMLString("line-solo code-frame-mini", "none", cts, true)
	],
	[
		/~{2}(.*?)~{2}/g,
		cts => `<div class="easy-text-deco text-line-through">${cts}</div>`
	],
	[
		/[*_]{2}(.*?)[*_]{2}/g,
		cts => `<div class="easy-text-deco text-bold">${cts}</div>`
	],
	[
		/\s[*_]{1}(.*?)[*_]{1}\s/g,
		cts => `<div class="easy-text-deco text-italic">${cts}</div>`
	],
	[
		/(?<!\/)\*\s+(.+)/g,
		cts => `<li>${cts}</li>`
	],
	[
		/((?:<li>.*<\/li>\n?)+)/g,
		cts => `<ul>\n${cts}</ul>\n`
	],
	[
		/:::\snote(\n[\s\S]*?):::/g,
		cts => createNoteInnerHTMLString("info", cts),
		null,
		null,
		null
	],
	[
		/:::\snote\sinfo(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("info", cts),
		null,
		null,
		null
	],
	[
		/:::\snote\swarn(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("warn", cts),
		null,
		null,
		null
	],
	[
		/:::\snote\salert(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("alert", cts),
		null,
		null,
		null
	],
	[
		/(?<=^|\n)######\s(.+)/g,
		cts => createHnWithDivElement(cts, 6),
		null,
		false
	],
	[
		/(?<=^|\n)#####\s(.+)/g,
		cts => createHnWithDivElement(cts, 5),
		null,
		false
	],
	[
		/(?<=^|\n)####\s(.+)/g,
		cts => createHnWithDivElement(cts, 4),
		null,
		false
	],
	[
		/(?<=^|\n)###\s(.+)/g,
		cts => createHnWithDivElement(cts, 3),
		null,
		false
	],
	[
		/(?<=^|\n)##\s(.+)/g,
		cts => createHnWithDivElement(cts, 2),
		null,
		false
	],
	[
		/(?<=^|\n)#\s(.+)/g,
		cts => createHnWithDivElement(cts, 1),
		null,
		false
	],
	[
		/!\[["'`]?(.*?)["'`]?\]\((https?:\/\/[a-zA-Z0-9\/:%&?=.-]+)\s?["'`]?(.*?)["'`]?\)/g,
		(alt, url, ttl) => `<img src="${url}" title="${ttl ? ttl : url}" alt="${alt ? alt : url}">`,
		[1, 2, 3],
		false
	],
	[
		/\[["'`]?(.*?)["'`]?\]\((https?:\/\/[a-zA-Z0-9\/:%&?=.-]+)\s?["'`]?(.*?)["'`]?\)/g,
		(cts, url, ttl) => `<a href="${url}" title="${ttl ? ttl : url}">${cts ? cts : url}</a>`,
		[1, 2, 3],
		false
	],
	[
		/\\(.)/g,
		cts => `${cts}`,
		null,
		false
	]
];

function createHnWithDivElement(cts, n) {
	n = (Number(n) == NaN ? 1 : n);
	return `<div class="hn-div"><h${n}>${cts}</h${n}></div>`;
}

function createCodeInnerHTMLString(cls, nm, cts, btn_none = false) {
	let result_str = "";
	const line_multi_str = `<div class="code-frame ${cls}"><div class="code-option-root"><div class="file-info-box"><div class="file-name-box" code-frame-filename="${nm}"></div></div><div class="code-option-box"><div class="code-copied-flag-root"><div class="code-copied-flag display-none">Copied!!</div></div><div class="code-copy-button-root"><div class="code-copy-button ${btn_none ? 'display-none' : "display-exist"}"><button class="copy-code-button-element"><span class="fa fa-fw fa-clipboard"></span></button></div></div></div></div><pre><code>${cts}</code><pre></div>`;
	const line_solo_str = `<div class="code-frame ${cls}" code-frame-filename="${nm}"><div class="code-copy-button ${btn_none ? 'display-none' : "display-exist"}"><button class="copy-code-button-element"><span class="fa fa-fw fa-clipboard"></span></button></div><pre><code>${cts}</code><pre></div>`;

	result_str = String(cls).includes("line-multi") ? line_multi_str : line_solo_str;

	return result_str;
}
function createNoteInnerHTMLString(cls_nt_tp = "info", cts) {
	return `<div class="note-class note-${cls_nt_tp}"><span class="note-mark-span fa fa-fw fa-${["check", "exclamation", "times"].at(["info", "warn", "alert"].indexOf(cls_nt_tp))}-circle"></span>${cts}</div>`;
}

function getCurrentURLProtocolAndHostname(my_pathname = "", with_pathname = false) {
	with_pathname = Boolean(with_pathname);
	my_pathname = String(my_pathname);
	if (my_pathname[0] != "/")
		my_pathname = "/" + my_pathname;
	return `${winMyHrefPTCHostname}${with_pathname ? winMyHrefPathname : my_pathname}`;
}

async function parseMarkDown2HTMLContextVersion1(mdurl = "") {

	const mdtxt = await fetch(mdurl).then(res => res.text());
	let result_str = mdtxt;

	const BEFORE_REPLACE_STR_DEFINE_ARRAY = before_replace_str_define_array;

	for (let v of BEFORE_REPLACE_STR_DEFINE_ARRAY) {
		const result_array = [...result_str.matchAll(v[0])];
		if (result_array.length) {
			for (let chv of result_array) {
				const _str = v[1](...(v[2] == null ? [1] : v[2]).map(c => chv[c]));
				result_str = result_str.replace(chv[0], String(_str).replace("\n", (v.length == 5 ? "" : "\n"))); // .replaceAll(new RegExp("\n", "g"), "<br>"));
			}
		}
		// replaceAllの前に、replace()を挟んでいるのは、見た目が不格好になるため
	}

	// リンクカード整形
	const splited_result_str_arr = result_str.split("\n");
	for (let i = 0; i < splited_result_str_arr.length; i++) {
		const ptn = new RegExp("^(https?://.+?)$", "g");
		let result_array = [...splited_result_str_arr[i].matchAll(ptn)];
		if (result_array.length > 0) {
			for (let j = 0; j < result_array.length; j++) {
				let chv = result_array[j];
				const url = new URL(chv[1]);

				const replaced_str = `<div class="code-frame embed-iframe-root code-iframe-common-styles"><a href="${url.toString()}" target="_blank"><div class="embed-iframe-inner-title-root"><div class="embed-iframe-inner-title-box">${url.toString()}</div><div class="embed-iframe-inner-title-hostname">${url.hostname}</div></div><div class="embed-iframe-inner-embed-iframe-root">${new RegExp("^(?:.*\.github\.io)$").test(url.hostname) ? `<iframe src="${url.toString()}"></iframe>` : ""}</div></a></div>`;

				splited_result_str_arr[i] = splited_result_str_arr[i].replace(chv[1], replaced_str);
			}
		}

	}

	result_str = splited_result_str_arr.join("<br>");

	//const result_elm = createElementFromHTML(result_str);
	//result_str = result_elm;
	return result_str;
}


async function parseMarkDown2HTMLContextVersion2(mdurl = "") {
	const mdtxt = await fetch(mdurl).then(res => res.text());
	let result_str = mdtxt;
	const html_data = await fetch(`https://api.tshuto.com/md?${new URLSearchParams({
		"md-file-url": mdurl
	})}`).then(res => res.text());
	// result_str = createElementFromHTML(html_data);
	return result_str;
}


function afterWorker() {
	[...document.querySelectorAll("button.copy-code-button-element")].forEach(c => c.addEventListener("click", e => {
		copyCodeDataForClipBoard(e);
	}));
	[...document.querySelectorAll("div.item-box.deco-text > a")].forEach(c => {
		const preHref = c.getAttribute("href");
		c.setAttribute("href", getCurrentURLProtocolAndHostname(`/${preHref.split("/").at(-1)}`));
	});
}

async function copyCodeDataForClipBoard(e) {
	try {
		const rootElement = getParentElement(e.currentTarget, 6);
		const codeText = rootElement.querySelector("code").innerText;
		await navigator.clipboard.writeText(codeText);
	} catch (error) {
		console.log(error);
	}
}

function getParentElement(el, n = 1, getLastElement = true) {
	let element_memory = [];
	try {
		for (n--; n > 0; n--)
			el = element_memory.at(element_memory.push(el.parentElement) - 1);
	} catch (error) {
		console.log(element_memory, error);
	}
	return getLastElement ? element_memory.at(-1) : element_memory;
}


async function parseMarkdown(use_version_1 = true) {
	const targetDirectoryName = new URL(winMyHref).searchParams.get("blog--target-dir");
	const targetFileName = new URL(winMyHref).searchParams.get("blog--target-file");
	const fileURL = `https://nextcloud.tshuto.com/public.php/dav/files/ReCLgMoHtXzn9GD/blog/md/${(targetDirectoryName ? targetDirectoryName : "home")}${targetFileName ? ("/" + targetFileName) : ""}.md`;
	// const fileURL = getCurrentURLProtocolAndHostname(`/src/md/${filePath}`);
	const result_md_str = await (use_version_1 ? parseMarkDown2HTMLContextVersion1 : parseMarkDown2HTMLContextVersion2)(fileURL);

	return result_md_str;
}

export { parseMarkdown as parseMD, afterWorker as afterFunction };

/*
let currentPathname = winMyHrefPathname;
	// .comかindex.htmlで終わるようにアクセスされたときの対策
	currentPathname = currentPathname.replace("/index.html", "/");
	if (currentPathname == "/")
		currentPathname = "/home";

	// 前後余分なスラッシュを削除
	if (currentPathname.at(0) == "/")
		currentPathname = currentPathname.substring(1, currentPathname.length);
	if (currentPathname.at(-1) == "/")
		currentPathname = currentPathname.substring(0, currentPathname.length - 1);

	currentPathname = String(currentPathname);
*/