TMP_MYBASHRC_VAL="checked"
if [ -e "${MYBASHRC}" ]; then
	TMP_MYBASHRC_VAL="${MYBASHRC}"
fi
MYBASHRC="${TMP_MYBASHRC_VAL}"
MY_UPDATE_REMOTE_URL="https://kamiya3141.github.io/mirror-share-server/common-src/others/link/src"

PROMPT_STYLE_ALL_RESET="\[\033[0m\]"

# ===== color_def =====
PROMPT_COLOR_RESET="\[\033[39m\]"
PROMPT_COLOR_MAIN0="\[\033[31m\]"
PROMPT_COLOR_MAIN1="\[\033[91m\]"
PROMPT_COLOR_MAIN2="\[\033[92m\]"
PROMPT_COLOR_MAIN3="\[\033[93m\]"
PROMPT_COLOR_MAIN4="\[\033[94m\]"
PROMPT_COLOR_MAIN="${PROMPT_COLOR_MAIN0}"
PROMPT_COLOR_USER="\[\033[37m\]"
PROMPT_COLOR_HOST="\[\033[37m\]"
PROMPT_COLOR_SYMBOL="\[\033[34m\]"
PROMPT_COLOR_CDIR="\[\033[33m\]"
PROMPT_COLOR_CORRECT="\[\033[32m\]"
PROMPT_COLOR_FAILED="\[\033[31m\]"
PROMPT_COLOR_TIME="\[\033[37m\]"
PROMPT_COLOR_USER2="\[\033[94m\]"
PROMPT_COLOR_HOST2="\[\033[96m\]"
PROMPT_COLOR_CDIR2="\[\033[32m\]"
# ===== backgroundcolor_def =====
PROMPT_BG_COLOR_RESET="\[\033[49m\]"
PROMPT_BG_COLOR_MAIN0="${PROMPT_BG_COLOR_RESET}"
PROMPT_BG_COLOR_MAIN1="\[\033[104m\]"
PROMPT_BG_COLOR_MAIN2="\[\033[103m\]"
PROMPT_BG_COLOR_MAIN3="\[\033[102m\]"
PROMPT_BG_COLOR_MAIN4="\[\033[101m\]"
PROMPT_BG_COLOR_MAIN="${PROMPT_BG_COLOR_MAIN0}"
PROMPT_BG_COLOR_USER="\[\033[104m\]"
PROMPT_BG_COLOR_HOST="\[\033[106m\]"
PROMPT_BG_COLOR_SYMBOL="${PROMPT_BG_COLOR_RESET}"
PROMPT_BG_COLOR_CDIR="\[\033[42m\]"
# ===== char_def =====
PROMPT_CHAR_ITEM_START="${PROMPT_COLOR_MAIN}${PROMPT_BG_COLOR_MAIN}["
PROMPT_CHAR_ITEM_END="${PROMPT_COLOR_MAIN}${PROMPT_BG_COLOR_MAIN}]"
PROMPT_CHAR_ITEM_CONNECT_BODY="${PROMPT_COLOR_MAIN}${PROMPT_BG_COLOR_MAIN}─"
# ===== other_def =====
PROMPT_OTHER_CHAR_MAIN=""

function surround_item_char() {
	local result_str=""
	local idx=0
	local last_idx=$(($# - 1))
	for arg in "$@"; do
		local input_item=${arg:-"NULL"}
		result_str+="${PROMPT_CHAR_ITEM_START} ${input_item} ${PROMPT_CHAR_ITEM_END}"
		if [ "${idx}" -ne "${last_idx}" ]; then
			result_str+="${PROMPT_CHAR_ITEM_CONNECT_BODY}"
			((idx++))
		fi
	done
	result_str+="${PROMPT_BG_COLOR_RESET}${PROMPT_COLOR_RESET}"
	printf "${result_str}"
}

# 1 line ps1
# ===== PS1_setting-8 =====
function set_prompt_command() {
	local PRE_EXIT="$?"
	local correct_str failed_str result_str
	local correct_str="${PROMPT_COLOR_CORRECT}✓${PROMPT_COLOR_RESET}"
	local failed_str="${PROMPT_COLOR_FAILED}✗${PROMPT_COLOR_RESET}"
	# local prompt_symbol="${PROMPT_COLOR_SYMBOL}⌬${PROMPT_COLOR_RESET}"
	if [ ${PRE_EXIT} -eq 0 ]; then
			result_str="$correct_str"
	else
			result_str="$failed_str"
	fi

	local current_date="${PROMPT_COLOR_TIME} $(date "+%Y年%m月%d日(%a)") ${PROMPT_COLOR_RESET}"
	local current_time="${PROMPT_COLOR_TIME} $(date "+%H:%M:%S") ${PROMPT_COLOR_RESET}"
	local prevent_main_str=$(surround_item_char "${result_str}" "${current_date}" "${current_time}")

	local main_str="${PROMPT_BG_COLOR_USER}"
	local user_str="${PROMPT_COLOR_USER} \u ${PROMPT_BG_COLOR_HOST}${PROMPT_COLOR_USER2}${PROMPT_OTHER_CHAR_MAIN}"
	local host_str="${PROMPT_COLOR_HOST} \h ${PROMPT_BG_COLOR_CDIR}${PROMPT_COLOR_HOST2}${PROMPT_OTHER_CHAR_MAIN}"
	local cdir_str="${PROMPT_COLOR_CDIR} $(pwd) ${PROMPT_BG_COLOR_RESET}${PROMPT_COLOR_CDIR2}${PROMPT_OTHER_CHAR_MAIN}"
	main_str+="${user_str}${host_str}${cdir_str}"
	main_str+="${PROMPT_COLOR_RESET}${PROMPT_BG_COLOR_RESET}"
	main_str+="${PROMPT_STYLE_ALL_RESET}"

	PS1="${prevent_main_str}${main_str}\$"

}
PROMPT_COMMAND=set_prompt_command
