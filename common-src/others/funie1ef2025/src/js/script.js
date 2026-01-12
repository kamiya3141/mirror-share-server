import * as EM from "./export.js";

window.addEventListener("load", () => {
	setup();
	exec(EM.GLOBAL_OBJ["STOP_ANIMATION"]);
});

function setup() {
	// createCanvas(getCSSLengthValue("--myStylingWidth"), getCSSLengthValue("--myStylingHeight"));
	createCanvas(1366, 768);
	background(220);
	const idx = EM.GLOBAL_OBJ["LOADED_DATA_STATUS_ARRAY"].push(false);
	EM.GLOBAL_OBJ["LOADED_DATA_STATUS_ARRAY"][idx] = true;
}

function exec(stop_animation = EM.GLOBAL_OBJ["STOP_ANIMATION"]) {
	if (!EM.GLOBAL_OBJ["LOADED_FINISH"])
		EM.GLOBAL_OBJ["LOADED_FINISH"] = EM.GLOBAL_OBJ["LOADED_DATA_STATUS_ARRAY"].some(bool_v => Boolean(bool_v));
	if (!EM.GLOBAL_OBJ["STOP_ANIMATION"] && EM.GLOBAL_OBJ["LOADED_FINISH"])
		draw();
	window.setTimeout(() => {
		exec(EM.GLOBAL_OBJ["STOP_ANIMATION"]);
	}, ((1000 / EM.FPS) * (1000 / EM.ONE_SEC)));
}

function draw() {
	background(220);

}