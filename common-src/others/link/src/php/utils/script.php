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
	else if ($_flag == GETFILE_STRING) {
		$new_url = file_get_contents($url . '?' . http_build_query([
			CONVERT_STRING => ''
		]));
		echo json_encode(get_files(substr($new_url, 0, 4) == 'http' ? $new_url : $url));
	} else if ($_flag == GETDIR_STRING) {
		$new_url = file_get_contents($url . '?' . http_build_query([
			CONVERT_STRING => ''
		]));
		echo json_encode(get_dirs(substr($new_url, 0, 4) == 'http' ? $new_url : $url));
	} else
		echoErrorSite(404, implode('<br>', ['Server Error !!', invalidURL($url)]));
	exit;
}

echoErrorSite(404, 'Server Error !!<br>File is not exist !!');
exit;

?>