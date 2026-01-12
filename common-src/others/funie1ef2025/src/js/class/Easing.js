import * as EM from "./../export.js";
/**
 * @summary Easingクラスは設定された2つの中継地点の値をもとに数値補完をして
 * 時刻t(0~1)の時の進捗値を計算するためのクラス
 */
export class Easing {
	constructor(x1, y1, x2, y2) {
		this.myEasing = EM.createEasePosArr(x1, y1, x2, y2);
	}

	calcPosition(t = 0) {
		if (!EM.tpn(t) || t < 0 || t > 1 || Number.isInteger(t))
			return (console.error(`Invalid Value: Easing class :: calcPosition -> t: ${t}`), null);
		const px = this.myEasing["x"];
		const py = this.myEasing["y"];
		const x = (((1 - t) ** 3) * px[0]) + ((3 * (1 - t) ** 2) * t * px[1]) + (3 * (1 - t) * t ** 2) * px[2] + ((t ** 3) * px[3]);
		const y = (((1 - t) ** 3) * py[0]) + ((3 * (1 - t) ** 2) * t * py[1]) + (3 * (1 - t) * t ** 2) * py[2] + ((t ** 3) * py[3]);
		return EM.createXY(x, y);
	}
	/**
	 * 
	 * @param {number} t 
	 * @returns {number}
	 */
	progress(t = 0) {
		const progress = this.calcPosition(t);
		return progress["y"];
	}
}