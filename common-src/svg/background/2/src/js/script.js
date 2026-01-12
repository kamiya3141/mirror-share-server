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

const rectCLBASE = 5;
const rectCL = 3 * rectCLBASE;

const CREATE_ELEMENT_NAME = "path";

let rectSize = width / rectCL;



function getRandom(mn = 0, mx = 1) {
	return (Math.random() * (mx - mn)) + mn;
}



const __DebugMode__ = false;

function createDebugCircle(x, y, i = 0) {
	const _c = document.createElementNS(NS, "circle");
	_c.setAttribute("cx", x);
	_c.setAttribute("cy", y);
	_c.setAttribute("r", 5);
	_c.setAttribute("fill", `#${["00f", "0f0", "f00", "000"][i]}`);
	return _c;
}

function createTriangle(dir, x, y, wh, id, _t = null) {
	wh /= 2;

	if (_t == null) {
		_t = document.createElementNS(NS, CREATE_ELEMENT_NAME);
		_t.id = id;
		_t.setAttribute("fill", "var(--svgRectBackgroundColor)");
		if (__DebugMode__) {
			_t = document.createElementNS(NS, "g");
			_t.setAttribute("fill", "transparent");
			_t.setAttribute("x", x);
			_t.setAttribute("y", y);
			_t.setAttribute("width", wh * 2);
			_t.setAttribute("height", wh * 2);
		}
	}
	const _t2 = document.createElementNS(NS, CREATE_ELEMENT_NAME);
	let d_str = (dir == 0 ? [x, y, x + wh * 2, y + wh, x, y + wh * 2].join(" ") : [x + wh * 2, y, x, y + wh, x + wh * 2, y + wh * 2].join(" "));

	if (!__DebugMode__) {
		_t.setAttribute("d", `M ${d_str} Z`);
		_t.setAttribute("fill-opacity", `${getRandom(0, 1)}`);
	} else {
		_t2.setAttribute("d", `M ${x} ${y} L ${x + wh * 2} ${y + wh} L ${x} ${y + wh * 2} Z`);
		_t2.setAttribute("stroke", "black");
		_t.appendChild(_t2);
		_t.appendChild(createDebugCircle(x, y, 3));
	}
	return _t;
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
	[...svg.querySelectorAll(CREATE_ELEMENT_NAME)].forEach((c, i) => {
		const positionNumberArray = c.id.split("-").map(c_id => Number(c_id));
		createTriangle((i % 2) + 0, positionNumberArray[0] * rectSize, positionNumberArray[1] * rectSize, rectSize, "", c);
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
	for (let j = 0; j < rectCLBASE * 2; j++) {
		svg.appendChild(createTriangle(((i + j) % 2) + 0, i * rectSize, j * rectSize, rectSize, `${i}-${j}`));
		svg.appendChild(createTriangle(((i + j) % 2) + 1, i * rectSize, j * rectSize, rectSize, `${i}-${j + 0.5}`));
	}
}

updateBackgroundColor();