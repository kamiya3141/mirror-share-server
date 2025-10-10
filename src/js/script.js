const baseEventName = "focus";

["in", "out"].forEach(c => {
	document.body.addEventListener(baseEventName + c, e => {
		e.target.style.backgroundColor = c == "in" ? "black" : "white";
	});
});