var parentElement = document.querySelector("svg#parent-svg.loading");
const width = Number(document.documentElement.clientWidth); //parentElement.getAttribute("viewBox").split(" ")[2]);
const height = Number(document.documentElement.clientHeight); //parentElement.getAttribute("viewBox").split(" ")[3]);
const common_r = width > height ? height / 2 : width / 2;
const common_cx = common_r;
const common_cy = common_r;
const common_small_r = common_r / 25;
const splits = 20;
