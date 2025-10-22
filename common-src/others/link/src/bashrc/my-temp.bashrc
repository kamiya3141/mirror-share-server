# ===== color_def =====
PROMPT_COLOR_MAIN="\[\033[0;31m\]"
PROMPT_COLOR_MAIN0="\[\033[0;31m\]"
PROMPT_COLOR_MAIN1="\[\033[0;91m\]"
PROMPT_COLOR_MAIN2="\[\033[0;92m\]"
PROMPT_COLOR_MAIN3="\[\033[0;93m\]"
PROMPT_COLOR_MAIN4="\[\033[0;94m\]"
PROMPT_COLOR_USER="\[\033[0;36m\]"
PROMPT_COLOR_HOST="\[\033[0;37m\]"
PROMPT_COLOR_SYMBOL="\[\033[0;34m\]"
PROMPT_COLOR_DIR="\[\033[0;33m\]"
PROMPT_COLOR_CORRECT="\[\033[0;32m\]"
PROMPT_COLOR_FAILED="\[\033[0;35m\]"
PROMPT_COLOR_RESET="\[\033[0m\]"

# ===== PS1_setting- =====
set_prompt_command() {
	local PRE_EXIT="$?"
	local current_dir display_dir user_host0 user_host line_len underline correct_str failed_str result_str
	local correct_str="${PROMPT_COLOR_CORRECT}✓${PROMPT_COLOR_RESET}"
	local failed_str="${PROMPT_COLOR_FAILED}✗${PROMPT_COLOR_RESET}"
	local prompt_symbol="${PROMPT_COLOR_SYMBOL}⌬${PROMPT_COLOR_RESET}"
	if [ ${PRE_EXIT} -eq 0 ]; then
			result_str="$correct_str"
	else
			result_str="$failed_str"
	fi
	current_dir=$(pwd)
	display_dir=$(echo "$current_dir" | sed "s|^$HOME|~|")
	
}
PROMPT_COMMAND=set_prompt_command

export MYBASHRC="checked"