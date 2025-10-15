<?php

require_once './utils.php';

$other_data_path = rawurldecode($other_data_query);
$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);

$remoteUrl = getMyHostName($target_query);

$_flag = $other_data_split_slash_array[0];

if (preg_match('/' . VIEW_STRING . '|' . GET_STRING . '/', $_flag)) {
	array_shift($other_data_split_slash_array);
	$url = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
	if ($_flag == VIEW_STRING)
		forwardRemoteFile($url, true);
	else if ($_flag == GET_STRING) {
		//echo download_file($url);
		forwardRemoteFile($url, false, false, 'none');
	}
} else
	echoErrorSite(404, 'Server Error !!<br>File is not exist !!');
	
exit;

?>