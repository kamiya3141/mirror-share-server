import * as EM from "./../export.js";

/**
 * 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @returns {object}
 */
function createEasingPointArray(x1, y1, x2, y2) {
	const returnArray = EM.createXYArray([0, x1, x2, 1], [0, y1, y2, 1]);
	return returnArray;
}

/**
 * 
 * @param {string} name 
 * @param {EM.Easing} easingClass 
 * @returns {object}
 */
function createEasingDataObject(name = "", easingClass = new Object()) {
	const returnObject = {
		"name": name,
		"easing": easingClass
	};
	return returnObject;
}

function createEasingDataWithRangeObject(var_createEasingDataObject = createEasingDataObject(), min = 0, max = 1) {
	const returnObject = var_createEasingDataObject();
	if (!tpn(min) || !tpn(max) || min > max)
		EM.ConsoleError(`min: ${min}, max: ${max}`);
	returnObject["min"] = min;
	returnObject["max"] = max;
	return returnObject;
}

function getEasingProgress(obj = createEasingDataWithRangeObject(), t_num = 0.5) {
	if (!EM.tp(obj, "object") || !["easing", "min", "max"].some(c => Object.hasOwn(obj, c)) || !EM.constrain(t_num, obj["min"], obj["max"], false))
		EM.ConsoleError(`obj: ${obj}, t_num: ${t_num}`);
	const t_nnum = EM.num2nnum(t_num, obj["min"], obj["max"]);
	const p_num = EM.nnum2num(obj["easing"].progress(t_nnum), obj["min"], obj["max"]);
	return p_num;
}

export { createEasingPointArray as createEasePosArr, createEasingDataObject as createEaseDataObj, createEasingDataWithRangeObject as createEaseDataRObj, getEasingProgress as calcNumEaseProgress };