const elementName = "ts-message";

const escape_div = document.createElement("div");
const escape_div_id = `${elementName}-escape-div`;
escape_div.id = escape_div_id;
escape_div.style.position = "fixed";
escape_div.style.display = "block";
escape_div.style.opacity = "0";
escape_div.style.top = "0px";
escape_div.style.left = "0px";
escape_div.style.width = `${document.documentElement.clientWidth}px`;
escape_div.style.height = `${document.documentElement.clientHeight}px`;
escape_div.style.backgroundColor = "rgba(0, 0, 0, 0)";
document.body.prepend(escape_div);

class MessageElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.metaURL = new URL(document.currentScript.src);
		this.shadowTemplateURL = new URL("./.template", this.metaURL);
		this.initScriptURL = new URL("./init.js", this.metaURL);
		const mySlotClassNameArray = ["alert", "normal", "warn"];
		fetch(this.shadowTemplateURL).then(res => res.text()).then(templateText => {
			const doc = new DOMParser().parseFromString(templateText, "text/html");
			this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));
			const msg_div = this.shadowRoot.querySelector("div#message-box");
			const msg_div_event = new CustomEvent("complete-set", {
				detail: {
					loaded: true
				}
			});
			msg_div.addEventListener("click", e => {
				if (e.button == 0) {
					e.currentTarget.style.display = "none";
					document.dispatchEvent(msg_div_event);
				}
			});
			const mySlot = this.shadowRoot.getElementById("slot-id");
			mySlot.addEventListener("slotchange", e => {
				mySlotClassNameArray.forEach(c => {
					if (String([...mySlot.assignedElements()][0].className).includes(c)) {
						msg_div.classList.add(c);
					}
				});
				escape_div.appendChild(this);
			});
		});
	}
	completeSetBegin() {
		const msg_div = this.shadowRoot.querySelector("div#message-box");
		msg_div.classList.add("opacity0");
		msg_div.classList.remove("complete");
		const rect_y = `${this.getBoundingClientRect().top}px`;
		msg_div.style.top = rect_y;
	}
	completeSetEnd() {
		const msg_div = this.shadowRoot.querySelector("div#message-box");
		msg_div.classList.remove("opacity0");
		msg_div.classList.add("complete");
	}
}

document.addEventListener("complete-set", e => {
	if (e.detail.loaded) {
		escape_div.style.display = "block";
		escape_div.style.width = `${document.documentElement.clientWidth}px`;
		escape_div.style.height = `${document.documentElement.clientHeight}px`;
		[...document.getElementsByTagName(elementName)].forEach(c => {
			escape_div.appendChild(c);
		});
	}
	[...escape_div.getElementsByTagName(elementName)].forEach(c => {
		c.completeSetBegin();
	});
	[...escape_div.getElementsByTagName(elementName)].reverse().forEach(c => {
		c.completeSetEnd();
		document.body.prepend(c);
	});
	escape_div.style.display = "none";
});

customElements.define(elementName, MessageElement);

const loaded_script = document.createElement("script");
loaded_script.setAttribute("src", new URL("./loaded.js", new URL(document.currentScript.src)));
document.body.appendChild(loaded_script);
