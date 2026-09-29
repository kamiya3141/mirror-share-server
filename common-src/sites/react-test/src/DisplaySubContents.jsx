function DisplaySubContents({ children, type, closedButton }) {
	const class_type = `display--${type == "top" ? "header" : "footer"}`;
	if (class_type == "display--footer")
		closedButton = false;
	class_type += " display--sub-contents";
	return (
		<section class={class_type}>
			<section class="left">
				<div class="left--left corner"></div>
				<div class="left--right"></div>
			</section>
			<section class="middle" title={(typeof children == "string" ? children : children.innerText)}>
				<div class="middle--title">{children}</div>
			</section>
			<section class="right">
				<div class="right--left">
					{closedButton && (
						<button popoverTarget={closedButton} popoverTargetAction="hide">&#10005;</button>
					)}
				</div>
				<div class="right--right corner"></div>
			</section>
		</section>
	);
}

export default DisplaySubContents;