const getStringWithReplaceSplitWord = word => `-:-${word}-:-`;
const currentUrlParams = new URL(window.location.toString()).searchParams;
[
	{
		"word": "error-code",
		"function": (wd, val) => {
			wd = String(wd).toUpperCase();

			let ttl = document.title;
			document.title = ttl.replace(getStringWithReplaceSplitWord(wd), val);

			let ec_elem = document.getElementById("error-code-element");
			if (ec_elem)
				ec_elem.innerHTML = ec_elem.replace(getStringWithReplaceSplitWord(wd), val);
		}
	},
	{
		"word": "error-word",
		"function": (wd, val) => {
			wd = String(wd).toUpperCase();

			let ew_elem = document.getElementById("error-word-element");
			if (ew_elem)
				ew_elem.innerHTML = ew_elem.replace(getStringWithReplaceSplitWord(wd), val);
		}
	}
].forEach(err_key => {
	if (currentUrlParams.get(err_key["word"]))
		err_key["function"](err_key["word"], currentUrlParams.get(err_key["word"]));
});