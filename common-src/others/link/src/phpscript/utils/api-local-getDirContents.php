<?php

require_once './utils.php';

$gt_dt = $_GET[getMyParamKey('dir')];
$gt_bp = $_GET[getMyParamKey('basepath')];
$gt_tg = rawurldecode($_GET[getMyParamKey('target')]) ?? '';

$url = exist($gt_dt) ? rawurldecode($gt_dt) : '';
$basepath = exist($gt_bp) ? rawurldecode($gt_bp) : MY_BASEPATH;

$result_arr = [];

if (exist($url)) {
	$_url_protocol = substr($_url, 4);
	if (strpos($_url_protocol, 'http'))
		$result_url = preg_replace('/http.*:\/\/.+\.tshuto\.com/i', '', $_url);
	if ($gt_tg == 'dir')
		$result_arr = get_dir(url_join($basepath, $result_url));
	else if ($gt_tg == 'file')
		$result_arr = get_files(url_join($basepath, $result_url));
	else
		$result_arr = get_contents(url_join($basepath, $result_url));
}

echo json_encode($result_arr);

exit;

?>