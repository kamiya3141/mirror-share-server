async function test1() {
	console.log("start-0");
	await utilsSleep(1000);
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

document.querySelectorAll(".test-section--class").forEach((el, i) => el.insertAdjacentHTML(["beforebegin", "afterbegin", "beforeend", "afterend"][i], createAnyElement("div", { innerHTML: `div--${i}` }).outerHTML));
console.log(document.querySelectorAll(".test-section--class")[0].firstElementChild.innerHTML);