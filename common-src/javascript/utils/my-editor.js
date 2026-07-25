/**
 * @typedef {Object} MyEditorsObject
 * @property {HTMLElement[]} __editors
* @property {function(string)[]} __inputFunc
 */

/** 
* @type {MyEditorsObject & {
*   readonly editors: HTMLElement[],
*   set editors,
*	readonly values: string[],
*	set values,
*	registInputFunc: function(): void,
*	removeInputFunc: function(): void,
*	setupEditors: function(): void,
*	setCursorPosition: function(): void,
*	getEditorRange: function(): Range|null,
*	replaceRange: function(): void,
*	getCaretOffset: function(): number,
*	getCurrentLineString: function(): string
* }}
*/
const myEditorsObject = {
	"__editors": [],
	"__inputFunc": [],
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

			editor.addEventListener("input", async e => {
				const editorInnerText = String(e.target.innerText);
				const lineNumberLength = editorInnerText.replace(/\n$/, "").split("\n").length;
				lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
				lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
				// input時に呼び出される外部からくわえられた関数
				this["__inputFunc"].forEach(async obj => await obj[Object.keys(obj)[0]](editorInnerText));
			});

			editor.addEventListener("keydown", async e => {
				// エディターで使用するための特殊なキー
				const key_object = {
					"Tab": {
						"str": "\t",
						"func": (e, key = "", str = "") => {
							const range = myEditorsObject["getEditorRange"](e.target);
							if (e.shiftKey) {
								let input_str = range.toString().split("\n").map(c => c.replace(/^\t|^ {1,4}/, "")).join("\n");
								if (range.collapsed)
									input_str = myEditorsObject["getCurrentLineString"](e.target);
								myEditorsObject["replaceRange"](range, input_str, !range.collapsed);
							} else {
								let input_str = range.toString().split("\n").map(c => str + c).join("\n");
								if (range.collapsed)
									input_str = str;
								myEditorsObject["replaceRange"](range, input_str, !range.collapsed);
							}
						}
					}
				};
				Object.keys(key_object).forEach(c => {
					if (c != e.key)
						return;
					e.preventDefault();
					key_object[c]["func"](e, c, key_object[c]["str"]);
				});
			});
		});
	},
	set "values"(input_arr = []) {
		this["__editors"][input_arr[0]].querySelector(".utils--my-editor--editor").innerText = input_arr[1];
	},
	get "values"() {
		return new Array(this["__editors"].length).map((c, i) => this["__editors"][i].innerText);
	},
	"registInputFunc": function (key = "", value = () => null) {
		if (Object.hasOwn(this["__inputFunc"], key))
			console.error(`inputFuncにはすでに${key}が存在します`);
		else {
			const obj = {};
			obj[key] = value;
			this["__inputFunc"].push(obj);
		}
	},
	"removeInputFunc": function (key = "") {
		if (!Object.hasOwn(this["__inputFunc"], key))
			console.error(`inputFuncには${key}が存在しません`);
		else
			delete this["__inputFunc"][key];
	},
	"setCursorPosition": function (el = new HTMLElement(), index = 0) {
		const range = document.createRange();
		const sel = window.getSelection();

		const textNode = el.firstChild;

		range.setStart(textNode, index);
		range.setEnd(textNode, index);

		sel.removeAllRanges();
		sel.addRange(range);
	},
	"getEditorRange": function (editor) {
		const sel = window.getSelection();
		if (!sel.rangeCount)
			return null;
		const range = sel.getRangeAt(0);
		if (!editor.contains(range.commonAncestorContainer))
			return null;
		return range;
	},
	"replaceRange": function (range, text, select = false) {
		range.deleteContents();

		const node = document.createTextNode(text);

		range.insertNode(node);

		if (select)
			range.selectNode(node);
		else {
			range.setStartAfter(node);
			range.collapse(true);
		}

		const sel = window.getSelection();

		sel.removeAllRanges();
		sel.addRange(range);
	},
	"getCaretOffset": function (editor) {
		const sel = window.getSelection();
		if (!sel.rangeCount) return 0;

		const range = sel.getRangeAt(0);

		const preRange = range.cloneRange();
		preRange.selectNodeContents(editor);
		preRange.setEnd(range.startContainer, range.startOffset);

		return preRange.toString().length;
	},
	"getCurrentLineString": function (editor) {
		const text = editor.innerText;
		const offset = this["getCaretOffset"](editor);

		const lineStart = text.lastIndexOf("\n", offset - 1) + 1;
		const lineEnd = text.indexOf("\n", offset);

		return text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
	}
};

async function settingMyEditor() {
	const arr = [...document.querySelectorAll(`*[data-mydef--my-editor--parent-element]`)];
	if (arr.length < 1)
		return;
	arr.forEach(c => myEditorsObject["editors"] = c);
	myEditorsObject["setupEditors"]();
}

export { settingMyEditor, myEditorsObject };