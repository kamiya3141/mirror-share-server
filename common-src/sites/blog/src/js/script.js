async function mainFunc() {
	const PMD = await import(`./markdown.js`);
	await PMD.buildMD();
}

// window.addEventListener("load", mainFunc);
(async () => {
	await mainFunc();
})();