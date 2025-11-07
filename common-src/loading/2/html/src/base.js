const width = Number(document.documentElement.clientWidth);
const height = Number(document.documentElement.clientHeight);

setTheme(width, height);

const common_r = width > height ? height / 2 : width / 2;
const common_cx = common_r;
const common_cy = common_r;
const common_small_r = common_r / 25;
const splits = 20;


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
