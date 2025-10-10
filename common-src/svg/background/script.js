let target_bg_svg_number = 0;

const target_bg_svg_url = () => `https://bg-svg.tshuto.com/${target_bg_svg_number}/index.svg`;

const _rq = [...new URLSearchParams(new URL(String(document.currentScript.src)).search)];
if (_rq.length == 1 && !isNaN(Number(_rq[0][1]))) target_bg_svg_number = _rq[0][1];
let bg_ifr = document.createElement("iframe");
bg_ifr.id = "background-bg_iframe";
bg_ifr.src = target_bg_svg_url();
bg_ifr.width = "100%";
bg_ifr.height = "100%";
bg_ifr.style.position = "fixed";
bg_ifr.style.left = "0px";
bg_ifr.style.top = "0px";
bg_ifr.style.width = "100%";
bg_ifr.style.height = "100%";
document.body.prepend(bg_ifr);