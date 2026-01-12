const svg = document.getElementById("parent-svg");
const NS = svg.getAttribute("xmlns");
const mainCanvas = svg.getElementById("main-canvas");
const colors = [
	"#ff0080", "#8000ff", "#00bfff", "#00ff80", "#ffff00",
	"#ff8000", "#ff0000", "#00ffff", "#00ff00", "#ff00ff"
];
let colorIndex = 0;

let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;

const rectCLBASE = 10;
const rectCL = 3 * rectCLBASE;

let rectSize = width / rectCL;


function getRandom(mn = 0, mx = 1) {
	return (Math.random() * (mx - mn)) + mn;
}

function createRect(x, y, w, h, id, _r = null) {
	if (_r == null) {
		_r = document.createElementNS(NS, "rect");
		_r.id = id;
		_r.setAttribute("fill", "var(--svgRectBackgroundColor)");
	}
	_r.setAttribute("x", x);
	_r.setAttribute("y", y);
	_r.setAttribute("width", w);
	_r.setAttribute("height", h);
	_r.setAttribute("fill-opacity", `${getRandom(0, 1)}`);
	return _r;
}

function updateSVGViewBox() {
	width = document.documentElement.clientWidth;
	height = document.documentElement.clientHeight;
	svg.setAttribute("viewBox", [0, 0, width, height].join(" "));
}

function updateBackgroundColor() {
	colorIndex = (colorIndex + 1) % colors.length;
	document.documentElement.style.setProperty("--svgRectBackgroundColor", `${colors[colorIndex]}80`);
	const preRectSize = rectSize;
	rectSize = width / rectCL;
	[...svg.querySelectorAll("rect")].forEach(c => {
		const positionNumberArray = c.id.split("-").map(c_id => Number(c_id));
		createRect(positionNumberArray[0] * rectSize, positionNumberArray[1] * rectSize, rectSize, rectSize, "", c);
	});
}

document.addEventListener("click", () => {
	updateBackgroundColor();
});

window.addEventListener("resize", () => {
	updateSVGViewBox();
	updateBackgroundColor();
});

updateSVGViewBox();

for (let i = 0; i < rectCL; i++) {
	for (let j = 0; j < rectCLBASE * 2; j++)
		svg.appendChild(createRect(i * rectSize, j * rectSize, rectSize, rectSize, `${i}-${j}`));
}

updateBackgroundColor();