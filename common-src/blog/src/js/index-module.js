const SPL_STR = "-:-";
const SAND_SPL_STR = _str_ => `${SPL_STR}${_str_}${SPL_STR}`;

const before_replace_str_define_array = [
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
		/```([\s\S]*?)```/g,
		cts => createCodeInnerHTMLString("line-solo code-frame-mini", "none", cts, true),
		null,
		null,
		null
	],
	[
		/`([\s\S]*?)`/g,
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
		/\*\s+(.+)/g,
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
		cts => `<h6>${cts}</h6>`,
		null,
		false
	],
	[
		/(?<=^|\n)#####\s(.+)/g,
		cts => `<h5>${cts}</h5>`,
		null,
		false
	],
	[
		/(?<=^|\n)####\s(.+)/g,
		cts => `<h4>${cts}</h4>`,
		null,
		false
	],
	[
		/(?<=^|\n)###\s(.+)/g,
		cts => `<h3>${cts}</h3>`,
		null,
		false
	],
	[
		/(?<=^|\n)##\s(.+)/g,
		cts => `<h2>${cts}</h2>`,
		null,
		false
	],
	[
		/(?<=^|\n)#\s(.+)/g,
		cts => `<h1>${cts}</h1>`,
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
	],
	[
		/<(\/?.+)>\n/g,
		cts => `<${cts}>`,
		null,
		false
	]
];

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

function createElementFromHTML(html) {
	const tempEl = document.createElement('div');
	tempEl.innerHTML = html;
	return tempEl;
}
/*
function loadIframe(__iframe) {
	return new Promise(resolve => {
		__iframe.addEventListener("load", () => resolve(__iframe), { once: true });
	});
}
*/
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



async function parseMarkDown2HTMLContextVersion1(mdurl = "") {

	const mdtxt = await fetch(mdurl).then(res => res.text());
	let result_str = mdtxt;

	for (let v of before_replace_str_define_array) {
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

				const replaced_str = `<div class="code-frame embed-iframe-root code-iframe-common-styles"><a href="${url.toString()}" target="_blank"><div class="embed-iframe-inner-title-root"><div class="embed-iframe-inner-title-box">${url.toString()}</div><div class="embed-iframe-inner-title-hostname">${url.hostname}</div></div><div class="embed-iframe-inner-embed-iframe-root">${url.hostname.includes("tshuto.com") ? `<iframe src="${url.toString()}"></iframe>` : ""}</div></a></div>`;

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

async function parseMarkdown(use_version_1 = true) {
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

	const filePath = currentPathname;
	const fileURL = getCurrentURLProtocolAndHostname(`/src/md/${filePath}.md`);
	const result_md_str = await (use_version_1 ? parseMarkDown2HTMLContextVersion1 : parseMarkDown2HTMLContextVersion2)(fileURL);

	return result_md_str;
}

export { parseMarkdown as parseMD };