<?php

require_once './utils.php';

getMyQuery();

$other_data_path = rawurldecode($other_data_query);
$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);

$remoteUrl = getMyHostName($target_query);

if ($other_data_split_slash_array[0] == VIEW_STRING) {
	array_shift($other_data_split_slash_array);
	$url = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
	forwardRemoteFile($url, true);
} else if ($other_data_split_slash_array[0] == GET_STRING) {
	array_shift($other_data_split_slash_array);
	$url = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
	download_file($url);
} else
	echoErrorSite(404, 'Server Error !!<br>File is not exist !!');

exit;

?>