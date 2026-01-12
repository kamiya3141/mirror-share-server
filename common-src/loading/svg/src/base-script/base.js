var parentElement = document.querySelector("svg#parent-svg.loading");
const width = Number(window.innerWidth);
const height = Number(window.innerHeight);
const common_r = width > height ? height / 2 : width / 2;
const common_cx = common_r;
const common_cy = common_r;
const common_small_r = common_r / 25;
const splits = 20;
