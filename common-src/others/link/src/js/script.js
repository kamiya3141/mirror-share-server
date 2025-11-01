const main_sel = document.getElementById("main-sel");

fetch("https://link.tshuto.com/get-dirs/src/").then(res => res.json()).then(dt => {
	main_sel.innerHTML = [...dt].map(c => c.replace("/", "")).reduce((s, c) => s + `<option value="${c}">${c}</option>`, "");
});

const btn = document.getElementById("go-button");

btn.mouseClickHandler = (me, e) => window.location.replace(`https://link.tshuto.com/${main_sel.value}`);