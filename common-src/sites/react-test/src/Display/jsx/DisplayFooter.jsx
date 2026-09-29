import DisplaySubContents from "./DisplaySubContents.jsx";

function DisplayFooter({ children, closedButton }) {
	return (
		<DisplaySubContents type="bottom" closedButton={closedButton}>{children}</DisplaySubContents>
	);
}

export default DisplayFooter;