const svg = document.getElementById("parent-svg");
const path_g = document.getElementById("path-g");
const NS = svg.getAttribute("xmlns");

const colors = [
	"#ff0080", "#8000ff", "#00bfff", "#00ff80", "#ffff00",
	"#ff8000", "#ff0000", "#00ffff", "#00ff00", "#ff00ff"
];

const numLines = colors.length;
const numPoints = 300;
svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
const viewBoxArray = svg.getAttribute("viewBox").split(" ").map(c => Number(c));
const width = viewBoxArray[2];
const height = viewBoxArray[3];
const amplitude = height / 4;
const frequencyBase = 0.05;
const speed = 0.0001;

const frameRate = 60;
let time = 10;
let add_time = frameRate;
let exec_flag = true;

const paths = Array.from({ length: numLines }, (c, i) => {
	const path = document.createElementNS(NS, "path");
	path.setAttribute("stroke", colors[i % colors.length]);// `hsl(${(i / numLines) * 360}, 100%, 50%)`
	path_g.appendChild(path);
	return path;
});


function drawWave(_time) {
	time += frameRate;
	exec_flag = true;
	add_time--;
	for (let i = 0; i < numLines; i++) {
		let d = "";
		for (let j = 0; j <= numPoints; j++) {
			const x = (j / numPoints) * width;
			const y =
				height / 2 +
				i * 30 -
				(numLines * 1) +
				Math.sin(j * frequencyBase + time * speed + i) *
				amplitude *
				Math.sin(time * 0.0005 + i);

			d += j === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
		}
		paths[i].setAttribute("d", d);
	}
	if (add_time > 0) requestAnimationFrame(drawWave);
	else exec_flag = false;
}

requestAnimationFrame(drawWave);

document.addEventListener("click", () => {
	add_time += frameRate;
	if (!exec_flag) requestAnimationFrame(drawWave);
});