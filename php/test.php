<?php

require_once './utils/utils.php';

$mySubDomain = 'share';
$my_head = getMyHostName();//MY_BASEPATH;

$url = url_join($my_head, 'php', UTILS_DIR);
setHeaders('', $mimeMap['txt']);
echo file_get_contents($url . '/utils.php');

//forwardRemoteFile(get_files($url)[1], false, false, 'txt');

?>