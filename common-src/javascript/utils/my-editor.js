/**
 * @typedef {Object} MyEditorsObject
 * @property {HTMLElement[]} __editors
 */

/** 
* @type {MyEditorsObject & {
*   readonly editors: HTMLElement[],
*   set editors(input: HTMLElement)
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
			editor.addEventListener("input", e => {
				const editorInnerHTML = String(e.target.innerHTML);
				const lineNumberLength = editorInnerHTML.replace(/\n$/, "").split("\n").length;
				if (true || lineNumber.getAttribute("data-mydef--editor--length--line-number") != String(lineNumberLength)) {
					lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
					lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
				}
			});
		});
	}
};

async function settingMyEditor() {
	const arr = [...document.querySelectorAll(`*[data-mydef--my-editor--parent-element]`)];
	if (arr.length < 1)
		return;
	arr.forEach(c => myEditorsObject["editors"] = c);
	myEditorsObject["setupEditors"]();
}

export { settingMyEditor };