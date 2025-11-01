const main_sel = document.getElementById("main-sel");

fetch("https://link.tshuto.com/get-dirs/src/").then(res => res.json()).then(dt => {
	main_sel.innerHTML = [...dt].map(c => c.replace("/", "")).reduce((s, c) => s + `<option value="${c}">${c}</option>`, "");
});

const btn = document.getElementById("go-button");

btn.addEventListener("click", () => {
	let url = `https://link.tshuto.com/${main_sel.value}`;
	url += "?yj&atc";
	window.location.href = url;
});