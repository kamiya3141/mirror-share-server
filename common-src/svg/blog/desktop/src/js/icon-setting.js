const w = 100;
const h = 100;
const cx = w / 2;
const cy = h / 2;
const r1 = (w + h) / 8;
const r2 = r1 * 0.5;
const n = 6;
const dtr = 20;

let d = "";

for (let i = 0; i < n; i++) {
	const dis_r0 = i * (360 / n) - 90;
	const dis_r1 = (i + 1) * (360 / n) - 90;
	const dis_r00 = radians(dis_r0);
	const dis_r10 = radians(dis_r1);
	const dis_r01 = radians(dis_r0 + dtr);
	const dis_r11 = radians(dis_r1 - dtr);
	// 歯車の根本
	const x00 = cx + cos(dis_r01) * r1;
	const y00 = cy + sin(dis_r01) * r1;
	const x10 = cx + cos(dis_r11) * r1;
	const y10 = cy + sin(dis_r11) * r1;
	// 歯車の先端
	const x01 = x00 + cos(dis_r00) * r2;
	const y01 = y00 + sin(dis_r00) * r2;
	const x11 = x10 + cos(dis_r10) * r2;
	const y11 = y10 + sin(dis_r10) * r2;

	const l_str = " L";

	const pos_arr_str = l_str + [[x00, y00], [x10, y10], [x11, y11]].map(c => ` ${c.join(", ")}`).join(l_str);

	d += (i == 0 ? "M" : l_str) + ` ${x01}, ${y01}` + pos_arr_str;

}

d += " Z";

document.getElementById("p1").setAttribute("d", d);

function sin(n) {
	return Math.sin(n);
}
function cos(n) {
	return Math.cos(n);
}
function PI(n) {
	return n * Math.PI;
}
function radians(n) {
	return n * PI(1 / 180);
}
