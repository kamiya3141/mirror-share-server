function DisplayHeader({ children, title, closedButton }) {
	return (
		<header class="display-header">
			<section class="left">
				<div class="left--left corner"></div>
				<div class="left--right">イ</div>
			</section>
			<section class="middle" title={title}>{children}</section>
			<section class="right">
				<div class="right--left">
					{closedButton && (
						<button>&#10005;</button>
					)}
				</div>
				<div class="right--right corner"></div>
			</section>
		</header>
	);
}

export default DisplayHeader;