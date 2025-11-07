window.addEventListener("message", e => {
	if (e.data == "loaded") document.body.setAttribute("my-attr-jump-href", "true");
});
