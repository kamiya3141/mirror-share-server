import Display from "./Display/jsx/Display.jsx";
import DisplayHeader from "./Display/jsx/DisplayHeader.jsx";
import DisplayFooter from "./Display/jsx/DisplayFooter.jsx";
import DisplayMainContents from "./Display/jsx/DisplayMainContents.jsx";
import createRDM from "./LocalUtils.jsx";

import "./AppTest.css";
import "./Display/css/Display.css";
import "./Display/css/DisplaySubContents.css";
import "./Display/css/DisplayMainContents.css";

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
