const template_data_function_map = {
	"display-template": (header_title = "title", contents = "", footer_title = "") => {
		const flag = cloneTemplate("display-template");
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
		flag.querySelector(".toggle_input").addEventListener("change", e => {
			const chk = e.target.checked;
			editDeviceInformation(device_setting_id, chk);
			toggleSwitchChangeEventAddFunction(device_setting_id, chk);
			reloadDeviceInformation("toggle-switch-template");
		});
		return flag;
	}
};

convertTemplateElement(document);

function toggleSwitchChangeEventAddFunction(key = "", tf = false) {
	const funcObj = {
		"force-theme": "setting-display--appearance--input-select--theme-setting",
		"force-device": "setting-display--appearance--input-select--device-mode-setting"
	};

	if (!Object.hasOwn(funcObj, key)) {
		console.error(`キー名: ${key}は設定されたオブジェクトに存在しません`);
		return;
	}
	const __target_id = funcObj[key];
	// document.getElementById(__target_id).setAttribute("data-mydef-set-by-script", "true");
	if (tf)
		document.getElementById(__target_id).disabled = false;
	else
		document.getElementById(__target_id).disabled = true;
}

function convertTemplateElement(elem = document) {
	[...elem.querySelectorAll(".import-template-append")].forEach(c => {
		const temp_id_data = c.getAttribute("template-id-data");
		const temp_id_args = c.getAttribute("template-id-args").split(" ").map(arg => convertEnvVars(arg));
		c.appendChild(template_data_function_map[temp_id_data](...temp_id_args));
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
