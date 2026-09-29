import Display from "./Display.jsx";
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayFooter from "./DisplayFooter.jsx";
import DisplayMainContents from "./DisplayMainContents.jsx";

import "./AppTest.css";
import "./Display.css";
import "./DisplaySubContents.css";
import "./DisplayMainContents.css";

function AppTest() {
	return (
		<div class="apptest-root">
			<Display onlyMainContents="false">
				<DisplayHeader closedButton>Header-Title</DisplayHeader>
				<DisplayMainContents>Main-Contents</DisplayMainContents>
				<DisplayFooter>Footer-Title</DisplayFooter>
			</Display>
		</div>
	);
}

export default AppTest;
