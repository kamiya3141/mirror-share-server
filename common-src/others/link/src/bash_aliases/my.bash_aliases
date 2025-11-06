# --- alias ---
alias rba="source ~/.bash_aliases && clear"
alias eba="sudo nano ~/.bash_aliases && rba"
alias rbr="source ~/.bashrc && clear"
alias ebr="sudo nano ~/.bashrc && rbr"
# 汎用
alias up-apt="sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove"
# 個人
alias updt_ba="sudo touch ~/.bash_aliases && sudo chmod 755 ${HOME}/.bash_aliases && sudo chown ${USER}:${USER} ${HOME}/.bash_aliases && wget --no-cache -qO - https://link.tshuto.com/src/bash_aliases/my.bash_aliases > ${HOME}/.bash_aliases && rba"
alias updt_exut="wget -q --no-cache -O ${HOME}/exec-update.sh https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/shellscript/exec-update.sh && bash ${HOME}/exec-update.sh"
# --- function ---
# 汎用
function sc_dr() {
	sudo systemctl daemon-reload
}
function sc_ts() {
	sudo systemctl status $@
}
function sc_st() {
	sudo systemctl restart $@
}
function sc_sp() {
	sudo systemctl stop $@
}
function sc_ea() {
	sudo systemctl enable $@
}
function sc_da() {
	sudo systemctl disable $@
}
# 個人
function wgmbr() {
	local bashrc_label_num=$1
	local update_utils_path="${HOME}/.update-utils"

	if [ ! bashrc_label_num ]; then
		if [ -e "${update_utils_path}" ]; then
			bashrc_label_num=$(head -n 2 "${update_utils_path}")
		else
			bashrc_label_num="7"
			touch "${update_utils_path}"
			echo -e "\n\n" >> "${update_utils_path}"
		fi
	fi
	local remote_url_path="https://share.tshuto.com/common-src/others/link/src"
	if [ "$MY_UPDATE_REMOTE_URL" ]; then
		remote_url_path="${MY_UPDATE_REMOTE_URL}"
	fi
	local url="${remote_url_path}/bashrc/my-${bashrc_label_num}.bashrc"
	wget --no-cache -q -O "$HOME/my.bashrc" "$url"
	sed -i "2s/.*/${bashrc_label_num}/i" "${update_utils_path}"
	rbr
}
function echo_with_color() {
	if [ "$MYBASHRC" ]; then
		if [ -f "$HOME/my.bashrc" ]; then
			source "$HOME/my.bashrc"
		else
			wgmbr
		fi
	else
		wgmbr
	fi
	local _words=${1:-""}
	local _color="${2}"
	local _reset="${PROMPT_COLOR_RESET}"
	local _color_void=""
	if [ ! "${_color}" ]; then
		_color_void="true"
		_color="${PROMPT_COLOR_FAILED}"
	fi
	local echo_text=$(echo "${_color}${_words}${_reset}" | sed -r "s/\\\\\[|\\\\\]//g")
	
	if [ -z "${_color_void}" ]; then
		echo -e "${echo_text}"
	else
		echo -e "${echo_text}" >&2
	fi
}
function addf() {
	local word=${2:-""}
	if [ "$1" ]; then
		echo -e "\n${word}" | sudo tee -a $1 2> /dev/null
		if [ "$?" -eq 0 ]; then
			echo_with_color "Corrected!!" "${PROMPT_COLOR_CORRECT}"
		else
			echo_with_color "Failed!!"
		fi
	else
		echo_with_color "The first argument does not exist."
		return 1
	fi
}
function gitc() {
	local commit_str=${1:-"edit some files"}
	local dir_path=${2:-.}
	git add $dir_path && git commit -m "$commit_str" && git push && clear
}