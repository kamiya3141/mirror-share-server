let MARKDOWN_ARTICLE_TITLE = "No Title.";

const SPL_STR_NML = "-:-";
const SAND_SPL_STR_NML = _str_ => `${SPL_STR_NML}${_str_}${SPL_STR_NML}`;
const SPL_STR_ENV = "-%-";
const SAND_SPL_STR_ENV = _str_ => `${SPL_STR_ENV}${_str_}${SPL_STR_ENV}`;
const STR_ENV_CONV_OBJ = {};

const myTabSize = Number(getCSSLengthValue("--myStylingTabSize"));

const nbsp = n => "&nbsp;".repeat(n);

const before_replace_str_define_array = [
	[
		/@css\[(["'`])?(.*?)["'`]?\]\((.*?)\)/g,
		(qu, stl, str) => `<pre style=${qu + stl + qu}>${str}</pre>`,
		[1, 2, 3]
	],
	[
		/(\\[a-z])/g,
		cts => {
			let res_str = "";
			switch (cts) {
				case "\\t":
					res_str = nbsp(myTabSize);
					break;
				case "\\n":
					res_str = "<br>";
					break;
				default:
					res_str = cts;
					break;
			}
			return res_str;
		},
		null
	],
	[
		new RegExp(`(${SAND_SPL_STR_NML("MYHOSTNAME")})`, "g"),
		hostname => winMyHrefHostname,
		null
	],
	[
		/<(\/?.+)>\n/g,
		cts => `<${cts}>`,
		null
	],
	[
		/```([^\n]*?):([^\n]*?)\n([\s\S]*?)```/g,
		(nm, cts) => createCodeInnerHTMLString("line-multi code-frame-normal code-iframe-common-styles", nm, cts),
		[2, 3]
	],
	[
		/```([^\n]*?)\n([\s\S]*?)```/g,
		(nm, cts) => createCodeInnerHTMLString("line-multi code-frame-normal code-iframe-common-styles", nm, cts),
		[1, 2]
	],
	[
		/```([^\r\n]*?)```/g,
		cts => createCodeInnerHTMLString("line-solo code-frame-mini", "none", cts, true),
		null
	],
	[
		/`([^\r\n]*?)`/g,
		cts => createCodeInnerHTMLString("line-solo code-frame-mini", "none", cts, true),
		null
	],
	[
		/~{2}(.*?)~{2}/g,
		cts => `<div class="easy-text-deco text-line-through">${cts}</div>`,
		null
	],
	[
		/\*{2}(.*?)\*{2}/g,
		cts => `<div class="easy-text-deco text-bold">${cts}</div>`,
		null
	],
	[
		/ \*{1}(.*?)\*{1} /g,
		cts => `<div class="easy-text-deco text-italic">${cts}</div>`,
		null
	],
	[
		/_{2}(.*?)_{2}/g,
		cts => `<div class="easy-text-deco text-underline">${cts}</div>`,
		null
	],
	/*[
		/^( *?)\* ?(.*)\n/gm,
		(sp, cts) => `${nbsp(sp.length)}<ul><li class="my-ul-li">${cts}</li></ul>\n`,
		[1, 2]
	],
	[
		/^( *?)\d\. ?(.*)\n/gm,
		(sp, cts) => `${nbsp(sp.length)}<ol><li class="my-ol-li">${cts}</li></ol>\n`,
		[1, 2]
	],*/
	[
		/((?:<li class="my-ul-li">.*<\/li>\n?)+)/g,
		cts => `<ul>${cts}</ul>\n`,
		null
	],
	[
		/((?:<li class="my-ol-li">.*<\/li>\n?)+)/g,
		cts => `<ol>${cts}</ol>\n`,
		null
	],
	[
		/^> ?(.*)\n/gm,
		cts => convertByRefString(`> ${cts.length == 0 ? " " : cts}`),
		null
	],
	[
		/::: note(\n[\s\S]*?):::/g,
		cts => createNoteInnerHTMLString("info", cts),
		null
	],
	[
		/::: note info(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("info", cts),
		null
	],
	[
		/::: note warn(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("warn", cts),
		null
	],
	[
		/::: note alert(\n[\s\S]*?\n):::/g,
		cts => createNoteInnerHTMLString("alert", cts),
		null
	],
	[
		/^###### (.+)$/gm,
		cts => createHnWithDivElement(cts, 6),
		null
	],
	[
		/^##### (.+)$/gm,
		cts => createHnWithDivElement(cts, 5),
		null
	],
	[
		/^#### (.+)$/gm,
		cts => createHnWithDivElement(cts, 4),
		null
	],
	[
		/^### (.+)$/gm,
		cts => createHnWithDivElement(cts, 3),
		null
	],
	[
		/^## (.+)$/gm,
		cts => createHnWithDivElement(cts, 2),
		null
	],
	[
		/^# (.+)$/gm,
		cts => createHnWithDivElement(cts, 1),
		null
	],
	[
		/!\[["'`]?(.*?)["'`]?\]\((https?:\/\/[a-zA-Z0-9\/:%&?=.-]+) ?["'`]?(.*?)["'`]?\)/g,
		(alt, url, ttl) => `<img src="${url}" title="${ttl ? ttl : url}" alt="${alt ? alt : url}">`,
		[1, 2, 3]
	],
	[
		/\[["'`]?(.*?)["'`]?\]\((https?:\/\/[a-zA-Z0-9\/:%&?=.-]+) ?["'`]?(.*?)["'`]?\)/g,
		(cts, url, ttl) => `<a href="${url}" title="${ttl ? ttl : url}">${cts ? cts : url}</a>`,
		[1, 2, 3]
	],
	[
		/\\(.*)/g,
		cts => cts,
		null
	]
];

function convertULOL(input_str = "") {
	const simple_reg = /^(?<!\/)( *)[*+-] +(.+)$/gm;
	const number_reg = /^(?<!\/)( *)\d\. +(.+)$/gm;
	const obj_n = [0, 0];
	return input_str.split("\n").map((str, i0) => {
		const olul_obj = [
			{
				"res": [...str.matchAll(simple_reg)],
				"el": "ul"
			},
			{
				"res": [...str.matchAll(number_reg)],
				"el": "ol"
			}
		];
		olul_obj.forEach((c, i) => {
			let start_element_str = `<${c["el"]}>`;
			let end_element_str = `</${c["el"]}>`;
			let insert_before = "";
			if (c["res"].length) {
				c["res"].forEach(__res => {
					const _ipt_n = __res[1].length;
					if (_ipt_n < obj_n[i])
						insert_before += end_element_str;
					else if (_ipt_n > obj_n[i])
						insert_before += start_element_str;
					obj_n[i] = _ipt_n;
					str = str.replace(__res[0], `${insert_before}<li class="my-${c["el"]}-li">${__res[2]}</li>`);
				});
			}
		});
		return str;
	}).join("\n");
}



function convertByRefString(_str) {
	if (_str == ">  ")
		return `<div class="byref-div">&nbsp;</div>`;
	const _rgex = /^>\s?(.*)/gm;
	const _res = [...String(_str).matchAll(_rgex)];
	if (_res.length > 0)
		_res.forEach(_c => _str = String(_str).replaceAll(_c[0], `<div class="byref-div">${convertByRefString(_c[1])}</div>`));
	return _str;
}
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

function setArticleAndHTMLTitle(_str = "No Title ...") {
	setDocumentTitle(_str);
	MARKDOWN_ARTICLE_TITLE = _str;
}

async function parseMarkDown2HTMLContextVersion1(decoded_json_data = {}) {
	const mdtxt = decoded_json_data["content"];
	let result_str = mdtxt;

	setArticleAndHTMLTitle(decoded_json_data["title"]);

	// 事前変換
	result_str = convertULOL(result_str);

	const BEFORE_REPLACE_STR_DEFINE_ARRAY = before_replace_str_define_array;

	for (let v of BEFORE_REPLACE_STR_DEFINE_ARRAY) {
		const result_array = [...result_str.matchAll(v[0])];
		if (result_array.length) {
			for (let chv of result_array) {
				const _str = v[1](...(v[2] == null ? [1] : v[2]).map(c => chv[c]));
				result_str = result_str.replace(chv[0], String(_str));
			}
		}
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
	result_str = `<pre><div data-mydef--article-tag="title">${MARKDOWN_ARTICLE_TITLE}</div>${result_str}</pre>`;
	return result_str;
}


async function parseMarkDown2HTMLContextVersion2(decoded_json_data = {}) {

	const mdurl = new URL(`${winMyHrefPTCHostname}/md/${decoded_json_data["file_name"]}`);
	const mdcontent = decoded_json_data["content"];
	let result_str = await fetch(`https://api.tshuto.com/md?${new URLSearchParams({
		"md-file-url": mdurl,
		"md-file-content": mdcontent
	})}`).then(res => res.text());

	return result_str;
}


function afterWorker() {
	[...document.querySelectorAll("button.copy-code-button-element")].forEach(c => c.addEventListener("click", e => {
		copyCodeDataForClipBoard(e);
	}));
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

function createAPIURL(_str) {
	return new URL(`${winMyHrefPTCHostname}/src/php/${_str}`);
}

async function getArticleData() {
	const targetQueryName = "slug";
	const targetQueryData = getFlag(id_flag);
	const fileURL = createAPIURL(`article-get-api-local.php`);
	fileURL.searchParams.set(targetQueryName, targetQueryData ? targetQueryData : "20260401230000--home");

	const res = await fetch(fileURL);
	if (!res.ok) {
		alert("404 Error !!\narticle doesn't exist !!");
		return null;
	}
	const json_data = await res.json();

	return json_data;

}

async function getAllArticleData() {
	const fileURL = createAPIURL(`article-get-all-api-local.php`);

	const res = await fetch(fileURL);
	if (!res.ok) {
		alert("404 Error !!\nFailed to get articles.");
		return null;
	}
	const json_data = await res.json();

	return json_data;

}

async function parseMarkdown(use_version_1 = true) {
	let result_md_str = "<h1>404 Error ...</h1>";
	const decoded_json_data = await getArticleData();

	if (decoded_json_data != null && decoded_json_data["type"] == "article" && decoded_json_data["status"] == "published")
		result_md_str = await (use_version_1 ? parseMarkDown2HTMLContextVersion1 : parseMarkDown2HTMLContextVersion2)(decoded_json_data);

	return result_md_str;
}

export { parseMarkdown as parseMD, afterWorker as afterFunction, parseMarkDown2HTMLContextVersion1 as parseMD2HTMLv1, parseMarkDown2HTMLContextVersion2 as parseMD2HTMLv2, getAllArticleData, getArticleData, createAPIURL };