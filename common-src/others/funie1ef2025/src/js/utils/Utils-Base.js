import * as EM from "./../export.js";

function ValueInRange(n = 1, min = 0, max = 2, force_arrange = true) {
	if (force_arrange) {
		if (n < min)
			n = min;
		else if (n > max)
			n = max;
	}
	return force_arrange ? n : Boolean(n >= min && n <= max);
}

function ConsoleError(...args) {
	console.error(`Invalid Value.\n${args.join(" :: ")}`);
}

function ObjectDeepCopy(obj = new Object()) {
	if (obj === null || !EM.tp(obj, "object"))
		return obj;
	if (obj instanceof HTMLElement)
		return obj;
	const copy = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}
	return copy;
}

function CreateXYPositionArrayObject(_x = [], _y = []) {
	const returnObject = {
		"x": [],
		"y": []
	};
	returnObject["x"].push(..._x);
	returnObject["y"].push(..._y);
	return returnObject;
}

function CreateXYPositionObject(_x = 0, _y = 0) {
	const returnObject = {
		"___x": 0,
		"___y": 0,
		get "x"() {
			return this["___x"];
		},
		set "x"(input) {
			if (EM.tpn(input))
				this["___x"] = Number(input);
			else
				ConsoleError("set x", `x: ${input}`);
		},
		get "y"() {
			return this["___y"];
		},
		set "y"(input) {
			if (EM.tpn(input))
				this["___y"] = Number(input);
			else
				ConsoleError("set y", `y: ${input}`);
		}
	};
	returnObject["x"] = _x;
	returnObject["y"] = _y;
	return returnObject;
}

export { ValueInRange as constrain, ConsoleError, ObjectDeepCopy as deepCopy, CreateXYPositionObject as createXY, CreateXYPositionArrayObject as createXYArray };