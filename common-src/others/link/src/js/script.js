const main_sel = document.getElementById("main-sel");

fetch("https://link.tshuto.com/get-json").then(res => res.json()).then(dt => {
	for (let i = 0; i < dt.length; i++)
		main_sel.innerHTML = [...dt].reduce((s, c) => s + `<option value="${c}">${c}</option>`, "");
});