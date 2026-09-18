class LocalStorageObject extends Object {
	#storageKey;
	#saveLocalStorage;

	constructor (storageKey = `localstorage-data--${createRDM()}`, defaultValue = {}, saveLocalStorage_keyName = "") {
		super();

		this.#storageKey = storageKey;
		this["saveLocalStorage_keyName"] = "";
		this["local--save--localstorage"] = true;
		this.setKeySaveLocalStorage(saveLocalStorage_keyName);


		const savedValue = localStorage.getItem(storageKey);

		if (savedValue === null) {
			Object.assign(this, defaultValue);
			this.save();
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

			Object.assign(this, defaultValue);
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

	save() {
		this.#saveLocalStorage = this[this.get("saveLocalStorage_keyName")];
		if (this.#saveLocalStorage)
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

	clear() {
		localStorage.removeItem(this.#storageKey);

		for (const key of Object.keys(this))
			delete this[key];
	}
}