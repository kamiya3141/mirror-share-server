class MessageElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.metaURL = new URL(import.meta.url);
		this.shadowTemplateURL = new URL("./.template", this.metaURL);
		this.mySlot;
		this.mySlotClassNameArray = ["alert", "normal", "warn"];
		fetch(this.shadowTemplateURL).then(res => res.text()).then(templateText => {
			const doc = new DOMParser().parseFromString(templateText, "text/html");
			this.shadowRoot.appendChild(doc.getElementById("template").content.cloneNode(true));

			this.mySlot = this.shadowRoot.getElementById("slot-id");
			this.mySlot.addEventListener("slotchange", e => {
				this.mySlotClassNameArray.forEach(c => e.currentTarget.classList.add([...this.mySlot.assignedNodes()].some(n => n.classList.contains(c)) ? c : ""));				
			});
			this.mySlot.addEventListener("click", e => {
				if (e.button == 0) e.currentTarget.style.display = "none";
			});
		});
	}
}

customElements.define("ts-message", MessageElement);

export default  MessageElement;