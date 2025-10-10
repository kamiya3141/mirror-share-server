<?php

// めんどくさくなってchatgptを頼った部分があるよ

// クエリの受け取り
$type_query = $_GET['type'] ?? '';

$request_origin = $_GET['rqorg'] ?? '';
if (empty($request_origin))
	$_GET['rqorg'] = $request_origin = $_SERVER['HTTP_ORIGIN'];

// type_queryの仕分け定義
$type_query_def_arr = [
	'base-path' => 'https://share.tshuto.com/common-src/ahk/tso/streamDeck/',
	'base_ext' => '.php',
	'kind' => [
		'lg' => 'login',
		'ed' => 'editor',
		'exe' => 'execute'
	]
];

$full_url = getFullURL($type_query);

// typeクエリが無かったら403を返す
if (empty($type_query) || empty($full_url))
	echo errorString("403: Direct access forbidden -> {$type_query}, {$full_url}");

unset($_GET['type']);
$remortUrl = $full_url . '?' . http_build_query($_GET);

$response = file_get_contents($remortUrl);

echo $response;

// ######################
// Function
// ######################

function getFullURL($_tp_key): ?string
{
	global $type_query_def_arr;

	return (isset($type_query_def_arr['kind'][$_tp_key]) ? ($type_query_def_arr['base-path'] . $type_query_def_arr['kind'][$_tp_key] . $type_query_def_arr['base_ext']) : '');
}

function errorString($_str_ = '-'): string
{
	return json_encode([
		'data' => "error: {$_str_}"
	]);
}

function getFileCurl($url)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

	$result = curl_exec($ch);

	if ($result === false) {
		$error = curl_error($ch);
		curl_close($ch);
		return ['success' => false, 'error' => $error];
	}

	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);

	if ($httpCode >= 400) {
		return ['success' => false, 'error' => "HTTP Error {$httpCode}"];
	}

	return ['success' => true, 'data' => $result];
}
