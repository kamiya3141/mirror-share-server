const template_data_function_map = {
	"display-template": (header_title = "title", contents = "", footer_title = "", closed_button = true) => {
		const flag = cloneTemplate("display-template");
		flag.querySelector(".display-item-box").setAttribute("data-mydef--display-template--allow-exist-closed-button", String(closed_button));
		flag.querySelector(".header-text").textContent = header_title;
		flag.querySelector(".footer-text").textContent = footer_title;
		const main_contents = flag.querySelector(".main-contents");
		if (typeof contents == "string")
			main_contents.innerHTML = contents;
		else
			main_contents.appendChild(contents);

		convertTemplateElement(main_contents);

		return flag;
	},
	"toggle-switch-template": device_setting_id => {
		const flag = cloneTemplate("toggle-switch-template");
		flag.querySelector(".toggle_input").addEventListener("change", async e => {
			if (!get_SetByScript(e.target)) {
				const chk = e.target.checked;
				editDeviceInformation(device_setting_id, chk);
				await toggleSwitchChangeEventAddFunction(device_setting_id, chk, e.target);
				reloadDeviceInformation("toggle-switch-template");
			}
			edit_SetByScript(e.target, false);
		});
		return flag;
	}
};

convertTemplateElement(document);

function toggleSwitchCancelFunction(elem, tf = null) {
	edit_SetByScript(elem, true);
	elem.checked = Boolean(tf == null ? !elem.checked : tf);
}

async function toggleSwitchChangeEventAddFunction(key = "", tf = false, elem) {
	const funcObj = {
		"force-theme": async __tf => {
			const ___el = document.getElementById("setting-display--appearance--input-select--theme-setting");
			___el.disabled = !__tf;
			___el.value = getDeviceInformation("theme-type");
		},
		"force-device": async __tf => {
			const ___el = document.getElementById("setting-display--appearance--input-select--device-mode-setting");
			___el.disabled = !__tf;
			___el.value = getDeviceInformation("device-type");
		},
		"allow--changing--device-mode--for--display-size": async __tf => {
			if (!__tf) {
				const res = await myConfirmMessage("OFFにすると\n表示が崩れる場合がございます。\nよろしいですか？");
				if (!res) {
					editDeviceInformation(key, !res);
					toggleSwitchCancelFunction(elem);
				}
			}
		},
		"save--user-data--localstorage": async __tf => {
			if (!__tf) {
				const res = await myConfirmMessage("この操作を完了すると\nユーザデータは削除されます。\n\n本当によろしいですか？");
				if (res)
					removeDeviceInformationData();
				else {
					editDeviceInformation(key, !res);
					toggleSwitchCancelFunction(elem);
					myAlertMessage("初期化を中止しました。");
				}
			} else {
				syncDeviceDataForLocalStorage();
				document.dispatchEvent(new CustomEvent("setting-display-reload"));
			}
		}
	};

	if (Object.hasOwn(funcObj, key))
		await funcObj[key](tf);

}

function convertTemplateElement(elem = document) {
	[...elem.querySelectorAll(".import-template-append")].forEach(c => {
		const temp_id_data = c.getAttribute("template-id-data");
		const temp_id_args = c.getAttribute("template-id-args").split(" ").map(arg => convertEnvVars(arg));
		if (Object.hasOwn(template_data_function_map, temp_id_data))
			c.appendChild(template_data_function_map[temp_id_data](...temp_id_args));
		else if (document.querySelector(`#${temp_id_data}`) != null)
			c.appendChild(cloneTemplate(temp_id_data));
	});
}

function convertEnvVars(input_var = "") {
	const reg = new RegExp("%_(.*?):(.*?)");
	if (reg.test(input_var)) {
		const res_arr = input_var.replace(reg, "$1 $2").split(" ");
		switch (res_arr[0]) {
			case "ID":
				input_var = document.getElementById(res_arr[1]);
				break;
			case "CLASS":
				input_var = document.getElementsByClassName(res_arr[1])[0];
				break;
			case "QUERY":
				input_var = document.querySelector(res_arr[1]);
				break;
			default:
				break;
		}
		input_var = cloneTemplate(input_var, true);
	}
	return input_var;
}

function cloneTemplate(input, not_id = false) {
	const template = (not_id ? input : document.getElementById(input));
	const flag = template.content.cloneNode(true);
	return flag;
}

function switchingOpenDisplay(elem, forceStatusValue = false, inputData = "auto") {
	const attr_name = "data-display-open";
	let data_is_true = getOpenDisplayStatus(elem);
	if (forceStatusValue) {
		if (inputData == "true" || inputData == true)
			data_is_true = true;
		else if (inputData == "false" || inputData == false)
			data_is_true = false;
		else {
			console.error("inputDataがtrue, false以外だったので、強制的にfalseにしました。");
			data_is_true = false;
		}
	}
	if (!get_SetByScript(elem))
		elem.setAttribute(attr_name, (data_is_true ? "false" : "true"));
	edit_SetByScript(elem, false);
	return !data_is_true;
}

function getOpenDisplayStatus(elem) {
	const attr_name = "data-display-open";
	const data = elem.getAttribute(attr_name);
	return Boolean(data == "true");
}