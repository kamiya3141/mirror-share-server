async function localLoadedFunc_Test2() {
	const parent = document.querySelector("#root > #main-contents");

	const arr = new Array(10).fill(0).map(c => [rdmi(1, 6), createRDM(1, 16)]);
	arr.forEach(c => console.log(c));

	const result = createTOC(arr);
	parent.innerHTML += result;
}

function createTOC(_arr = [1, ""], main_name = "ul") {
	const main_element_name = main_name != "ol" ? "ul" : "ol";
	let m_n = 1;
	let res_str = `<${main_element_name}>`;
	_arr.forEach(([N, S], i, a) => {
		S = `<li>${S}</li>`;
		let b_S = `<${main_element_name}>`;
		let a_S = `</${main_element_name}>`;
		if (m_n == N) {
			b_S = "";
			a_S = "";
		} else if (m_n < N) {
			b_S = b_S.repeat(N - m_n);
			a_S = "";
		} else if (m_n > N) {
			b_S = a_S.repeat(m_n - N);
			a_S = "";
		}
		m_n = N;
		res_str += b_S + S + a_S;
	});
	res_str += `</${main_element_name}>`;
	return res_str;
}
window.addEventListener("load", () => localLoadedFunc_Test2());