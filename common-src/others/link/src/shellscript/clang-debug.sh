#!/bin/bash

current_dir_path=$(realpath "$(dirname $1)")
parent_dir_path=$(basename "${current_dir_path}")
add_cmd_file_path=".add_bash_cmd"
DEBUG_FILE_NAME="debug*.txt"
DEBUG_INDENT="    "
DEBUG_INDENT_INPUT="${DEBUG_INDENT}🔴 "
DEBUG_INDENT_OUTPUT="${DEBUG_INDENT}🔵 "

# カレントディレクトリの移動（そうしないとプログラム内でのファイル入出力がバグる）
cd $(realpath "${current_dir_path}/..")

OUT="${parent_dir_path}/$(basename "$1")"
SRC="${OUT}.c"

# コンパイル
gcc "${SRC}" -o "${OUT}" -lm

if [ $? -ne 0 ]; then
	echo "コンパイルに失敗しました"
	exit 1
fi

DEBUG_FILES=($(find "./${parent_dir_path}" -type f -name "${DEBUG_FILE_NAME}" | sort -V))

if [ ! "${DEBUG_FILES}" ]; then
	echo -e "デバッグ用ファイルが見つかりませんでした\n${DEBUG_FILE_NAME}をコンパイル元ファイルの親ディレクトリ内に1つ以上設置してください"
	exit 1
else
	# 実行
	idx=(-1)
	echo -e "============ デバッグ開始 ============\n"
	echo -e "実行結果 :\n"

	for arg_file in "${DEBUG_FILES[@]}"; do
		idx=$((idx + 1))
		echo -e "====== case "$idx": ======\n"
		echo -e "・入力 :\n${DEBUG_INDENT_INPUT}"
		cat "${arg_file}" | sed "s/^/${DEBUG_INDENT_INPUT}/"
		echo -e "\n${DEBUG_INDENT_INPUT}\n\n・出力 :\n${DEBUG_INDENT_OUTPUT}"
		"./${OUT}" < "${arg_file}" | sed "s/^/${DEBUG_INDENT_OUTPUT}/"
		echo -e "\n${DEBUG_INDENT_OUTPUT}\n"
	done;

	echo -e "============ デバッグ終了 ============\n"

	echo -e "============ 追加コマンド群 実行開始 ============\n"
	if [ -f "./${parent_dir_path}/${add_cmd_file_path}" ]; then
		bash "./${parent_dir_path}/${add_cmd_file_path}"
	fi
	echo -e "============ 追加コマンド群 実行終了 ============\n"
fi