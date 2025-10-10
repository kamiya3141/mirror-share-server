class MessageElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.metaURL = new URL(document.currentScript.src);
		this.shadowTemplateURL = new URL("./.template", this.metaURL);
		this.mySlot;
		this.mySlotClassNameArray = ["alert", "normal", "warn"];
		fetch(this.shadowTemplateURL).then(res => res.text()).then(templateText => {
			const doc = new DOMParser().parseFromString(templateText, "text/html");
			this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));
			const msg_div = this.shadowRoot.querySelector("div#message-box");

			this.mySlot = this.shadowRoot.getElementById("slot-id");
			this.mySlot.addEventListener("slotchange", e => {
				this.mySlotClassNameArray.forEach(c => {
					if (
						[...this.mySlot.assignedNodes()].some(
							n => n.classList != null && n.classList.contains(c)
						)
					)
						msg_div.classList.add(c);
				});
			});

			msg_div.addEventListener("click", e => {
				if (e.button == 0) e.currentTarget.style.display = "none";
			});

			window.addEventListener("load", () => {
				msg_div.classList.remove("ready");
				const rect_h = msg_div.getBoundingClientRect().height * 3 / 4;
				msg_div.style.top = `${rect_h}px`;
			});
		});
	}
}

customElements.define("ts-message", MessageElement);
