<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

$target_script_path = $_GET["rewrite-script-file-path"];
$target_script_open_mode = $_GET["rewrite-script-file-open-mode"];
if ($target_script_open_mode == "w") {
	$scriptData = $php_input ? json_decode($php_input, true) : "";

	$result = file_put_contents(('./../../' .  $target_script_path), $scriptData);
	// echo ($result ? "true" : "false");
	echo ($result ? "true" : "false") . " : " . $scriptData;
} else if ($target_script_open_mode == "r")
	echo file_get_contents(('./../../' .  $target_script_path));
exit;
