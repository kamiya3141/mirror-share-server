window.addEventListener("message", e => {
	if (e.data == "loaded") parentElement.setAttribute("my-attr-jump-href", "true");
});
