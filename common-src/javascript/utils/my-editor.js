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
				<div class="utils--my-editor--line-number"></div>
			</div>
			<div class="utils--my-editor--editor--box">
				<div class="utils--my-editor--editor" contenteditable="true"></div>
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
				const lineNumberLength = e.target.textContent.split("\n");
				if (!lineNumber.hasAttribute("data-mydef--editor--length--line-number") || lineNumber.getAttribute("data-mydef--editor--length--line-number") != String(lineNumberLength)) {
					lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
					lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
				}
			});
		});
	}
};

async function settingMyEditor() {
	[...document.querySelectorAll("[data-mydef--my-editor--parent-element]")].forEach(c => myEditorsObject["editors"] = c);
	myEditorsObject["setupEditors"]();
}

export { settingMyEditor };