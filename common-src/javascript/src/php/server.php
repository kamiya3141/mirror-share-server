<?php
include_once './public_html/php/utils/utils.php';

$target_script_path = $_GET["rewrite-script-file-path"];
$target_script_open_mode = $_GET["rewrite-script-file-open-mode"];
if ($target_script_path == "js/main-script-history.js" && $target_script_open_mode == "w") {
	$jsonData = json_decode($_GET["php-input"], true);
	$scriptData = $jsonData ? $jsonData["data"] : "";
	
	$result = file_put_contents(("./../" .  $target_script_path), $scriptData);
	echo ($result ? "true" : "false");
}

?>