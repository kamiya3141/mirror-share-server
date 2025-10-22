var host_url0 = "https://share.tshuto.com/common-src/javascript/tamura";
const script0 = document.createElement("script");
script0.setAttribute("defer", "");
script0.setAttribute("src", `${host_url0}/tamura-first-load-css.js`);
document.body.prepend(script0);
script0.onload = function() {
	const script1 = document.createElement("script");
	script1.setAttribute("defer", "");
	script1.setAttribute("src", "./src/js/script.js");
	document.body.appendChild(script1);
};
