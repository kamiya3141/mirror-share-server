/*

class TshutoUtilsDisplay {
	constructor (header_title = "head-title", contents = "", footer_title = "footer-title") {
		this.structure_arr = [
			"div",
			{
				class: "display-item-box",
				id: `test-display--${createRDM()}`
			},
			[
				[
					"header",
					"contents sub-contents",
					[
						[
							"div",
							"item-box",
							[
								[
									"div",
									"corner-box left-corner icon-box",
									[
										[
											"div",
											{
												class: "corner",
												id: "corner-00"
											}
										],
										[
											"div",
											{
												class: "item",
												id: "icon-box"
											},
											[
												[
													"img",
													{
														class: "display-none",
														src: "https://kamiya3141.github.io/mirror-share-server/favicon.ico"
													}
												]
											]
										]
									]
								],
								[
									"div",
									"text-box header-text",
									[
										[
											"div",
											{
												id: "text-box",
												innerHTML: header_title
											}
										]
									]
								],
								[
									"div",
									"corner-box right-corner control-box",
									[
										[
											"div",
											{
												class: "item deco-text",
												id: "control-box"
											},
											[
												[
													"div",
													{
														innerHTML: "&#10005;"
													}
												]
											]
										],
										[
											"div",
											{
												class: "corner",
												id: "coner-10"
											}
										]
									]
								]
							]
						]
					]
				],
				[
					"div",
					{
						class: "contents main-contents",
						innerHTML: contents
					}
				],
				[
					"footer",
					"contents sub-contents",
					[
						[
							"div",
							"item-box",
							[
								[
									"div",
									"corner-box left-corner",
									[
										[
											"div",
											{
												class: "corner",
												id: "corner-01"
											}
										],
										[
											"div",
											"item"
										]
									]
								],
								[
									"div",
									"text-box footer-text",
									[
										[
											"div",
											{
												id: "text-box",
												innerHTML: footer_title
											}
										]
									]
								],
								[
									"div",
									"corner-box right-corner",
									[
										[
											"div",
											"item"
										],
										[
											"div",
											{
												class: "corner",
												id: "corner-11"
											}
										]
									]
								]
							]
						]
					]
				]
			]
		];
		this.root = createAnyElementStructure(this.structure_arr);
	}
	log(input = "") {
		console.log(this.root.outerHTML);
		console.log(input);
	}
}

*/