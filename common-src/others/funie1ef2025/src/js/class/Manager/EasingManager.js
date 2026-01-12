import * as EM from "./../../export.js";
/**
 * @summary EasingManagerクラスは代表的なイージング関数や独自のイージング関数を管理するためのクラス
 */
export class EasingManager {
	constructor() {
		this.easingArray = [];
	}
	addEasing(addedEasingDataArray = [["", [0, 0, 1, 1], [0, 1]]]) {
		const filteredArray = addedEasingDataArray.filter(c => (!EasingManager.#RegistedName(c[0]) || c[1].length != 4 || c[2].length != 2))
		if (filteredArray.length > 0)
			EM.ConsoleError(`${filteredArray}`);
		this.easingArray.push(...addedEasingDataArray.map(c => EM.createEaseDataRObj(EM.createEaseDataObj(c[0], new EM.Easing(...c[1])), ...c[2])));
	}
	static EasingFunctionObject = {
		"linear": EM.createEaseDataObj("linear", new EM.Easing(0, 0, 1, 1)),
		"ease": EM.createEaseDataObj("ease", new EM.Easing(0.25, 0.1, 0.25, 1)),
		"ease-in": EM.createEaseDataObj("ease-in", new EM.Easing(0.42, 0, 1, 1)),
		"ease-out": EM.createEaseDataObj("ease-out", new EM.Easing(0, 0, 0.58, 1)),
		"ease-in-out": EM.createEaseDataObj("ease-in-out", new EM.Easing(0.42, 0, 0.58, 1))
	};
	static #RegistedName(name = "") {
		if (!EM.tp(name, "string"))
			EM.ConsoleError(`name: ${name}`);
		return Boolean(Object.keys(EasingManager.EasingFunctionObject).includes(name));
	}
	static regist(name = "", easingClassInitArray = [0, 0, 1, 1]) {
		const corrected = Boolean(!EasingManager.#RegistedName(name) && Array.isArray(easingClassInitArray) && easingClassInitArray.length == 4);
		if (corrected)
			EasingManager.EasingFunctionObject[name] = EM.createEaseDataObj(name, new EM.Easing(...easingClassInitArray));
		return corrected;
	}
}