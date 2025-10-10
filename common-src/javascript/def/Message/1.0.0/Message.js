/*
class Message {
	constructor(
		left = 0.5,
		top = 0,
		message = "This is default message.",
		color = "black",
		backgroundColor = "white",
		radiusBoolean = true
	) {
		this.left = left;
		this.top = top;
		this.message = message;
		this.color = color;
		this.backgroundColor = backgroundColor;
		this.radiusBoolean = radiusBoolean;
		this.me = document.createElement("ts-message");
		this.me.style.left = this.left;
		this.me.style.top = this.top;
		this.me.style.color = this.color;
		this.me.style.backgroundColor = this.backgroundColor;
		if (!this.radiusBoolean) this.me.style.borderRadius = "0";
		this.me.innerHTML += this.message;
		return this.me;
	}
	remove() {
		this.me.remove();
	}
}
*/

class MessageElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.metaURL = new URL(import.meta.url);
		this.shadowTemplateURL = new URL("./.template", this.metaURL);
		fetch(this.shadowTemplateURL).then(res => res.text()).then(templateText => {
			const doc = new DOMParser().parseFromString(templateText, "text/html");
			this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));
			this.shadowRoot.querySelector("template").addEventListener("click", e => {
				if (e.button == 0) e.currentTarget.remove();
			});
		});
	}
}

customElements.define("ts-message", MessageElement);

export default  MessageElement;