const addElementString = window["utils"] ? window["utils"] : "";

document.body.insertAdjacentHTML("afterbegin", `
	<template id="toggle-switch-template">
		<label class="toggle_button">
			<input class="toggle_input" type="checkbox" />
			<span class="toggle_label"></span>
		</label>
	</template>
	<template id="display-template">
		<div class="display-item-box">
			<header class="contents sub-contents">
				<div class="item-box">
					<div class="corner-box left-corner icon-box">
						<div class="corner" id="corner-00"></div>
						<div class="item" id="icon-box">
							<iframe></iframe>
						</div>
					</div>
					<div class="text-box header-text">
						<div id="text-box"></div>
					</div>
					<div class="corner-box right-corner control-box">
						<div class="item deco-text" id="control-box">
							<div>&#10005;</div>
						</div>
						<div class="corner" id="corner-10"></div>
					</div>
				</div>
			</header>
			<div class="contents main-contents"></div>
			<footer class="contents sub-contents">
				<div class="item-box">
					<div class="corner-box left-corner">
						<div class="corner" id="corner-01"></div>
						<div class="item"></div>
					</div>
					<div class="text-box footer-text">
						<div id="text-box"></div>
					</div>
					<div class="corner-box right-corner">
						<div class="item"></div>
						<div class="corner" id="corner-11"></div>
					</div>
				</div>
			</footer>
		</div>
	</template>
	<!--

	以下特殊用途のtemplate

	-->
	<template id="display-setting-template">
		<div id="display-setting-main-contents-setting">
			<div class="tab-bar">
				<div class="tab-bar--contents--box">
					<div class="tab-bar--contents" id="tb--appearance">
						<div class="tab-bar--contents--item text-overflow-element" title="表示設定">表示設定</div>
					</div>
					<div class="tab-bar--contents" id="tb--specific">
						<div class="tab-bar--contents--item text-overflow-element" title="詳細設定">詳細設定</div>
					</div>
					<div class="tab-bar--contents" id="tb--user-data">
						<div class="tab-bar--contents--item text-overflow-element" title="ユーザデータの設定">ユーザデータの設定</div>
					</div>
					<div class="tab-bar--contents" id="tb--reset--setting-data">
						<div class="tab-bar--contents--item text-overflow-element" title="設定の初期化">設定の初期化</div>
					</div>
				</div>
			</div>
			<div class="tab-contents-box">
				<div class="tab-contents-box--item" id="tc--appearance">
					<div class="item-all-box">
						<div class="item-summary">テーマの設定</div>
						<div class="item-box">
							<div class="item">
								<select id="setting-display--appearance--input-select--theme-setting" class="allow-expand" data-mydef--set-by-script="false"></select>
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">デバイスモードの設定</div>
						<div class="item-box">
							<div class="item">
								<select id="setting-display--appearance--input-select--device-mode-setting" class="allow-expand" data-mydef--set-by-script="false"></select>
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">好みの色の設定</div>
						<div class="item-box">
							<div class="item">
								<input type="color" id="setting-display--appearance--input-color--prefer-color" class="allow-expand">
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">設定されたテーマの強制</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" template-id-args="force-theme"></div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">設定されたデバイスモードの強制</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" template-id-args="force-device"></div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">画面サイズによってデバイスモードの最適化を自動で実行</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" template-id-args="allow--changing--device-mode--for--display-size"></div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">デバイスモードの最適化</div>
						<div class="item-box">
							<div class="item">
								<button class="allow-expand" onclick="javascript:reloadDeviceInformation('setting-display--exec-button-0')">実行</button>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-contents-box--item" id="tc--specific">
					<div class="item-all-box">
						<div class="item-summary">設定画面の既定値</div>
						<div class="item-box">
							<div class="item">
								<select id="setting-display--specific--input-select--setting-display-init-item" class="allow-expand" data-mydef--set-by-script="false"></select>
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">設定画面をリロード後に開くことを許可</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" template-id-args="allow--opening--setting-display--after--reload"></div>
						</div>
					</div>
				</div>
				<div class="tab-contents-box--item" id="tc--user-data">
					<div class="item-all-box">
						<div class="item-summary">ローカルストレージに設定を保存する</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" template-id-args="save--user-data--localstorage"></div>
						</div>
					</div>
				</div>
				<div class="tab-contents-box--item" id="tc--reset--setting-data">
					<div class="item-all-box">
						<div class="item-summary">ユーザデータの初期化</div>
						<div class="item-box">
							<div class="item">
								<button class="allow-expand" onclick="javascript:resetDeviceInformationData()">実行</button>
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">ユーザデータを削除</div>
						<div class="item-box">
							<div class="item">
								<button class="allow-expand" onclick="javascript:removeDeviceInformationData()">実行</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</template>
	<template id="display-alert-template">
		<div id="display-alert-main-contents-alert">
			<div class="alert--main-contents-box">
				<div class="main-contents--top">
					<h1 id="alert--message"></h1>
				</div>
				<div class="main-contents--bottom">
					<div class="button-box">
						<input type="button" value="OK" id="alert--ok-button">
					</div>
				</div>
			</div>
		</div>
	</template>
	<template id="display-confirm-template">
		<div id="display-confirm-main-contents-confirm">
			<div class="confirm--main-contents-box">
				<div class="main-contents--top">
					<h1 id="confirm--message"></h1>
				</div>
				<div class="main-contents--bottom">
					<div class="button-box">
						<input type="button" value="CANCEL" id="confirm--cancel-button">
						<input type="button" value="OK" id="confirm--ok-button">
					</div>
				</div>
			</div>
		</div>
	</template>
	<section id="setting-display-section" class="display-section background-blur important-section-1" data-display-open="false" data-mydef--set-by-script="false">
		<div id="setting-display-div-main" class="display-section--div-main import-template-append" template-id-data="display-template" template-id-args="設定 %_ID:display-setting-template settings true"></div>
	</section>
	<section id="alert-display-section" class="display-section background-blur important-section-2" data-display-open="false" data-mydef--set-by-script="false">
		<div id="alert-display-div-main" class="display-section--div-main import-template-append" template-id-data="display-template" template-id-args="警告 %_ID:display-alert-template alert false"></div>
	</section>
	<section id="confirm-display-section" class="display-section background-blur important-section-2" data-display-open="false" data-mydef--set-by-script="false">
		<div id="confirm-display-div-main" class="display-section--div-main import-template-append" template-id-data="display-template" template-id-args="確認 %_ID:display-confirm-template confirm false"></div>
	</section>
	${addElementString}
`);

var attrName_SetByScript = "data-mydef--set-by-script";

const utilsSleep = ms => new Promise(rslv => setTimeout(rslv, ms));

const MyAlertMessageInfoObject = {
	"alert--id": "#alert-display-section",
	"message--id": "#alert--message",
	"ok-button--id": "#alert--ok-button",
	"message-array": [],
	get "element"() {
		return document.querySelector(this["alert--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		this["element"].querySelector(this["message--id"]).innerHTML = String(input).replaceAll("\n", "<br>");
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	},
	get "open-event-var"() {
		return new CustomEvent("alert--event--open");
	},
	"open-event"(input_str = "", setByCloseEvent = false) {
		if (input_str.length > 0)
			this["message-array"].push(input_str);
		if (this["message-array"].length == 1 || setByCloseEvent)
			window.setTimeout(() => this["element"].dispatchEvent(this["open-event-var"]), setByCloseEvent ? 0 : 250);
	},
	get "close-event-var"() {
		return new CustomEvent("alert--event--close");
	},
	"close-event"() {
		this["element"].dispatchEvent(this["close-event-var"]);
	},
	"__init__"() {
		this["element"].addEventListener("alert--event--open", () => {
			if (this["message-array"].length == 0)
				return;
			const ___msg = this["message-array"].shift();
			this["message"] = ___msg;
			switchingOpenDisplay(this["element"]);
		});
		this["element"].addEventListener("alert--event--close", () => {
			this["message"] = "";
			if (this["message-array"].length > 0)
				this["open-event"]("", true);
		});
	}
};
const MyConfirmMessageInfoObject = {
	"confirm--id": "#confirm-display-section",
	"message--id": "#confirm--message",
	"ok-button--id": "#confirm--ok-button",
	"cancel-button--id": "#confirm--cancel-button",
	"result": null,
	get "element"() {
		return document.querySelector(this["confirm--id"]);
	},
	get "message"() {
		return this["element"].querySelector(this["message--id"]).innerHTML;
	},
	set "message"(input) {
		this["element"].querySelector(this["message--id"]).innerHTML = String(input).replaceAll("\n", "<br>");
	},
	get "ok-button"() {
		return this["element"].querySelector(this["ok-button--id"]);
	},
	get "cancel-button"() {
		return this["element"].querySelector(this["cancel-button--id"]);
	},
	get "open-event-var"() {
		return new CustomEvent("confirm--event--open");
	},
	async "open-event"(input_str = "") {
		this["message"] = input_str;
		this["element"].dispatchEvent(this["open-event-var"]);
		while (this["result"] == null)
			await utilsSleep(250);
		const res = this["result"];
		this["result"] = null;
		return res;
	},
	get "close-event-var"() {
		return new CustomEvent("confirm--event--close");
	},
	"close-event"() {
		this["element"].dispatchEvent(this["close-event-var"]);
	},
	"__init__"() {
		this["element"].addEventListener("confirm--event--open", () => switchingOpenDisplay(this["element"]));
		this["element"].addEventListener("confirm--event--close", () => this["message"] = "");
	}
};

MyAlertMessageInfoObject["__init__"]();
MyConfirmMessageInfoObject["__init__"]();

function myAlertMessage(_str = "Alert Message Template.") {
	MyAlertMessageInfoObject["open-event"](_str);
}

async function myConfirmMessage(_str) {
	//const res = window.confirm(_str);
	const res = await MyConfirmMessageInfoObject["open-event"](_str);
	return res;
}


function get_SetByScript(elem) {
	return elem.getAttribute(attrName_SetByScript) == "true";
}
function edit_SetByScript(elem, input_tf = "auto") {
	let set_data = (input_tf != true && input_tf != false) ? !get_SetByScript(elem) : input_tf;
	elem.setAttribute(attrName_SetByScript, String(set_data));
}

function setDocumentTitle(_str) {
	if (document.title == "ブログ - TSHUTO")
		document.title = [_str, document.title].join(` | `);
}

/**
 * 
 * @param {String} rgb 書くの面倒だったからchatgptに作ってもらった
 * @returns {String}
 */
function rgbToHex(rgb) {
	const nums = String(rgb).match(/[\d.]+/g);
	const [r, g, b, a] = nums.map(Number);
	let hex = `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
	if (a !== undefined)
		hex += Math.round(a * 255).toString(16).padStart(2, "0");
	return hex;
}

function createPopoverElements(el_str0 = "", el_str1 = el_str0) {
	const rdm = Math.floor(Math.random() * (10 ** 12));
	return `
		<button class="utils--popover--elements--popover--show-button" popovertarget="utils--popover--elements--popover-${rdm}">
			${el_str0}
		</button>
		<div id="utils--popover--elements--popover-${rdm}" class="utils--popover--elements--popover-class" popover="auto">
			<div class="utils--popover--elements--popover--close-button-box">
				<button popovertarget="utils--popover--elements--popover-${rdm}">CLOSE</button>
			</div>
			${el_str1}
		</div>
	`.replaceAll("\n", "").replaceAll("\t", "");
}
/**
 * 
 * @param {HTMLButtonElement} btn 
 * @param {HTMLElement} ppov 
 * @param {Boolean} stop_propagation 
 * @returns 
 */
function addEventPopoverElementsMini(btn, ppov, stop_propagation = false) {
	btn.addEventListener("click", e => {
		if (stop_propagation)
			e.stopPropagation();
		ppov.showPopover();
		const btn_rect = btn.getBoundingClientRect();
		const ppov_rect = ppov.getBoundingClientRect();
		ppov.style.left = `${Math.max(0, Math.min(window.scrollX + btn_rect.right, window.innerWidth - ppov_rect.width))}px`;
		ppov.style.top = `${Math.max(0, Math.min(window.scrollY + btn_rect.bottom, window.innerHeight - ppov_rect.height))}px`;
	});
	return btn;
}