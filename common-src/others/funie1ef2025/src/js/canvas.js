/**
 * @type {HTMLCanvasElement}
 */
var canvas = null;// document.getElementById("canvas");
/**
 * @type {CanvasRenderingContext2D}
 */
var ctx = null;// canvas.getContext("2d");
var width = 200, height = 200;

function createCanvas(w, h) {
	const __canvasElement = document.createElement("canvas");
	__canvasElement.id = "canvas";
	__canvasElement.width = Number(w);
	__canvasElement.height = Number(h);
	document.body.appendChild(__canvasElement);
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
}

function background(...args) {
	ctx.clearRect(0, 0, width, height);
	push();
	fill(...args);
	rect(0, 0, width, height);
	pop();
}

function image(src, x, y, w, h) {
	if (typeof src == "string")
		src = document.getElementById(src);
	ctx.drawImage(src, 0, 0, src.width, src.height, x, y, w, h);
}
function push() {
	ctx.save();
}
function pop() {
	ctx.restore();
}
function noFill(c) {
	ctx.fillStyle = color(0, 0, 0, 0);
}
function color(...args) {
	let retval = 0;
	if (args.length > 0) {
		if (args.length == 1 || args.length == 2) {
			if (typeof args[0] === "string")
				retval = args[0];
			else
				retval = new Array(3).fill(args[0].toString());
		} else if (args.length == 3)
			retval = args.map(c => Number(c).toString());
		else if (args.length == 4)
			retval = args.map((c, i, a) => ((i == a.length - 1) ? Number(c) / 256 : Number(c)).toString());
		if (Array.isArray(retval)) {
			if (retval.length == 3)
				retval.push(1);
			retval = `rgba(${retval.join(",")})`;
		}
	}
	return retval;
}
function fill(...args) {
	ctx.fillStyle = color(...args);
}
function noStroke() {
	ctx.strokeStyle = color(0, 0, 0, 0);
}
function stroke(c) {
	ctx.strokeStyle = c;
}
function strokeWeight(n) {
	ctx.lineWidth = n;
}
function text(txt, x, y) {
	ctx.fillText(txt, x, y);
	ctx.strokeText(txt, x, y);
}
function textSize(n) {
	TEXTSIZE = String(n) + "px ";
	ctx.font = TEXTSIZE + TEXTFONT;
}
function textFont(str) {
	TEXTFONT = str;
	ctx.font = TEXTSIZE + TEXTFONT;
}
function textAlign(str, str2) {
	if (str2 == "center") {
		str2 = "middle";
	} else if (str2 == "left") {
		str2 = "top";
	} else if (str2 == "right") {
		str2 = "bottom";
	}
	ctx.textAlign = str;
	ctx.textBaseline = str2;
}
function dist(x1, y1, x2, y2) {
	return sqrt(abs(x2 - x1) ** 2 + abs(y2 - y1) ** 2);
}
function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
}
function circle(x, y, r) {
	if (r > 0) {
		ctx.beginPath();
		ctx.arc(x, y, r / 2, radians(0), radians(360), false);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}
function triangle(x1, y1, x2, y2, x3, y3) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
function ellipse(x, y, r1, r2) {
	ctx.beginPath();
	ctx.ellipse(x, y, r1 / 2, r2 / 2, 0, radians(0), radians(360));
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}
function arc(x, y, r, rad1, rad2) {
	ctx.beginPath();
	ctx.arc(x, y, r / 2, rad1, rad2, true);
	ctx.fill();
	ctx.stroke();
}
function rect(x, y, w, h, ...args) {
	if (args.length > 0) {
		let r = args[0];
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.arcTo(x + w, y, x + w, y + h, r);
		ctx.arcTo(x + w, y + h, x, y + h, r);
		ctx.arcTo(x, y + h, x, y, r);
		ctx.arcTo(x, y, x + w, y, r);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	} else {
		ctx.beginPath();
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}
function vert(arr) {
	ctx.beginPath();
	for (let i = 0; i < arr.length; i++) {
		if (i == 0) {
			ctx.moveTo(arr[i][0], arr[i][1]);
		} else {
			ctx.lineTo(arr[i][0], arr[i][1]);
		}
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
function point(x, y) {
	fill(ctx.strokeStyle);
	noStroke();
	circle(x, y, ctx.lineWidth);
}
function random(n, n2) {
	return Math.random() * (n2 - n) + n;
}
function round(n) {
	return Math.round(n);
}
function floor(n) {
	return Math.floor(n);
}
function abs(n) {
	return Math.abs(n);
}
function atan2(y, x) {
	return Math.atan2(y, x);
}
function sin(n) {
	return Math.sin(n);
}
function cos(n) {
	return Math.cos(n);
}
function tan(n) {
	return Math.tan(n);
}
function sqrt(n) {
	return Math.sqrt(n);
}
function radians(num) {
	let n = num * (Math.PI / 180);
	return n;
}
function rotate(d) {
	ctx.rotate(d);
}
function translate(x, y) {
	ctx.translate(x, y);
}
