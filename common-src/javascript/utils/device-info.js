class LocalStorageObject extends Object {
	#storageKey;
	#defaultValue;
	#saveLocalStorage;
	#AddFunctionsArraysObject;


	constructor (storageKey = `localstorage-data--${createRDM()}`, defaultValue = {}, saveLocalStorage_keyName = "") {
		super();

		this.#storageKey = storageKey;
		this.#defaultValue = defaultValue;
		this.#AddFunctionsArraysObject = {
			"save": [],
			"reset": [],
			"reload": [],
			"clear": []
		};
		this["saveLocalStorage_keyName"] = "";
		this["local--save--localstorage"] = true;
		this.setKeySaveLocalStorage(saveLocalStorage_keyName);


		const savedValue = localStorage.getItem(storageKey);

		if (savedValue === null) {
			this.reset(false);
			this.save(true);
			return;
		}

		try {
			const parsedValue = JSON.parse(savedValue);

			if (
				parsedValue === null ||
				typeof parsedValue !== "object" ||
				Array.isArray(parsedValue)
			) {
				throw new Error("保存データがObjectではありません");
			}

			Object.assign(this, parsedValue);
		} catch (error) {
			console.error(
				`LocalStorageの読み込みに失敗: ${storageKey}`,
				error
			);

			this.reset(false);
		}
		if (!this.get("saveLocalStorage_keyName"))
			this.setKeySaveLocalStorage("local--save--localstorage");
		this.save();
	}

	setKeySaveLocalStorage(key = "") {
		if (key.length > 0 && this.exist(key))
			this.set("saveLocalStorage_keyName", key);
	}

	exist(key) {
		return Object.hasOwn(this, key);
	}

	get(key) {
		if (this.exist(key))
			return this[key];
		else
			console.error(`function error: "LocalStorageObject.edit"\n\tマップ変数:thisに${key}というキーはありません\n${Object.entries(this).map(([k, v]) => (k + " : " + v)).join("\n")}`);
		return false;
	}

	set(key, value) {
		if (this.exist(key))
			this[key] = value;
		else
			console.error(`function error: "LocalStorageObject.edit"\n\tマップ変数:thisに${key}というキーはありません\n${Object.entries(this).map(([k, v]) => (k + " : " + v)).join("\n")}`);
		this.save();
	}

	reset(allowDisplayWarningMessage = true, msg = "") {
		if (allowDisplayWarningMessage)
			myAlertMessage(msg);

		Object.assign(this, this.#defaultValue);
	}

	save(force_save = false) {
		this.#saveLocalStorage = this[this.get("saveLocalStorage_keyName")];
		if (force_save || this.#saveLocalStorage)
			localStorage.setItem(
				this.#storageKey,
				JSON.stringify(this)
			);

	}

	reload() {
		const savedValue = localStorage.getItem(this.#storageKey);

		if (savedValue === null)
			return false;

		Object.assign(this, JSON.parse(savedValue));

		return true;
	}

	clear(allowDisplayWarningMessage = true, msg = "") {
		if (allowDisplayWarningMessage)
			myAlertMessage(msg);

		localStorage.removeItem(this.#storageKey);

		for (const key of Object.keys(this))
			delete this[key];
	}

	registerAddFunction(name = "", func) {
		if (Object.hasOwn(this.#AddFunctionsArraysObject, name))
			this.#AddFunctionsArraysObject[name].push(func);
	}

	execAddFunction(name = "") {
		if (Object.hasOwn(this.#AddFunctionsArraysObject, name))
			this.#AddFunctionsArraysObject[name].forEach(fn => fn());
	}
}


const origin_device = {
	"force-theme": false,
	"theme-type": "system",
	"force-device": false,
	"device-type": "device",
	"width": 0,
	"height": 0,
	"realWidth": 0,
	"realHeight": 0,
	"prefer-color": "#00ff00",
	"font-family": "note-sans-jp",
	"setting-display-init-item-index": "0",
	"allow--changing--device-mode--for--display-size": false,
	"allow--opening--setting-display--after--reload": false,
	"save--user-data--localstorage": false,
	"setting-display-open": false,
	"DEBUGMODE": false
};

const DeviceInformation = new LocalStorageObject("device-data", origin_device, "save--user-data--localstorage");
DeviceInformation.registerAddFunction("reset", () => document.dispatchEvent(new CustomEvent("setting-display-reload")));
DeviceInformation.registerAddFunction("reload", () => DeviceInformation.set("DEBUGMODE", origin_device["DEBUGMODE"]));

function getDeviceInformation(_key = "") {
	return DeviceInformation.get(_key);
}

function editDeviceInformation(_key = "", _value = null) {
	DeviceInformation.set(_key, _value);
}

function reloadDeviceInformation(add_msg = "") {

	if (add_msg == "init")
		DeviceInformation.reload();

	editDeviceInformation("width", Number(getCSSLengthValue("--myStylingWidth")));
	editDeviceInformation("height", Number(getCSSLengthValue("--myStylingHeight")));
	editDeviceInformation("realWidth", Number(getCSSLengthValue("--myStylingRealWidth")));
	editDeviceInformation("realHeight", Number(getCSSLengthValue("--myStylingRealHeight")));

	setThemeArgsHistoryObject["forceTheme"] = getDeviceInformation("force-theme");
	// edit の方に書くかは今後次第
	setThemeArgsHistoryObject["themeType"] = getDeviceInformation("force-theme") ? getDeviceInformation("theme-type") : checkCurrentSystemThemeString();


	setThemeArgsHistoryObject["forceDevice"] = getDeviceInformation("force-device");

	// edit の方に書くかは今後次第
	const _tf = Boolean(document.documentElement.getAttribute("data-my-device-type") == "mobile" ? (getDeviceInformation("realWidth") < getDeviceInformation("realHeight")) : (getDeviceInformation("width") < getDeviceInformation("height")));
	setThemeArgsHistoryObject["deviceType"] = getDeviceInformation("force-device") ? getDeviceInformation("device-type") : (getDeviceInformation("allow--changing--device-mode--for--display-size") ? checkCurrentDeviceString(_tf) : checkCurrentDeviceString());
	setThemeArgsHistoryObject["preferColor"] = getDeviceInformation("prefer-color");

	setThemeArgsHistoryObject["fontFamily"] = getCSSLengthValue(`--${getDeviceInformation("font-family")}`);

	setTheme(add_msg.length == 0 ? "reloadD" : add_msg);
}


// windowイベント設定
// tamura-first-load.js のresize-eventの実行をキャンセル
WINV["resize-event-cancel"] = true;
window.addEventListener("resize", e => {
	reloadDeviceInformation(`window.event.${e.type}`);
});

window.visualViewport.addEventListener("resize", e => {
	reloadDeviceInformation(`window.visualViewport.event.${e.type}`);
});

window.addEventListener("load", e => {
	reloadDeviceInformation(`window.event.${e.type}`);
});

// ここのdevice直接参照の部分は変更するな,DEBUGMODEの値は変えてもいい
useOldUserAgentDataValue = DeviceInformation.get("DEBUGMODE");

// "init" は消すな
reloadDeviceInformation("init");