<?php

require_once './utils/utils.php';

$mySubDomain = 'share';

// どんなことよりも、まずセッションファイルの保存フォルダのパーミッションを700にしろカス

// 自分自身への直接アクセスを拒否
if ($_SERVER['SCRIPT_FILENAME'] === __FILE__ && getenv('REDIRECT_FROM_REWRITE') !== '1')
        echoErrorSite(403, 'Direct access forbidden');

$latest_flag_name = 'l';
$lib_name_query_name = 'n';
$lib_name_query_exist = isset($_GET[$lib_name_query_name]);
$version_query_name = 'v';
$version_query_exist = isset($_GET[$version_query_name]);

// 不正な入力排除
if (empty($target_query) || preg_match('#\.\.|^/#', $target_query) || preg_match('#[^\w\-\/\.]#', $other_data_query))
	echoErrorSite(400, 'Invalid request');

const COMMON_STRING = 'common-src';
$jsd_word = 'jsd';

// A => B 形式のリダイレクト情報
$redirectMap = [
	'share' => '',
	'js' => COMMON_STRING . '/javascript',
	$jsd_word => COMMON_STRING . '/javascript/def',
	'jst' => COMMON_STRING . '/javascript/tamura',
	'jsf' => COMMON_STRING . '/javascript/function',
	'css' => COMMON_STRING . '/css',
	'ld' => COMMON_STRING . '/loading',
	'svg' => COMMON_STRING . '/svg',
	'bg-svg' => COMMON_STRING . '/svg/background',
	LINK_STRING => COMMON_STRING . '/others/link',
	'tso' => COMMON_STRING . '/tso',
	'blog' => COMMON_STRING . '/blog'
];


// モードによってルーティング
switch ($target_query) {
	case 'strict':
		// ローカル非公開ファイルから取得
		$baseDir = realpath(__DIR__ . '/../../hidden_html');
		$fullPath = realpath($baseDir . '/' . $other_data_query);

		if (!$fullPath || strpos($fullPath, $baseDir) !== 0 || !is_file($fullPath)) {
			http_response_code(403);
			exit('Access denied');
		}

		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$mime = finfo_file($finfo, $fullPath);
		finfo_close($finfo);

		header('Content-Type: ' . $mime);
		header('Content-Length: ' . filesize($fullPath));
		readfile($fullPath);
		break;
	default:
		// A ⇒ B マッピングに一致するか？
		if (isset($redirectMap[$target_query])) {
			$a = $target_query;
			$b = $redirectMap[$a];
			$remoteUrl = 'https://share.tshuto.com/';
			$other_data_path = rawurldecode($other_data_query);
			$other_data_split_slash_array = (($other_data_path !== '' && str_contains($other_data_path, '/')) ? explode('/', $other_data_path) : []);

			$remoteUrl = url_join($remoteUrl, "{$b}/");
			if ($a == $jsd_word) {
				$resultVersion = '';
				if ($lib_name_query_exist && $_GET[$lib_name_query_name] !== '') {
					$targetDir = $_GET[$lib_name_query_name];
					$resultVersion = (($version_query_exist && $_GET[$version_query_name] !== '' && $_GET[$version_query_name] !== $latest_flag_name) ? $_GET[$version_query_name] : (getLatestDir("./../{$b}/{$targetDir}") ?? ""));
					$remoteUrl = url_join($remoteUrl, "{$targetDir}/{$resultVersion}/{$targetDir}.js");
					$other_data_path = '';
					if ($resultVersion == '') $resultVersion = 'none';
				} else if (count($other_data_split_slash_array) > 1 && $other_data_split_slash_array[1] == $latest_flag_name) {
					$targetDir = $other_data_split_slash_array[0];
					$resultVersion = getLatestDir("./../{$b}/{$targetDir}") ?? "";
					$other_data_split_slash_array[1] = $resultVersion;
					$remoteUrl = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
					if ($resultVersion == '') $resultVersion = 'none';
				} else if (preg_match('/^all$/i', $other_data_query)) {
					$resultDirs = getLatestLibDir("./../{$b}", $remoteUrl) ?? "";
					if ($resultDirs == '')
						$resultVersion = 'none';
					else {
						echo implode(',', $resultDirs);
						exit;
					}
				}
				if ($resultVersion == 'none') {
					echoErrorSite(404, 'Unknown version: 指定したバージョンが見つかりませんでした。');
				} else if ($resultVersion == '')
					$remoteUrl = url_join($remoteUrl, $other_data_path);
			} else if ($a == 'blog' && !preg_match('/^src*/i', $other_data_query))
				$remoteUrl = url_join(getMyHostName($a), "index.html");
			else
				$remoteUrl = url_join($remoteUrl, $other_data_path);
			if ($convert_query_exist)
				echo $remoteUrl;
			else
				forwardRemoteFile($remoteUrl);
			exit;
		} else
			echoErrorSite(404, 'Unknown target');
}

//--------------------------------------------------------------------------------------------------------------
// Functions
//--------------------------------------------------------------------------------------------------------------



// 最新バージョンのライブラリのディレクトリを抽出
function getLatestLibDir(string $baseDir, string $baseUrl): ?array
{
	$libDirs = [];
	if (is_dir($baseDir)) {
		$dirs = array_filter(glob($baseDir . '/*'), 'is_dir');
		foreach ($dirs as $dirPath) {
			$basename = getFileName($dirPath);
			if (preg_match('/^[A-Z][a-z]+$/', $basename)) {
				$gotVersion = getLatestDir(realpath($dirPath));
				$libDirs[] = url_join($baseUrl, $basename, $gotVersion['version'], $basename);
			}
		}
	}

	return empty($libDirs) ? null : $libDirs;
}
