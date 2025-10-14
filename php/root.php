<?php

require_once './utils/utils.php';

getMyQuery();

$mySubDomain = 'share';

// 自分自身への直接アクセスを拒否
if ($_SERVER['SCRIPT_FILENAME'] === __FILE__ && getenv('REDIRECT_FROM_REWRITE') !== '1') {
	echoErrorSite(403, 'Direct access forbidden');
}


$latest_flag_name = 'l';
$lib_name_query_name = 'n';
$lib_name_query_exist = exist($_GET[$lib_name_query_name]);
$version_query_name = 'v';
$version_query_exist = exist($_GET[$version_query_name]);

// 不正な入力排除
if (empty($target_query) || preg_match('#\.\.|^/#', $target_query) || preg_match('#[^\w\-\/\.]#', $other_data_query)) {
	echoErrorSite(400, invalidURL(getMyHostName($target_query)));
}

const COMMON_STRING = 'common-src';
$jsd_word = 'jsd';
$link_word = 'link';

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
	'tso' => COMMON_STRING . '/tso',
	$link_word => COMMON_STRING . '/others/link'
];

$other_data_special_path = ['src/js/script.js', 'src/css/style.css'];

// モードによってルーティング
switch ($target_query) {
	case 'strict':
		// ローカル非公開ファイルから取得
		$baseDir = realpath(__DIR__ . '/../../hidden_html');
		$fullPath = realpath($baseDir . '/' . $other_data_query);

		if (!$fullPath || strpos($fullPath, $baseDir) !== 0 || !is_file($fullPath))
			echoErrorSite(403, 'Direct access forbidden');

		$finfo = finfo_open(FILEINFO_MIME_TYPE);
		$mime = finfo_file($finfo, $fullPath);
		finfo_close($finfo);

		setHeaders('', $mime);
		header('Content-Length: ' . filesize($fullPath));
		readfile($fullPath);
		break;
	default:
		// A ⇒ B マッピングに一致するか？
		if (isset($redirectMap[$target_query])) {
			$a = $target_query;
			$b = $redirectMap[$a];
			$remoteUrl = getMyHostName();
			$other_data_path = rawurldecode($other_data_query);
			$other_data_split_slash_array = (strpos($other_data_path, '/') ? explode('/', $other_data_path) : [$other_data_path]);

			foreach ($other_data_special_path as $c) {
				if ($other_data_path == $c && !file_get_contents(url_join($remoteUrl, $b, $c))) {
					$arr0 = explode('/', $c);
					array_splice($arr0, 1, 0, $a);
					$other_data_path = implode('/', $arr0);
					$remoteUrl = url_join($remoteUrl, $other_data_path);
					forwardRemoteFile($remoteUrl);
					exit;
				}
			}
			$remoteUrl = url_join($remoteUrl, $b);
			$createdSiteFlag = false;
			if ($a == $jsd_word) {
				$resultVersion = '';
				if ($lib_name_query_exist && $_GET[$lib_name_query_name] !== '') {
					$targetDir = $_GET[$lib_name_query_name];
					$resultVersion = ((($version_query_exist && $_GET[$version_query_name] !== '' && $_GET[$version_query_name] !== $latest_flag_name)) ? $_GET[$version_query_name] : (getLatestDir(url_join(MY_BASEPATH, $b, $targetDir)) ?? ''));
					$remoteUrl = url_join($remoteUrl, "{$targetDir}/{$resultVersion}/{$targetDir}.js");
					$other_data_path = '';
					if ($resultVersion == '') $resultVersion = 'none';
				} else if (count($other_data_split_slash_array) > 1 && $other_data_split_slash_array[1] == $latest_flag_name) {
					$targetDir = $other_data_split_slash_array[0];
					$resultVersion = getLatestDir(url_join(MY_BASEPATH, $b, $targetDir)) ?? '';
					$other_data_split_slash_array[1] = $resultVersion;
					$remoteUrl = url_join($remoteUrl, implode('/', $other_data_split_slash_array));
					if ($resultVersion == '') $resultVersion = 'none';
				} else if (preg_match('/^all$/i', $other_data_query)) {
					$resultDirs = getLatestLibDir(url_join(MY_BASEPATH, $b), $remoteUrl) ?? '';
					if ($resultDirs == '')
						$resultVersion = 'none';
					else {
						echo implode(',', $resultDirs);
						exit;
					}
				}
				if ($resultVersion == 'none')
					echoErrorSite(404, UNKNOWN_STRING . ' version: 指定したバージョンが見つかりませんでした。');
				else if ($resultVersion == '')
					$remoteUrl = url_join($remoteUrl, $other_data_path);
			} else if ($a == $link_word && count($other_data_split_slash_array) == 1 && !strpos($other_data_split_slash_array[0], '.html')) {
				if ($other_data_split_slash_array[0] == 'get-json') {
					echoMyAllLinkJson();
					exit;
				} else {
					$createdSiteFlag = true;
					$_json_file_path = url_join($b, 'src/json', $other_data_split_slash_array[0] . '.json');
					$remoteUrl = API_URL['link'] . '?' . http_build_query([
						getMyParamKey('link') => url_join(getMyHostName(), $_json_file_path)
					]);
				}
			} else
				$remoteUrl = url_join($remoteUrl, $other_data_path);
			forwardRemoteFile($remoteUrl, false, $createdSiteFlag);
			exit;
		} else
			echoErrorSite(404, 'Unknown target');
}

// 最新バージョンのライブラリのディレクトリを抽出
function getLatestLibDir(string $baseDir, string $baseUrl): ?array {
	$libDirs = [];
	if (is_dir($baseDir)) {
		$dirs = get_dir($baseDir);
		foreach ($dirs as $dirPath) {
			$basename = basename($dirPath);
			if (preg_match('/^[A-Z][a-z]+$/', $basename)) {
				$gotVersion = getLatestDir($baseDir . "/" . $basename)['version'];
				$libDirs[] = url_join($baseUrl, $basename, $gotVersion, $basename);
			}
		}
	}
	return exist($libDirs) ? $libDirs : null;
}

function echoMyAllLinkJson() {
	global $redirectMap, $link_word;
	$_url = MY_BASEPATH . $redirectMap[$link_word] . '/src/json/*.json';

	$_result = get_files($_url);
	
	echo json_encode(array_map(fn($c) => getFileName($c, false), $_result));
}

?>