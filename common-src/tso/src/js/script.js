window.addEventListener("load", () => {
	document.getElementById("link-header-tsbutton-0").mouseClickHandler = (me, e) => window.location.href = "https://tso.tshuto.com/view/";
	const width = document.documentElement.clientWidth, height = document.documentElement.clientHeight;
	console.log(width, height);
	setTheme(width, height);
});

function setTheme(ipt_w = 100, ipt_h = 100) {
	const tf = Number(Boolean(!window.matchMedia("(prefers-color-scheme: dark)").matches));
	[
		["StylingWidth", [ipt_w, ipt_w].map(c => `${c}px`)],
		["StylingHeight", [ipt_h, ipt_h].map(c => `${c}px`)],
		["MainBackgroundColor", ["#181818", "#ffffff"]],
		["TextColor", ["#ffffff", "#131313"]],
		["ElementBackgroundColor", ["#242424", "#f9f9f9"]]
	].forEach(c => document.documentElement.style.setProperty(`--my${c[0]}`, c[1][tf]));
}
