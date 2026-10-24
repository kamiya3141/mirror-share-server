import DisplaySubContents from "./DisplaySubContents.jsx";

function DisplayHeader({ children, closedButton }) {
	return (
		<DisplaySubContents type="top" closedButton={closedButton}>{children}</DisplaySubContents>
	);
}

export default DisplayHeader;