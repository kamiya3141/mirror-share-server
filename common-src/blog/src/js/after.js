[...document.querySelectorAll(`.import-template-append[template-id-data="toggle-switch-template"]`)].forEach(c => {
	const _arg = c.getAttribute("template-id-args");
	const data = getDeviceInformation(_arg);
	if (data)
		c.querySelector(".toggle_input").click();
});