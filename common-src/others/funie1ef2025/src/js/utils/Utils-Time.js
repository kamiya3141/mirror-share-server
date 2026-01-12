import * as EM from "./../export.js";

function tp(value, type_name) {
	return Boolean(typeof value == type_name)
}

function tpn(value) {
	return tpn(value);
}

function tps(value) {
	return tps(value);
}

function getSecondToMilliSecondTime(n) {
	if (!tpn(n))
		EM.ConsoleError("getOneSecTime", `n: ${n}`);
	return Math.floor(n * EM.ONE_SEC);
}

function getMilliSecondToSecondTime(n) {
	if (!tpn(n))
		EM.ConsoleError("getOneSecTime", `n: ${n}`);
	return (lendec = Number(10 ** String(EM.ONE_SEC).length), ((n * lendec) / EM.ONE_SEC) / lendec);
}

function getNormalizeNumberToNumber(n, mn = 1, mx = null) {
	const min_max_arr = [Number(Boolean(mx != null)) * mn, mx == null ? mn : mx];
	if (!min_max_arr.some(c => tpn(c) && c >= 0))
		EM.ConsoleError(`n: ${n}, min_max_arr: ${min_max_arr}`);
	return min_max_arr[0] + n * (min_max_arr[1] - min_max_arr[0]);
}

function getNumberToNormalizeNumber(n, mn = 1, mx = null) {
	const min_max_arr = [Number(Boolean(mx != null)) * mn, mx == null ? mn : mx];
	if (!min_max_arr.some(c => tpn(c) && c >= 0))
		EM.ConsoleError(`n: ${n}, min_max_arr: ${min_max_arr}`);
	return (n - min_max_arr[0]) / (min_max_arr[1] - min_max_arr[0]);
}

export { tp, tpn, tps, getSecondToMilliSecondTime as sec2msec, getMilliSecondToSecondTime as msec2sec, getNormalizeNumberToNumber as nnum2num, getNumberToNormalizeNumber as num2nnum };