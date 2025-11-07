var parentElement = document.querySelector("body");
const width = Number(document.documentElement.clientWidth);
const height = Number(document.documentElement.clientHeight);
const common_r = width > height ? height / 2 : width / 2;
const common_cx = common_r;
const common_cy = common_r;
const common_small_r = common_r / 25;
const splits = 20;
