const easeNameObject = {
	/*
		"linear": {
			"x": [0, 1],
			"y": [0, 1]
		},
	*/
	"ease": {
		"x": [0.25, 0.25],
		"y": [0.1, 1]
	},
	"ease-in": {
		"x": [0.42, 1],
		"y": [0, 1]
	},
	"ease-out": {
		"x": [0, 0.58],
		"y": [0, 1]
	},
	"ease-in-out": {
		"x": [0.42, 0.58],
		"y": [0, 1]
	}
};

let R = 400;

const fps = 60;
let frameCounter = 0;
let frameCounterMax = 2 ** 10;

const one_s = fps * 5;
const add_s = 1 / one_s;

let easeNameIndex = 0;

let currentTime = 0;

function setup() {
	createCanvas(600, 400);
	R = (width > height ? height : width);
	frameRate(fps);
}

function draw() {
	background(220);

	frameCounter++;
	frameCounter %= frameCounterMax;


	fill(255);
	rect(0, 0, R, R);
	for (let t = add_s; t <= 1.0; t += add_s) {
		const x_y = easingFunc(t, easeNameIndex);
		point(x_y.x * R, x_y.y * R);
	}
	fill(0);
	text(getEaseName(easeNameIndex), R / 2, 50);
	const cxcy = easingFunc(currentTime, easeNameIndex);
	circle(cxcy.y * R, 0.5 * R, 10);

	currentTime += add_s;

	if (currentTime > 1.0) {
		currentTime = 0.0;
		easeNameIndex++;
	}

}

function getEaseName(index = 0) {
	return (keys = Object.keys(easeNameObject), keys.at(index % keys.length));
}

function easingFunc(t, name_index = 0) {
	const name = getEaseName(name_index);
	let px = (_px = [0, 1], _px.splice(1, 0, ...easeNameObject[name].x), _px);
	let py = (_py = [0, 1], _py.splice(1, 0, ...easeNameObject[name].y), _py);

	const x = (((1 - t) ** 3) * px[0]) + ((3 * (1 - t) ** 2) * t * px[1]) + (3 * (1 - t) * t ** 2) * px[2] + ((t ** 3) * px[3]);
	const y = (((1 - t) ** 3) * py[0]) + ((3 * (1 - t) ** 2) * t * py[1]) + (3 * (1 - t) * t ** 2) * py[2] + ((t ** 3) * py[3]);

	return {
		"x": x,
		"y": 1 - y
	};
}