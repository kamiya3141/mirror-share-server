import Display from "./Display.jsx";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayFooter from "./DisplayFooter.jsx";
import DisplayMainContents from "./DisplayMainContents.jsx";
import createRDM from "./LocalUtils.jsx";

import "./AppTest.css";
import "./Display.css";
import "./DisplaySubContents.css";
import "./DisplayMainContents.css";

function AppTest() {
	const display_id = createRDM();
	const button_id = `button--${createRDM()}`;
	setTimeout(() => {
		document.getElementById(button_id).click();
	}, 500);
	return (
		<div class="apptest-root">
			<button class="apptest-button" id={button_id} popoverTarget={display_id} popoverTargetAction="toggle">open</button>
			<Display displayID={display_id} onlyMainContents="false">
				<DisplayHeader closedButton={display_id}>Header-Title</DisplayHeader>
				<DisplayMainContents>Main-Contents</DisplayMainContents>
				<DisplayFooter>Footer-Title</DisplayFooter>
			</Display>
			<div class="temp-div"></div>
			<div class="temp-div"></div>
		</div>
	);
}

export default AppTest;
