<?php

require_once './utils.php';

$other_data_path = rawurldecode($other_data_query);
$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);

$remoteUrl = getMyHostName($target_query);

$_flag = $other_data_split_slash_array[0];

if (preg_match('/' . VIEW_STRING . '|' . GET_STRING . '|' . GETFILE_STRING . '|' . GETDIR_STRING . '/', $_flag)) {
	array_shift($other_data_split_slash_array);
	$url = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
	if ($_flag == VIEW_STRING)
		forwardRemoteFile($url, true);
	else if ($_flag == GET_STRING)
		download_file($url);
	else if ($_flag == GETFILE_STRING || $_flag == GETDIR_STRING) {
		$url = str_replace(INDEX_HTML, '', $url);
		$new_url = file_get_contents($url . '?' . http_build_query([
			CONVERT_STRING => true
		]));
		$ret_arr = str_replace(MY_BASEPATH, getMyHostName(), $_flag == GETFILE_STRING ? get_files($new_url) : get_dirs($new_url));
		echo json_encode($ret_arr);
	} else
		echoErrorSite(404, implode('<br>', ['Server Error !!', invalidURL($url)]));
	exit;
}

echoErrorSite(404, 'Server Error !!<br>File is not exist !!');
exit;

?>