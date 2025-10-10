<?php

// めんどくさくなってchatgptを頼った部分があるよ

// クエリの受け取り
$user_name_query = $_GET['user'] ?? '';
$password_query = $_GET['password'] ?? '';
// 新規作成のフラグの存在確認
$create_account_flag_exist = isset($_GET['create']);
// 直下のユーザーデータを格納しているディレクトリの名前
$user_data_dir_path = path_join(__DIR__, 'user-data');
// request originの値
$request_origin = $_GET['rqorg'] ?? $_SERVER['HTTP_ORIGIN'];

// 設定等のjsonファイルのファイル名
$json_file_name_array = [
	'cfg' => 'config',
	'dt' => 'data',
	'd' => 'dir',
	'pg' => 'page'
];

// echoで返すときの連想配列の定義
$temp_echo_value = [
	'data' => false
];

$echo_value = copyData();

$now_time = date("Y-m-d H:i:s");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// メイン処理
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 不正な入力排除
if (empty($user_name_query) || empty($password_query) || preg_match('#\.\.|^/#', $user_name_query) || preg_match('#[^\w\-\/\.]#', $password_query)) {
	errorString("不正な入力です", false);
	// -> username: {$user_name_query}, password: {$password_query}
	exit;
}

$disallow_user_array = ['share'];

foreach ($val as $disallow_user_array) {
	if ($val == $user_name_query) {
		errorString('不正な名前です', false);
		exit;
	}
}

$input_val = $create_account_flag_exist ? createUserAccount() : (existUserDir($user_name_query) ? loginUserAccount() : errorString('ユーザーが存在しませんでした'));

echoJsonData($input_val);

exit;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 関数群
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function loginUserAccount(): bool
{
	global $user_name_query, $password_query, $json_file_name_array, $user_data_dir_path, $now_time;

	$success = successString('成功です。');
	$__name = $user_name_query;
	$__password = $password_query;

	$__my_cfg_json = loadJsonFile(path_join($user_data_dir_path, $__name, $json_file_name_array['cfg'] . '.json'));
	if (isset($__my_cfg_json)) {
		if ($__my_cfg_json['password'] === $__password) {
			$__my_cfg_json['login'] = $now_time;
		} else
			return errorString('パスワードが違います');
	} else
		return errorString('cfg-json は存在しません');

	return $success;
}

function createUserAccount()
{
	global $user_name_query, $password_query, $json_file_name_array, $user_data_dir_path, $disallow_user_array, $now_time;

	$__name = $user_name_query;
	$__password = $password_query;
	// shareフォルダの中のテンプレートを探す
	$__template_name = $disallow_user_array[0];
	$__cfg_flnm = path_join($user_data_dir_path, $__template_name, $json_file_name_array['cfg'] . '.json');
	$__cfg_json = loadJsonFile($__cfg_flnm);
	if (isset($__cfg_json)) {
		if (isset($__cfg_json['attr'])) {
			$__temp_name_limit = $__cfg_json['name'];
			if (strlen($__name) < $__temp_name_limit['min'] || strlen($__name) > $__temp_name_limit['max'] || strlen(preg_replace("/[{$__temp_name_limit['re']}]*/", '', $__name)) > 0)
				return errorString("名前は{$__temp_name_limit['min']}~{$__temp_name_limit['max']}文字の半角アルファベット・数字・アンダーバーのみ入力できます");
			$__temp_password_limit = $__cfg_json['password'];
			if (strlen($__password) < $__temp_password_limit['min'] || strlen($__password) > $__temp_password_limit['max'] || strlen(preg_replace("/[{$__temp_password_limit['re']}]*/", '', $__password)) > 0)
				return errorString("パスワードは{$__temp_password_limit['min']}~{$__temp_password_limit['max']}文字の半角アルファベット・数字・アンダーバーのみ入力できます");

			$__base_bottom_name = $__cfg_json['attr'];

			$__my_cfg_json = loadJsonFile(path_join($user_data_dir_path, $__template_name, 'json', $json_file_name_array['cfg'] . $__base_bottom_name . '.json'));
			$__my_dt_json = loadJsonFile(path_join($user_data_dir_path, $__template_name, 'json', $json_file_name_array['dt'] . $__base_bottom_name . '.json'));
			$__my_pg_json = loadJsonFile(path_join($user_data_dir_path, $__template_name, 'json', $json_file_name_array['pg'] . $__base_bottom_name . '.json'));

			// テンプレートから作る
			if (isset($__my_cfg_json) && isset($__my_dt_json) && isset($__my_pg_json)) {
				// mkdir
				$__my_dir = path_join($user_data_dir_path, $__name);

				if (is_dir($__my_dir))
					return errorString('そのユーザー名は既に使用されています');

				$old_umask = umask(0);

				$__res = mkdir($__my_dir, 0777, true);

				if (!$__res) return errorString($__my_dir);

				$__my_json_dir = path_join($__my_dir, 'json');
				mkdir($__my_json_dir, 0777, true);
				$__my_json_dir_dir = path_join($__my_json_dir, $json_file_name_array['d']);
				mkdir($__my_json_dir_dir, 0777, true);
				$__my_json_page_dir = path_join($__my_json_dir, $json_file_name_array['pg']);
				mkdir($__my_json_page_dir, 0777, true);

				$__my_png_dir = path_join($__my_dir, 'png');
				mkdir($__my_png_dir, 0777, true);

				// cfg
				$__my_cfg_json['login'] = $now_time;
				$__my_cfg_json['name'] = $__name;
				$__my_cfg_json['password'] = $__password;
				// pg
				$__my_pg_json['attr'] = 'pr';

				// save
				$__file_names = [
					[path_join($__my_dir, $json_file_name_array['cfg'] . '.json'), $__my_cfg_json],
					[path_join($__my_json_dir, $json_file_name_array['dt'] . '.json'), $__my_dt_json],
					[path_join($__my_json_page_dir, $json_file_name_array['pg'] . '1.json'), $__my_pg_json]
				];

				foreach ($__file_names as $fl) {
					file_put_contents($fl[0], json_encode($fl[1]));
					chmod($fl[0], 0777);
				}

				umask($old_umask);

				return successString('成功です。');
			} else {
				return errorString('my-cfg, my-dt, my-d, my-pg のうちいずれかが存在しません');
			}
		} else {
			return errorString('cfg-json に attr は存在しません -> ' . json_encode($__cfg_json));
		}
	} else {
		return errorString('cfg-json は存在しません -> ' . json_encode($__cfg_json));
	}
}

function existUserDir($_name_ = null): bool
{
	if ($_name_ == null) return false;
	global $user_data_dir_path;
	return is_dir(path_join($user_data_dir_path, $_name_));
}

function path_join(...$segments): string
{
	return preg_replace('#/+#', '/', join('/', $segments));
}

function copyData($_data_ = null)
{
	global $temp_echo_value;
	if (!isset($_data_)) $_data_ = $temp_echo_value;
	return unserialize(serialize($_data_));
}

function echoJsonData($_data_ = null, $_direct_data_ = true)
{
	global $echo_value;

	$__result_data = null;

	if (!isset($_data_))
		$__result_data = copyData();
	else {
		if ($_direct_data_) {
			$echo_value['data'] = $_data_;
			$__result_data = copyData($echo_value);
		} else
			$__result_data = copyData($_data_);
	}

	$val = json_encode($__result_data, JSON_UNESCAPED_UNICODE);

	echo $val;
}

function errorString($_str_ = '-', $without_json = true): string
{
	$retval = "error: {$_str_}";
	if (!$without_json) $retval = echoJsonData($retval);
	return $retval;
}
function successString($_str_ = '-', $without_json = true): string
{
	$retval = "success: {$_str_}";
	if (!$without_json) $retval = echoJsonData($retval);
	return $retval;
}

function loadJsonFile($_file_path_)
{
	$__content = file_get_contents($_file_path_);
	$__result = null;
	if (isset($__content)) {
		$__json_data = json_decode($__content, true, 512, JSON_BIGINT_AS_STRING);
		if (isset($__json_data))
			$__result = $__json_data;
	}
	return $__result;
}
