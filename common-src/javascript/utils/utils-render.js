if (!Object.hasOwn(window, "utils--temp--add-str"))
	window["utils--temp--add-str"] = "";

const addElementString = window["utils--temp--add-str"] ? window["utils--temp--add-str"] : "";

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
		<div class="display-inner-contents" id="display-setting-main-contents-setting">
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
						<div class="item-summary">フォントの設定</div>
						<div class="item-box">
							<div class="item">
								<select id="setting-display--appearance--input-select--font-setting" class="allow-expand" data-mydef--set-by-script="false"></select>
							</div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">設定されたテーマの強制</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" data-mydef--import-template-type="utils-setting" template-id-args="force-theme"></div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">設定されたデバイスモードの強制</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" data-mydef--import-template-type="utils-setting" template-id-args="force-device"></div>
						</div>
					</div>
					<div class="item-all-box">
						<div class="item-summary">画面サイズによってデバイスモードの最適化を自動で実行</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" data-mydef--import-template-type="utils-setting" template-id-args="allow--changing--device-mode--for--display-size"></div>
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
							<div class="item import-template-append" template-id-data="toggle-switch-template" data-mydef--import-template-type="utils-setting" template-id-args="allow--opening--setting-display--after--reload"></div>
						</div>
					</div>
				</div>
				<div class="tab-contents-box--item" id="tc--user-data">
					<div class="item-all-box">
						<div class="item-summary">ローカルストレージに設定を保存する</div>
						<div class="item-box">
							<div class="item import-template-append" template-id-data="toggle-switch-template" data-mydef--import-template-type="utils-setting" template-id-args="save--user-data--localstorage"></div>
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
	<template id="display-data-template">
		<div id="display-data-main-contents-data">
			<div class="data--main-contents-box">
				<div class="main-contents--top">
					<h3 id="data--message"></h3>
				</div>
				<div class="main-contents--middle">
					<input type="text" place-holder=", でデータを区切る" id="data--text-input">
				</div>
				<div class="main-contents--bottom">
					<div class="button-box">
						<input type="button" value="CANCEL" id="data--cancel-button">
						<input type="button" value="OK" id="data--ok-button">
					</div>
				</div>
			</div>
		</div>
	</template>
	<section id="data-display-section" class="display-section background-blur important-section-1" data-display-open="false" data-mydef--set-by-script="false">
		<div id="data-display-div-main" class="display-section--div-main import-template-append" template-id-data="display-template" template-id-args="データ入力 %_ID:display-data-template input-data true"></div>
	</section>
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