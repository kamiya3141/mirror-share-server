window.addEventListener("load", () => {
	[...document.querySelectorAll("a")].forEach(c => {
		c.innerHTML = c.href;
	});
});
