<?php

require_once './utils.php';

$other_data_path = rawurldecode($other_data_query);
$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);

$remoteUrl = getMyHostName($target_query);

$_flag = $other_data_split_slash_array[0];
$_flags_array = [VIEW_STRING, GET_STRING, GETFILE_STRING, GETDIR_STRING];

if (preg_match('/' . implode('|', $_flags_array) . '/', $_flag)) {
	array_shift($other_data_split_slash_array);
	$_multi_flags_exist = boolval(array_filter($_flags_array, fn($v) => str_contains($other_data_split_slash_array[0], $v)) !== []);
	$url = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
	if (!$_multi_flags_exist) {
		if ($_flag == VIEW_STRING)
			forwardRemoteFile($url, true);
		else if ($_flag == GET_STRING)
			download_file($url);
		else if ($_flag == GETFILE_STRING || $_flag == GETDIR_STRING) {
			$url = str_replace(INDEX_HTML, '', $url);
			$new_url1 = file_get_contents($url . '?' . http_build_query([
				CONVERT_STRING => true
			]));
			$ret_arr = $_flag == GETFILE_STRING ? get_files($new_url1) : get_dirs($new_url1);
			$new_url2 = str_replace(getMyHostName(), MY_BASEPATH, $new_url1);
			$ret_arr = str_replace($new_url2, '', $ret_arr);
			echo json_encode($ret_arr);
		} else
			echoErrorSite(404, implode('<br>', ['Server Error !!', invalidURL($url)]));
	} else {
		$__protocol_and_hostname = getMyHostName($target_query);
		$url = str_replace($__protocol_and_hostname, '', $url);
		$url = url_join($__protocol_and_hostname, $_flag, $url);
		echoErrorSite(404, implode('<br>', ['Server Error !!', invalidURL($url)]));
	}
	exit;
}

echoErrorSite(404, 'Server Error !!<br>File is not exist !!');
exit;

?>