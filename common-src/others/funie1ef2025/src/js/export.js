export const ONE_SEC = 1000;
export const FPS = 60;
export const ADD_M_SEC = ONE_SEC / FPS;
export const GLOBAL_OBJ = {
	"STOP_ANIMATION": false,
	"LOADED_DATA_STATUS_ARRAY": [],
	"LOADED_FINISH": false
};
export * from "./utils/Utils-Base.js";
export * from "./utils/Utils-Easing.js";
export * from "./utils/Utils-Time.js";
export * from "./class/Easing.js";
export * from "./class/Manager/SceneManager.js";
export * from "./class/Manager/EasingManager.js";