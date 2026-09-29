import "./DisplaySubContents.jsx";

function DisplayHeader({ children, closedButton }) {
	return (
		<DisplaySubContents type="top" closedButton>Header-Title</DisplaySubContents>
	);
}

export default DisplayHeader;