const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function test0() {
	console.log("start-0");
	await sleep(3000);
	console.log("end-0");
}

console.log("start");
test0();
console.log("end");