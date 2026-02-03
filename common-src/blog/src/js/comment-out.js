
/*
import { remark } from "https://esm.sh/remark@latest?bundle";
import remarkParse from "https://esm.sh/remark-parse@latest?bundle";
import remarkHtml from "https://esm.sh/remark-html@latest?bundle";
import remarkGfm from "https://esm.sh/remark-gfm@latest?bundle";
import remarkBreaks from "https://esm.sh/remark-breaks@latest?bundle";
import { unified } from "https://esm.sh/unified@latest?bundle";
import remarkRehype from "https://esm.sh/remark-rehype@latest?bundle";
import rehypeStringify from "https://esm.sh/rehype-stringify@latest?bundle";
*/
/*
	result_str = await unified()
		.use(remarkParse)
		.use(remarkBreaks)
		.use(remarkGfm)
		.use(remarkHtml)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(result_str);
	result_str = result_str.toString();
*/
/*
		result_str = String(
			remark()
				.use(remarkParse)
				.use(remarkBreaks)
				.use(remarkGfm)
				.use(remarkHtml)
				.processSync(result_str)
		);		
*/

/*

<div class="code-frame embed-iframe-root code-iframe-common-styles">
	<a href="${url.toString()}" target="_blank">
		<div class="embed-iframe-inner-title-root">
			<div class="embed-iframe-inner-title-box">
				${url.toString()}
			</div>
			<div class="embed-iframe-inner-title-hostname">
				${url.hostname}
			</div>
		</div>
		<div class="embed-iframe-inner-embed-iframe-root">
			${url.hostname.includes("tshuto.com") ? `<iframe src="${url.toString()}"></iframe>` : ""}
		</div>
	</a>
</div>


*/
/*


	(() => {
		[...result_elm.childNodes].forEach(node => {
			if (node.nodeType == Node.TEXT_NODE) {
				const parts = node.textContent.split("<br>");//.filter(s => s.length > 0);
				node.textContent = parts.shift();

				parts.forEach(p => {
					if (p.length > 0) {
						const pre_el = document.createElement("pre");
						pre_el.innerHTML = p;
						node.after(pre_el);
					}
				});
			}
		})
	})();


*/

/*
function createElementFromHTML(html) {
	const tempEl = document.createElement('div');
	tempEl.innerHTML = html;
	return tempEl;
}

function loadIframe(__iframe) {
	return new Promise(resolve => {
		__iframe.addEventListener("load", () => resolve(__iframe), { once: true });
	});
}

*/