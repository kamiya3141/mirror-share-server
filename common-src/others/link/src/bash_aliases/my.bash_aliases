alias rbs=". ~/.bash_aliases"
alias eba="sudo nano ~/.bash_aliases && rbs && clear"
alias rbr=". ~/.bashrc"
alias ebr="sudo nano ~/.bashrc && rbr && clear"

function wg-mbr() {
        local bashrc_label_num=${1:-"7"}
        wget --no-cache -q -O ~/my.bashrc https://share.tshuto.com/get/common-src/others/link/src/bashrc/my-"$bashrc_label_num".bashrc
}

function gitc() {
        local commit_str=${1:-"edit some files"}
        local dir_path=${2:-.}
        cd ~/public_html && git add $dir_path && git commit -m "$commit_str" && git push && clear
}


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