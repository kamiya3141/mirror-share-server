if (window.TSObjectExist || document.head.querySelector("script[src*='Object.js']")) mainLoad();
else {
	const script = document.createElement("script");
	script.async = false;
	script.defer = true;
	script.src = "https://jsd.tshuto.com/Object/1.2.0/Object.js";
	script.addEventListener("load", mainLoad);
	document.currentScript.parentElement.insertBefore(script, document.currentScript);
}

function mainLoad() {
	const elementName = window.getMyElementName();

	class TSOMessage extends TSObject {
		#deleteDivId = "delete-div";
		constructor(msg_type) {
			super();
			if (msg_type) this.classList.add(msg_type);
			const mySlotClassNameArray = ["alert", "warn", "normal"];
			const tmp_file_name = new URL(
				`./.${window.TSObjectTemplateFileExt}`,
				new URL(document.currentScript.src)
			);
			this.addEventListener(window.TSObjectLoadedEventName, () => {
				fetch(tmp_file_name).then(res => res.text()).then(templateText => {
					const doc = new DOMParser().parseFromString(templateText, "text/html");
					this.shadowRoot.prepend(doc.getElementById("template").content.cloneNode(true));
					const my_event = new CustomEvent(`${elementName}-complete-set`, {
						detail: {
							loaded: true
						}
					});
					this.appendChild(new DOMParser().parseFromString(`<div id="${this.#deleteDivId}" style="display:inline-block;font-size:inherit;border-left:${this
						.stroke} var(--bd-wei) var(--bd-tp);">&#9003;</div>`, "text/html").getElementById(this.#deleteDivId)).addEventListener("click", e => {
						if (e.button == 0) {
							this.style.display = "none";
							document.dispatchEvent(my_event);
						}
					});;
					
					const mySlot = this.shadowRoot.getElementById("slot-id");
					mySlot.addEventListener("slotchange", () => {
						if (
							!mySlotClassNameArray.some(c => String(this.className).includes(c)) &&
							!this.getAttribute("color-type")
						) {
							this.classList.add(mySlotClassNameArray[2]);
						}
					});
					this.shapeValue = ["50%", "auto", "auto", "auto", "10rem"].join(",");
					this.positionType = "cxt";
					this.allowHover = true;
					this.style.display = "inline-block";
					[...this.children].forEach(c => {
						const _rem = 1;
						c.style.paddingRight = `${_rem}rem`;
						c.style.paddingLeft = `${_rem}rem`;
					});
					window.ts_object_tester.add(this);

					document.dispatchEvent(
						new CustomEvent(`${elementName}-complete-set`, {
							detail: {
								loaded: false
							}
						})
					);
				});
			});
		}
		completeSetBegin() {
			this.shapeValue = ["50%", "auto", "auto", "auto", "10rem"].join(",");
			this.style.position = "relative";
		}
		completeSetEnd() {
			this.shapeValue = ["50%", this.getBoundingClientRect().y, "auto", "auto", "10rem"].join(
				","
			);
			this.style.position = "fixed";
		}
	}
	let firstMsgElementCount = 0;
	document.addEventListener(`${elementName}-complete-set`, e => {
		if (e.detail.loaded) {
			window.ts_object_tester.displayFlex();
			window.ts_object_tester.add(...document.getElementsByTagName(elementName));
		} else {
			firstMsgElementCount++;
			const el = [...document.querySelectorAll(`${elementName}`)];
			if (el.length != firstMsgElementCount) {
				el.forEach(c => (c.style.opacity = "0"));
				return;
			} else el.forEach(c => (c.style.opacity = "1"));
		}
		window.ts_object_tester.getChildren.reverse().forEach(c => {
			c.completeSetBegin();
		});
		window.ts_object_tester.getChildren.reverse().forEach(c => {
			c.completeSetEnd();
			document.body.prepend(c);
		});
		window.ts_object_tester.clear();
		window.ts_object_tester.displayNone();
	});

	customElements.define(elementName, TSOMessage);
}
