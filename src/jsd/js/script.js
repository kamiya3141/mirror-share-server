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

let body_tf = true;

const main_parent = body_tf ? document.body : document.getElementById("main-obj");

main_parent.appendChild(main_sel);