function Display({ children, displayID, onlyMainContents }) {
	return (
		<div popover="auto" id={displayID} class="display-root" data-mydef--reactjs-display--only-main-contents={(onlyMainContents == "true")}>
			{children}
		</div>
	);
}

export default Display;