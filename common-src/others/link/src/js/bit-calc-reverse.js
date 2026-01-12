
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

console.log(appaerNumberToBinary(input_number, input_log_bit_len), appaerNumberToBinary(res, input_log_bit_len));