async function test1() {
	console.log("start-0");
	await utilsSleep(3000);
	console.log("end-0");
}

console.log("start");
test1();
console.log("end");


class MyElement {
	constructor (element) {
		this.root = element;
		this.root.innerText = "Hello";
	}
}

document.querySelectorAll("myelement").forEach(element => new MyElement(element));