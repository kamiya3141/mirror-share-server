async function mainFunc() {
	const CORRECT_URL = ".";// await fetch(`${winMyHrefPTCHostname}?convert=true`).then(res => res.text());
	const PMD = await import(`${CORRECT_URL}/index-module.js`);
	if (winMyHrefPathname == "/")
		window.location.href = `${winMyHrefPTCHostname}/home`;
	await PMD.parseMD();
}

window.addEventListener("load", mainFunc);
