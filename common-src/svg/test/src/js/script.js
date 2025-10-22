const svg = document.getElementById("parent-svg");

const bigCircle = {
	x: 800,
	y: 450,
	r: 600
};
const smallCircle = {
	x: 800,
	y: 450,
	r: 250
};

const num = 60;

let count = 1;

let lineArray = [];
for (let i = 0; i < num; i++) {
	const rad = radians((i + count) / num * 360);
	const rad2 = radians(Math.floor((i + count) / 2) / (num / 2) * 360);

	const x1 = bigCircle.x + Math.cos(rad) * bigCircle.r / 2;
	const y1 = bigCircle.y + Math.sin(rad) * bigCircle.r / 2;
	const x2 = smallCircle.x + Math.cos(rad2) * smallCircle.r / 2;
	const y2 = smallCircle.y + Math.sin(rad2) * smallCircle.r / 2;
	const line = document.createElementNS(svg.getAttribute("xmlns"), "line");
	line.setAttribute("x1", `${x1}`);
	line.setAttribute("y1", `${y1}`);
	line.setAttribute("x2", `${x2}`);
	line.setAttribute("y2", `${y2}`);
	line.setAttribute("stroke", "white");
	svg.appendChild(line);
	lineArray.push(line);
}

window.setInterval(function() {
	count++;
	for (let i = 0; i < lineArray.length; i++) {
		const rad0 = count / num * 90;
		/*
		const rad1 = radians((i + count) / num * 360);
		const x1 = bigCircle.x + Math.cos(rad1) * bigCircle.r / 2;
		const y1 = bigCircle.y + Math.sin(rad1) * bigCircle.r / 2;
		lineArray[i].setAttribute("x1", `${x1}`);
		lineArray[i].setAttribute("y1", `${y1}`);
		*/
		const rad2 = radians(Math.floor((i + count) / 2) / (num / 2) * 360 + rad0);
		const x2 = smallCircle.x + Math.cos(rad2) * smallCircle.r / 2;
		const y2 = smallCircle.y + Math.sin(rad2) * smallCircle.r / 2;
		lineArray[i].setAttribute("x2", `${x2}`);
		lineArray[i].setAttribute("y2", `${y2}`);

		lineArray[i].setAttribute("transform", `rotate(${rad0}, ${bigCircle.x}, ${bigCircle.y})`);
	}
	if (count > num * 1.5) count = 1;
}, 1000 / 30);

function radians(n) {
	return n / 180 * Math.PI;
}
