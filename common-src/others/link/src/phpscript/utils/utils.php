<?php

session_start();

$mySubDomain = "--MYSUBDOMAIN--";

const UTILS_DIR = 'utils';
define('MY_BASEPATH', realpath(__DIR__ . '/../../../public_html'));
const MY_DOMAIN = '.tshuto.com';

const INDEX_HTML = 'index.html';
const UNKNOWN_STRING = 'UNKNOWN';
const DEFAULT_STRING = 'default';
const NOT_DEFAULT_STRING = 'not-default';
const GET_MIME_TYPE = 'application/octet-stream';
const VIEW_STRING = 'view';
const GET_STRING = 'get';
const GETFILE_STRING = 'get-files';
const GETDIR_STRING = 'get-dirs';
const CONVERT_STRING = 'convert';
const LINK_STRING = 'link';
const REWRITE_STRING = '-:-';
const ERROR_TEMPLATE_URL = 'https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/html/error/index.html';
// const ERROR_TEMPLATE_URL = 'https://kamiya3141.github.io/mirror-share-server/common-src/html/error/index.html';
// define('ERROR_TEMPLATE_URL', url_join(getMyHostName('share'), 'common-src/html/error', INDEX_HTML));
define('API_URL', [
	VIEW_STRING => url_join(getMyHostName('api'), 'php/api-view.php'),
	LINK_STRING => url_join(getMyHostName('api'), 'php/api-link.php'),
	'error' => url_join(getMyHostName('api'), 'php/api-error.php'),
	'md' => url_join(getMyHostName('api'), 'php/api-markdown.php'),
	'motion' => url_join(getMyHostName('api'), 'php/api-motion.php'),
	'browser-view' => url_join(getMyHostName('api'), '/express/browser-view/cache/blog')
]);

$mimeMap = [
	'js' => 'application/javascript',
	'json' => 'application/json',
	'pdf' => 'application/pdf',
	'css' => 'text/css',
	'php' => 'text/x+php',
	'png' => 'image/png',
	'jpg' => 'image/jpeg',
	'jpeg' => 'image/jpeg',
	'gif' => 'image/gif',
	'svg' => 'image/svg+xml',
	'html' => 'text/html',
	'txt' => 'text/plain',
	'md' => 'text/markdown',
	'template' => 'text/html',
	'tsotemplate' => 'text/html',
	'none' => GET_MIME_TYPE
];

$target_query = '';
$other_data_query = '';

$convert_query_exist = isset($_GET[CONVERT_STRING]);

$php_input = '';

//--------------------------------------------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------------------------------------------

// クエリの受け取り
function getMyQuery(): void
{
	global $target_query, $other_data_query, $convert_query_exist, $php_input;
	$add_filename = ($convert_query_exist ? '' : INDEX_HTML);
	$target_query = $_GET['target'] ?? '';
	$other_data_query = $_GET['od'] ?? $add_filename;
	if (empty($other_data_query))
		$other_data_query = $add_filename;
	if (substr($other_data_query, -1) == '/')
		$other_data_query = url_join($other_data_query, $add_filename);
	$_GET['rqorg'] = $_SERVER['HTTP_ORIGIN'] ?? null;

	$__input =  file_get_contents("php://input") ?: '';
	$__json = json_decode($__input, true, 512, JSON_BIGINT_AS_STRING);
	if ($__json === false)
		$_POST['php-input'] = $__input;
	else {
		if (is_array($__json) && isset($__json['data-type']) && $__json['data-type'] === 'php-input')
			$php_input = isset($__json['data']) ? json_encode($__json['data']) : $__input;
	}
}



function getMyHostName(string $_sub_dmn = '', bool $with_protocol = true): string
{
	global $mySubDomain;
	$_sub_dmn = exist($_sub_dmn) ? $_sub_dmn : $mySubDomain;
	return ($with_protocol ? 'https://' : '') . $_sub_dmn . MY_DOMAIN;
}

function echoErrorSite(int $_code = 404, string $_word = ''): void
{
	http_response_code($_code);
	$cts = file_get_contents(API_URL['error'] . '?' . http_build_query([
		getMyParamKey('error-code') => "{$_code}",
		getMyParamKey('error-word') => "{$_word}"
	]));
	setHeaders($cts, 'text/html');
	echo $cts;
	exit;
}

function invalidURL(string $_url = '', string $_add_msg = ''): string
{
	return implode('<br>', ['<h1>Invalid URL</h1>', '* url -> ' . $_url, $_add_msg]);
}

function isFetchRequest(): bool
{
	return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') || isset($_SERVER['HTTP_ORIGIN']) || isset($_SERVER['HTTP_X_REQUESTED_WITH']);
}

function ecex(mixed ...$_args): void
{
	foreach ($_args as $c)
		echo print_r($c, true) . '<br><br>';
	exit;
}

function errorString($_str_ = '-'): string
{
	return json_encode([
		'data' => "error: {$_str_}"
	]);
}

function debugString(...$args): string
{
	array_unshift($args, '~begin~' . PHP_EOL);
	array_push($args, PHP_EOL . '~end~');
	return join(PHP_EOL, $args);
}

function getClientIp(): string
{
	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
		return trim($ipList[0]);
	}
	return $_SERVER['REMOTE_ADDR'] ?? UNKNOWN_STRING;
}

function url_join(string ...$_args): string
{
	$_url = implode('/', array_map(fn($p) => trim($p, '/'), $_args));
	$_url = preg_replace('#(?<!:)//+#', '/', $_url);
	if (substr($_url, 0, 5) == 'home/')
		$_url = '/' . $_url;
	return $_url;
}

// 最新のバージョンを返す
function getLatestDir(string $baseDir): ?array
{
	$versionDirs = [];
	if (is_dir($baseDir)) {
		$dirs = get_dirs($baseDir);
		foreach ($dirs as $dirPath) {
			$base_name = getFileName($dirPath);
			if (preg_match('/^\d+\.\d+\.\d+$/', $base_name)) {
				$versionDirs[] = [
					'version' => $base_name,
					'path' => $dirPath
				];
			}
		}

		// バージョン順にソート（昇順）
		usort($versionDirs, fn($a, $b) => version_compare($a['version'], $b['version']));
	}

	return exist($versionDirs) ? end($versionDirs) : null;
}

function setHeaders($_cts, $_mm = 'text/plain', $_file_path = '')
{
	if (exist($_file_path))
		header('Content-Disposition: attachment; filename="' . getFileName($_file_path) . '"');
	header('Content-Type: ' . $_mm);
	if (exist($_cts))
		header('Content-Length: ' . strlen($_cts));
}

function forwardRemoteFile(string $_url, bool $view_site = false, bool $created_html = false, string $set_ext_without_dot = '', bool $mode_return = false): string
{
	global $mimeMap;

	if (empty($_url)) {
		echoErrorSite(404, invalidURL($_url));
		exit;
	}

	$ext = pathinfo(parse_url($_url, PHP_URL_PATH), PATHINFO_EXTENSION);
	$ext = exist($set_ext_without_dot) ? $set_ext_without_dot : $ext;
	$mime = $mimeMap[strtolower($ext)] ?? $mimeMap['txt'];

	$result_url = $_url;

	if ($created_html) {
		global $other_data_query;
		$other_data_path = rawurldecode($other_data_query);
		$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);
		$created_html = count($other_data_split_slash_array) == 1 && !str_contains($other_data_split_slash_array[0], '.html');
		if ($created_html) {
			$_json_file_path = url_join(getMyHostName(LINK_STRING), GETFILE_STRING, 'src', $other_data_split_slash_array[0]) . '/';
			$_url = API_URL[LINK_STRING] . '?' . http_build_query([
				getMyParamKey(LINK_STRING) => $_json_file_path
			]);
			$mime = $mime == GET_MIME_TYPE ? $mime : $mimeMap['html'];
		}
		$result_url = $_url;
	}
	if ($view_site) {
		$mime = $mimeMap['html'];
		$add_param = [
			getMyParamKey(VIEW_STRING) => $_url,
			getMyParamKey(LINK_STRING) => '',
			getMyParamKey('org') => ''
		];
		if ($created_html) {
			$___explode_result = explode('=', $_url);
			$_created_url_param = end($___explode_result);
			$add_param[getMyParamKey(VIEW_STRING)] = getMyParamKey(LINK_STRING);
			$add_param[getMyParamKey(LINK_STRING)] = $_created_url_param;
			$add_param[getMyParamKey('org')] = getMyHostName();
		}
		$result_url = API_URL[VIEW_STRING] . '?' . http_build_query($add_param);
	}
	if (!$view_site && !$created_html) {
		unset($_GET["target"]);
		unset($_GET["od"]);
		$result_url .= (str_contains($result_url, "?") ? "&" : "?") . http_build_query(array_merge($_GET, $_POST));
	}

	setHeaders('', $mime);
	$contents = file_get_contents($result_url);

	if ($contents === false) {
		echoErrorSite(404, invalidURL($_url));
		exit;
	}

	if ($mode_return == true)
		return $contents;
	setHeaders($contents, $mime);
	echo $contents;
	return "";
}

function exist($_arg): bool
{
	return isset($_arg) && !empty($_arg);
}
function getFileName($_arg, $with_ext = true)
{
	$___explode_result = explode('/', $_arg);
	$_ret = end($___explode_result);
	return $with_ext ? $_ret : explode('.', $_ret)[0];
}
function getExt($_arg): string
{
	$___explode_result = explode('.', getFileName($_arg));
	return end($___explode_result);
}
function getMyParamKey(string $arg): string
{
	return "request-{$arg}-url";
}

function download_file(string $_url): void
{
	if (str_contains($_url, getMyHostName()))
		$_url = str_replace(getMyHostName(), MY_BASEPATH, $_url);
	$cts = file_get_contents($_url);
	setHeaders($cts, GET_MIME_TYPE, getFileName($_url));
	echo $cts;
}
function get_files(string $_url): array
{
	return array_values(array_filter(get_contents($_url), 'is_file'));
}
function get_dirs($_url): array
{
	return array_values(array_filter(get_contents($_url), 'is_dir'));
}
function get_contents($_url): array
{
	if (str_contains($_url, getMyHostName()))
		$_url = str_replace(getMyHostName(), MY_BASEPATH, $_url);
	return glob($_url . '/*');
}

getMyQuery();
