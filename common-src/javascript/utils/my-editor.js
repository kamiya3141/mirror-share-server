/**
 * @typedef {Object} MyEditorsObject
 * @property {HTMLElement[]} __editors
 */

/** 
* @type {MyEditorsObject & {
*   readonly editors: HTMLElement[],
*   set editors(input: HTMLElement)
*	readonly values: string[]
*	insertText: function(): string
*	setupEditors: function(): void
* }}
*/
const myEditorsObject = {
	"__editors": [],
	get "editors"() {
		return this["__editors"];
	},
	set "editors"(input) {
		const editor_div_element = document.createElement("div");
		editor_div_element.classList.add("utils--my-editor--root");
		editor_div_element.innerHTML = `
		<div class="utils--my-editor--main-contents-box">
			<div class="utils--my-editor--line-number--box">
				<div class="utils--my-editor--line-number" data-mydef--editor--length--line-number="1">
					<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="1">1</div>
				</div>
			</div>
			<div class="utils--my-editor--editor--box">
				<div class="utils--my-editor--editor" contenteditable="plaintext-only" tabindex="0">\n</div>
			</div>
		</div>
		`;
		input.appendChild(editor_div_element);
		this["__editors"].push(editor_div_element);
	},
	"setupEditors": function () {
		const my_editor_style_link = document.createElement("link");
		my_editor_style_link.setAttribute("rel", "stylesheet");
		my_editor_style_link.setAttribute("href", `${CREATE_MY_DOMAIN_URL("css")}/utils/my-editor.css`);
		document.head.insertAdjacentElement("afterend", my_editor_style_link);
		this["__editors"].forEach(c => {
			const lineNumber = c.querySelector(".utils--my-editor--line-number");
			const editor = c.querySelector(".utils--my-editor--editor");
			/*
			editor.addEventListener("input", e => {
				const editorInnerText = String(e.target.innerText);
				const lineNumberLength = editorInnerText.replace(/\n$/, "").split("\n").length;
				if (true || lineNumber.getAttribute("data-mydef--editor--length--line-number") != String(lineNumberLength)) {
					lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
					lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
				}
			});
			*/
			editor.addEventListener("keydown", e => {
				let editorInnerText = String(e.target.innerText);
				// エディターで使用するための特殊なキー
				const key_object = {
					"Tab": {
						"str": "\t",
						"func": (key = "", str = "") => {
							const win_sel = window.getSelection();
							const win_range = win_sel.getRangeAt(0);
							const win_rg_start = win_range.startOffset;
							const win_rg_end = win_range.endOffset;
							const range_text = win_range.cloneContents().textContent;
							if (range_text.length)
								e.target.innerText = editorInnerText.slice(0, win_rg_start) + range_text.split("\n").map(c => `${str}${c}`).join("\n") + editorInnerText.slice(win_rg_end);
							else
								e.target.innerText = myEditorsObject["insertText"](editorInnerText, str, win_rg_start);
						}
					}
				};
				Object.keys(key_object).forEach(c => {
					if (c != e.key)
						return;
					e.preventDefault();
					key_object[c]["func"](c, key_object[c]["str"]);
				});
				// 行数調整
				editorInnerText = String(e.target.innerText);
				const lineNumberLength = editorInnerText.replace(/\n$/, "").split("\n").length;
				if (true || lineNumber.getAttribute("data-mydef--editor--length--line-number") != String(lineNumberLength)) {
					lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
					lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
				}
			});
		});
	},
	get "values"() {
		return new Array(this["__editors"].length).map((c, i) => this["__editors"][i].innerText);
	},
	"insertText": function (text = "", input = "", start = 0) {
		return text.slice(0, start) + input + text.slice(start);
	}
};

document.addEventListener('mouseup', () => {
	const selection = window.getSelection();
	const range = selection.getRangeAt(0);
	const start = range.startOffset;
	const text = range.cloneContents().textContent;
	console.log(text.split(start));
});

async function settingMyEditor() {
	const arr = [...document.querySelectorAll(`*[data-mydef--my-editor--parent-element]`)];
	if (arr.length < 1)
		return;
	arr.forEach(c => myEditorsObject["editors"] = c);
	myEditorsObject["setupEditors"]();
}

export { settingMyEditor };