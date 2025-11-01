const main_sel = document.getElementById("main-sel");

fetch("https://link.tshuto.com/get-files/src").then(res => res.json()).then(dt => {
	for (let i = 0; i < dt.length; i++)
		main_sel.innerHTML = [...dt].map((c => String(c).replace("https://share.tshuto.com/common-src/others/link/src/", ""))).reduce((s, c) => s + `<option value="${c}">${c}</option>`, "");
});

const btn = document.getElementById("go-button");

btn.mouseClickHandler = (me, e) => window.location.replace(`https://link.tshuto.com/${main_sel.value}`);