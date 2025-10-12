document.oncontextmenu = () => false;
document.ondblclick = () => false;

const main_sel = document.createElement("select");
main_sel.id = "main-sel";

["abc", "def"].forEach(c => {
	const el = document.createElement("option");
	el.value = c;
	el.innerHTML = c;
	main_sel.appendChild(el);
});

document.getElementById("main-obj").text = main_sel.outerHTML;