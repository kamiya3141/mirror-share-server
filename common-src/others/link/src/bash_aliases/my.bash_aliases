alias rba="source ~/.bash_aliases"
alias eba="sudo nano ~/.bash_aliases && rba"
alias rbr="source ~/.bashrc"
alias ebr="sudo nano ~/.bashrc && rbr"

function wgmbr() {
        local bashrc_label_num=${1:-7}
        local remote_url_path="https://share.tshuto.com/common-src/others/link/src"
        if [ "$MY_UPDATE_REMOTE_URL" ]; then
                remote_url_path="${MY_UPDATE_REMOTE_URL}"
        fi
        local url="${remote_url_path}/bashrc/my-${bashrc_label_num}.bashrc"
        wget --no-cache -q -O "$HOME/my.bashrc" "$url"
}

function gitc() {
        local commit_str=${1:-"edit some files"}
        local dir_path=${2:-.}
        cd ~/public_html && git add $dir_path && git commit -m "$commit_str" && git push && clear
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