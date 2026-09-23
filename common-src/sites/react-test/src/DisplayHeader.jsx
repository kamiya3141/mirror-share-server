function DisplayHeader({ children, title, closedButton, theme }) {
	return (
		<header>
			<h1>{title}</h1>
			<h2>{children}</h2>
			{closedButton && (
				<button>×</button>
			)}
			<p>テーマ: {theme}</p>
		</header>
	);
}

export default DisplayHeader;