import Display from "./Display.jsx";
import DisplayHeader from "./DisplayHeader.jsx";

import "./AppTest.css";
import "./Display.css";
import "./DisplaySubContents.css";

function AppTest() {
	return (
		<div class="apptest-root">
			<Display>
				<DisplayHeader closedButton>Header-Title</DisplayHeader>
			</Display>
		</div>
	);
}

export default AppTest;
