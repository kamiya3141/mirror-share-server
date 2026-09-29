function Display({ children, onlyMainContents }) {
	return (
		<button class="display-root" data-mydef--reactjs-display--only-main-contents={(onlyMainContents == "true")}>
			{children}
		</button>
	);
}

export default Display;