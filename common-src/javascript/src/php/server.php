<?php
$target_script_path = $_GET["rewrite-script-file-path"];
$target_script_open_mode = $_GET["rewrite-script-file-open-mode"];
if ($target_script_path == "js/main-script-history.js" && $target_script_open_mode == "w") {
	$scriptData = $_GET["data"] ? $_GET["data"] : "";

	$result = file_put_contents((__DIR__ . '/../' .  $target_script_path), $scriptData);
	echo ($result ? "true" : "false");
	// echo json_encode($_GET);
}
