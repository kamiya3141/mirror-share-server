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

		return flag;
	}
};

[...document.getElementsByClassName("import-template-append")].forEach(c => {
	const temp_id_data = c.getAttribute("template-id-data");
	const temp_id_args = c.getAttribute("template-id-args").split(" ").map(arg => convertEnvVars(arg));
	c.appendChild(template_data_function_map[temp_id_data](...temp_id_args));
});

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