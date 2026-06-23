const sel = document.createElement("select");
sel.id = "abc";
new Array(15).fill("asd").map((c, i) => c + i).forEach(c => {
	const opt = document.createElement("option");
	opt.value = c;
	opt.textContent = c;
	sel.appendChild(opt);
});
document.body.appendChild(sel);

sel.addEventListener("change", e => {
	console.log(e.currentTarget.value);
});

const myObj = new Object({
	__name: "abc",
	__number: 0,
	get "name"() {
		return String(this.__name);
	},
	set "name"(input) {
		if (typeof input == "string")
			this.__name = String(input);
		else
			console.error(`入力しようとしている数値がおかしいです\n--- name setter error ---\n${(typeof input)}`);
		return this.__name;
	},
	get number() {
		return Number(this.__number);
	},
	set number(input) {
		if (typeof input == "number")
			this.__number = Number(input);
		else
			console.error(`入力しようとしている数値がおかしいです\n--- number setter error ---\n${(typeof input)}`);
		return this.__number;
	}
});

function deepCopy(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	if (obj instanceof HTMLElement) {
		return obj;
	}
	const copy = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}
	return copy;
}

const obj1 = {
	"a": "a1",
	"b": "b1",
	"c": "c1"
};
const obj2 = deepCopy(obj1);
Object.entries(obj2).forEach(([k, v]) => obj2[k] = `${k}2`);
obj2["d"] = "d2";

Object.entries(obj2).forEach(([k, v]) => obj1[k] = Object.hasOwn(obj1, k) ? obj1[k] : v);

function parseObj(_obj = {}) {
	return Object.entries(_obj).map(c => c.join(" : ")).join(", ") + "\n";
}

console.log(parseObj(obj1), parseObj(obj2));

console.clear();

/*

function appaerNumberToBinary(num, log_bit_len = 16) {
	return num.toString(2).padStart(log_bit_len, "0")
}

function bit_reverse(num, bit_len) {
	const arr = [0x55555555, 0x33333333, 0x0f0f0f0f, 0x00ff00ff, 0x0000ffff];
	let n = num;
	arr.forEach((v, i) => n = ((n & v) << (2 ** i) | (n >> (2 ** i) & v)));
	return (n >>> ((2 ** arr.length) - bit_len));
}

const input_number = 0b101011;
const input_bit_len = input_number.toString(2).length;
const input_log_bit_len = 8;
const res = bit_reverse(input_number, input_bit_len);

console.log("", appaerNumberToBinary(input_number, input_log_bit_len), appaerNumberToBinary(res, input_log_bit_len));
*/
/*
let test_url = new URL("https://tso.tshuto.com/abc?id=abcasd");
let test_ptn = /<a href="(https*:.*)">(.*?)<\/a>/g;
let test_ptn2 = /(https*:.*)/g;

const test_str = `https://abc.com`;
// <a href="https://abc.com">def</a>
const test_result = [...test_str.matchAll(test_ptn2)];

test_result.forEach(v => {
	console.log(v[1]);
});
*/
/*
const test_str = `[abcdef](https://abc-cdm.com?aaa=a1&bbb=b2)`;

const test_ptn = /\[["'`]?(.*?)["'`]?\]\((https?:\/\/[a-zA-Z0-9:%&?=.-]+)\s?["'`]?(.*?)["'`]?\)/g;

[...test_str.matchAll(test_ptn)].forEach(chv => chv.forEach(chv2 => console.log(chv2 ? chv2 : false)));

*/