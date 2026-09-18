async function test0() {
	console.log("start-0");
	await utilsSleep(3000);
	console.log("end-0");
}

console.log("start");
test0();
console.log("end");

console.log(checkCurrentSystemThemeDark());