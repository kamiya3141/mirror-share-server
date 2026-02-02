async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	const result = await PMD.parseMD();

	let mdContentsBoxElement = document.getElementById("main-contentsbox");
	mdContentsBoxElement.innerHTML = result;
	afterReplacedStringFunc();
}

window.addEventListener("load", mainFunc);

async function copyCodeDataForClipBoard(e) {
	try {
		const rootElement = getParentElement(e.currentTarget, 6);
		const codeText = rootElement.querySelector("code").innerText;
		await navigator.clipboard.writeText(codeText);
	} catch (error) {
		console.log(error);
	}
}


function getCurrentURLProtocolAndHostname(my_pathname = "", with_pathname = false) {
	with_pathname = Boolean(with_pathname);
	my_pathname = String(my_pathname);
	if (my_pathname[0] != "/")
		my_pathname = "/" + my_pathname;
	return `${winMyHrefPTCHostname}${with_pathname ? winMyHrefPathname : my_pathname}`;
}

function afterReplacedStringFunc() {
	[...document.querySelectorAll("button.copy-code-button-element")].forEach(c => c.addEventListener("click", e => {
		copyCodeDataForClipBoard(e);
	}));
	[...document.querySelectorAll("div.item-box.deco-text > a")].forEach(c => {
		const preHref = c.getAttribute("href");
		c.setAttribute("href", getCurrentURLProtocolAndHostname(`/${preHref.split("/").at(-1)}`));
	});
}
