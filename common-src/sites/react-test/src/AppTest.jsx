import Display from "./Display.jsx";
import DisplayHeader from "./DisplayHeader.jsx";

import "./AppTest.css";
import "./Display.css";
import "./DisplayHeader.css";

function AppTest() {
	return (
		<div class="apptest-root">
			<Display>
				<DisplayHeader title="グローバル設定" closedButton="true">Contents</DisplayHeader>
			</Display>
		</div>
	);
}

export default AppTest;
