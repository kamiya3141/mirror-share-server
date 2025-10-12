const main_sel = document.getElementById("main-sel");

fetch("https://link.tshuto.com/get-json").then(res => res.json()).then(dt => {
	for (let i = 0; i < dt.length; i++)
		main_sel.appendChild(dt[i]);
});

function createOptionElement(val) {
	const el = document.createElement("option");
	el.value = val;
	el.innerHTML = val;
	return el;
}