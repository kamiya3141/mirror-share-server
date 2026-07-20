function reloadWindowInfo() {
	const _br = "<br>";
	const __joinning_str = " | ";

	let _arr = [
		[
			`doc.doc-el.wh${_br}`,
			document.documentElement.clientWidth,
			document.documentElement.clientHeight
		],
		[
			`win.scr.wh${_br}`,
			window.screen.width,
			window.screen.height
		],
		[
			`win.visvwpt.wh${_br}`,
			Math.floor(window.visualViewport.width),
			Math.floor(window.visualViewport.height)
		],
		[
			`mydef.real.wh${_br}`,
			getCSSLengthValue("--myStylingRealWidth"),
			getCSSLengthValue("--myStylingRealHeight")
		],

		[
			`Using Device${_br}`,
			"Device",
			checkCurrentDeviceMobile() ? "Mobile" : "PC"
		],
		[
			`User Agent${_br}`,
			"Data",
			navigator.userAgent
		]
	];

	console.log(typeof _arr[0][1], _arr[0][1], typeof _arr[2][1], _arr[2][1], typeof _arr[1][1], _arr[1][1]);

	const _pushed_idx = Number(Boolean(_arr[1][1] == _arr[2][1]));
	_arr.push([_br + _br + `${_arr[3][0]} = ${_arr[_pushed_idx][0]}`.replace(_br, "")]);
	// この繋げ方は思いついたとき、最高な気分になった
	document.querySelector("div#div-box").innerHTML = `<div>${_arr.map((c, i, a) => c.join(__joinning_str) + `${(i + 1) < a.length ? __joinning_str : ""}${_br}${_br}`).join("</div><div>")}</div>`;
	
}

window.addEventListener("resize", () => {
	reloadWindowInfo();
});

reloadWindowInfo();