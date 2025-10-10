window.addEventListener("load", () => {
	window.setTimeout(() => {
		document.dispatchEvent(
			new CustomEvent("complete-set", {
				detail: {
					loaded: false
				}
			})
		);
	}, 1000);
});
