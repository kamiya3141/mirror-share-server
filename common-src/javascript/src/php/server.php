<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

$target_script_path = $_GET["rewrite-script-file-path"];
$target_script_open_mode = $_GET["rewrite-script-file-open-mode"];
$result_script_path = './../../' .  $target_script_path;
if ($target_script_open_mode == "w") {
	$scriptData = $php_input ? json_decode($php_input, true)["code"] : "";
	$result = false;
	if ($scriptData)
		$result = file_put_contents($result_script_path, $scriptData);
	$last_result = ($result ? "true" : "false");
	echo $last_result;
	// echo $last_result . " : " . $scriptData;
} else if ($target_script_open_mode == "r")
	echo file_get_contents($result_script_path);
else
	echo "hello";
exit;
