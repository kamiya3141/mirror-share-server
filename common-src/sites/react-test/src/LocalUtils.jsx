const utilsChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz_0123456789";

function createRDM(version = 0, length = 64) {
	return [createRDMv0, createRDMv1][version](length);
}
function createRDMv0(length) {
	let result_str = [...Array(length)].map(c => utilsChars[Math.floor(Math.random() * utilsChars.length)]).join("");
	return result_str;
}
function createRDMv1(length) {
	const array = new Uint32Array(length);
	window.crypto.getRandomValues(array);
	let result_str = Array.from(array, v => utilsChars[v % utilsChars.length]).join("");;
	return result_str;
}

export default createRDM;