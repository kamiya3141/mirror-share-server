/**
 * @typedef {Object} MyEditorsObject
 * @property {HTMLElement[]} __editors
 * @property {function(string)[]} __inputFunc
 * @property {WeakMap<HTMLElement,Range>} __ranges
 */

/** 
* @type {MyEditorsObject & {
*   readonly editors: HTMLElement[],
*   set editors,
*	readonly values: string[],
*	set values,
*	redesignLineNumber: function(): void,
*	registSubContentsButton: function(): void,
*	removeSubContentsButton: function(): void,
*	registInputFunc: function(): void,
*	removeInputFunc: function(): void,
*	setupEditors: function(): void,
*	getEditorRange: function(): Range|null,
*	wrapSelection: function(): void,
*	replaceRange: function(): void,
*	getCaretOffset: function(): number,
*	getCurrentLineString: function(): string
* }}
*/
const myEditorsObject = {
	"__editors": [],
	"__inputFunc": {},
	"__ranges": new WeakMap(),
	get "editors"() {
		return this["__editors"];
	},
	set "editors"(input) {
		const editor_div_element = document.createElement("div");
		editor_div_element.classList.add("utils--my-editor--root");
		editor_div_element.innerHTML = `
		<div class="utils--my-editor--main-contents-box">
			<div class="utils--my-editor--main-contents">
				<div class="utils--my-editor--line-number--box">
					<div class="utils--my-editor--line-number" data-mydef--editor--length--line-number="1">
						<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="1">1</div>
					</div>
				</div>
				<div class="utils--my-editor--editor--box">
					<div class="utils--my-editor--editor" contenteditable="plaintext-only" tabindex="0">\n</div>
				</div>
			</div>
		</div>
		<div class="utils--my-editor--sub-contents-box">
			<div class="utils--my-editor--sub-contents"></div>
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

			editor.addEventListener("input", async e => this["redesignLineNumber"](c));
			editor.addEventListener("click", async e => this["saveEditorsRange"](editor));
			editor.addEventListener("keydown", async e => this["saveEditorsRange"](editor));
			editor.addEventListener("keydown", async e => {
				// エディターで使用するための特殊なキー
				const key_object = {
					"Tab": {
						"str": "\t",
						"func": (e, key = "", str = "") => {
							const range = this["getEditorRange"](e.target);
							if (e.shiftKey) {
								let input_str = range.toString().split("\n").map(c => c.replace(/^\t|^ {1,4}/, "")).join("\n");
								if (range.collapsed)
									input_str = this["getCurrentLineString"](e.target);
								this["replaceRange"](range, input_str, !range.collapsed);
							} else {
								let input_str = range.toString().split("\n").map(c => str + c).join("\n");
								if (range.collapsed)
									input_str = str;
								this["replaceRange"](range, input_str, !range.collapsed);
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
	"redesignLineNumber": function (parent) {
		const lineNumber = parent.querySelector(".utils--my-editor--line-number");
		const editor = parent.querySelector(".utils--my-editor--editor");
		const editorInnerText = String(editor.innerText);
		const lineNumberLength = editorInnerText.replace(/\n$/, "").split("\n").length;
		lineNumber.setAttribute("data-mydef--editor--length--line-number", lineNumberLength);
		lineNumber.innerHTML = Array.from({ "length": lineNumberLength }, (_, i) => `<div class="utils--my-editor--line-number--line-number" data-mydef--my-editor--line-number="${i + 1}">${i + 1}</div>`).join("");
		// input時に呼び出される外部から加えられた関数
		Object.values(this["__inputFunc"]).forEach(async func => await func(editorInnerText));
	},
	"saveEditorsRange": function (editor) {
		this["__ranges"].set(editor, this["getEditorRange"](editor));
	},
	set "values"(input_arr = []) {
		this["__editors"][input_arr[0]].querySelector(".utils--my-editor--editor").innerText = input_arr[1];
		this["redesignLineNumber"](this["__editors"][input_arr[0]]);
	},
	get "values"() {
		return this["__editors"].map(c => c.querySelector(".utils--my-editor--editor").innerText);
	},
	"registInputFunc": function (key = "", func) {
		this["__inputFunc"][key] = func;
	},
	"removeInputFunc": function (key = "") {
		if (!Object.hasOwn(this["__inputFunc"], key))
			console.error(`inputFuncには${key}が存在しません`);
		else
			delete this["__inputFunc"][key];
	},
	"registSubContentsButton": function (editor_index = 0, key = "", appearance_text = key, func, allow_insert_response_for_editor = true) {
		const sub_contents = this["__editors"][editor_index].querySelector(".utils--my-editor--sub-contents");
		if (key == "*")
			return console.error(`${key}は登録できません`);
		key = `utils--my-editor--sub-contents--button--${key}`;
		if (sub_contents.querySelector(`#${key}`))
			return console.error(`${key}は既に存在します`);
		const button = document.createElement("button");
		button.id = key;
		button.classList.add("utils--my-editor--sub-contents--button");
		button.innerHTML = `<div class="utils--my-editor--sub-contents--button-text">${appearance_text}</div>`;
		button.addEventListener("click", async e => {
			const { text = "", before_str = "", after_str = "" } = await func();
			const editor = this["__editors"][editor_index].querySelector(".utils--my-editor--editor");
			editor.click();
			if (allow_insert_response_for_editor) {
				const _range = this["getEditorRange"](editor);
				this["wrapSelection"](_range, before_str + text, after_str);
				this["redesignLineNumber"](this["__editors"][editor_index]);
			}
		});
		sub_contents.appendChild(button);
	},
	"removeSubContentsButton": function (editor_index = 0, key = "") {
		const sub_contents = this["__editors"][editor_index].querySelector(".utils--my-editor--sub-contents");
		if (key == "*")
			return sub_contents.replaceChildren();
		key = `utils--my-editor--sub-contents--button--${key}`;
		const child = sub_contents.querySelector(`#${key}`);
		if (!child)
			return console.error(`${key}は存在しません`);
		return child.remove();
	},
	"getEditorRange": function (editor) {
		const sel = window.getSelection();
		if (sel.rangeCount) {
			const range = sel.getRangeAt(0);
			if (editor.contains(range.commonAncestorContainer))
				return range;
		}

		let range = this["__ranges"].get(editor);
		if (!range) {
			range = document.createRange();
			range.selectNodeContents(editor);
			range.collapse(false);
		}
		return range;
	},
	"wrapSelection": function (range, before_str = "", after_str = "") {
		if (range.collapsed)
			this["replaceRange"](range, before_str + after_str, false, -after_str.length);
		else {
			const text = range.toString();
			this["replaceRange"](range, before_str + text + after_str, true);
		}
	},
	"replaceRange": function (range, text = "", select = false, move = 0, move_pos = text.length) {
		range.deleteContents();

		const node = document.createTextNode(text);

		range.insertNode(node);

		if (select)
			range.selectNodeContents(node);
		else {
			range.setStart(node, Math.max(0, Math.min(text.length, move_pos + move)));
			range.collapse(true);
		}
		const sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	},
	"setCursorPosition": function (editor, index = 0) {
		const text = editor.innerText;

		const walker = document.createTreeWalker(
			editor,
			NodeFilter.SHOW_TEXT
		);

		let textIndex = 0;
		let node;

		while (node = walker.nextNode()) {
			const nodeText = node.nodeValue;

			// TextNode内
			for (let i = 0; i <= nodeText.length; i++) {
				if (textIndex === index) {
					const range = document.createRange();

					range.setStart(node, i);
					range.collapse(true);

					return range;
				}

				if (i < nodeText.length)
					textIndex++;
			}

			// TextNodeの後ろにinnerText上の改行がある
			if (
				textIndex < text.length &&
				text[textIndex] === "\n"
			) {
				textIndex++;
			}
		}

		const range = document.createRange();
		range.selectNodeContents(editor);
		range.collapse(false);

		return range;
	},
	"getCaretOffset": function (editor, input_range = null) {
		const sel = window.getSelection();
		if (!sel.rangeCount) return 0;

		const range = input_range == null ? sel.getRangeAt(0) : input_range;

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