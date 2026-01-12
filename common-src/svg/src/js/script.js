const myifr = document.getElementById("svg-iframe");

document.addEventListener("click", () => {
	myifr.contentWindow.postMessage({ msg: "click" }, "*");
});

window.addEventListener("message", e => {
	console.log(e.data);
});