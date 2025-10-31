# --- alias ---
alias rba="source ~/.bash_aliases && clear"
alias eba="sudo nano ~/.bash_aliases && rba"
alias rbr="source ~/.bashrc && clear"
alias ebr="sudo nano ~/.bashrc && rbr"
# 汎用
alias up-apt="sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove"
# 個人
alias updt_ba="sudo touch ~/.bash_aliases && sudo chmod 755 ${HOME}/.bash_aliases && sudo chown ${USER}:${USER} ${HOME}/.bash_aliases && wget --no-cache -qO - https://link.tshuto.com/src/bash_aliases/my.bash_aliases > ${HOME}/.bash_aliases && rba"
alias update-exec-utils="wget -q --no-cache -O ${HOME}/exec-update.sh https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/shellscript/exec-update.sh && bash ${HOME}/exec-update.sh"
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
function addf() {
        local word=${2:-""}
        if [ -e "$1" -a ! -z "$1" ]; then
                echo "ok"
        else
                echo "no"
        fi
}
# 個人
function wgmbr() {
        local bashrc_label_num=${1:-7}
        local remote_url_path="https://share.tshuto.com/common-src/others/link/src"
        if [ "$MY_UPDATE_REMOTE_URL" ]; then
                remote_url_path="${MY_UPDATE_REMOTE_URL}"
        fi
        local url="${remote_url_path}/bashrc/my-${bashrc_label_num}.bashrc"
        wget --no-cache -q -O "$HOME/my.bashrc" "$url"
        rbr
}
function gitc() {
        local commit_str=${1:-"edit some files"}
        local dir_path=${2:-.}
        git add $dir_path && git commit -m "$commit_str" && git push && clear
}