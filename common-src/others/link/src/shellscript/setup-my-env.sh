#!/bin/bash

bashrc_path="/home/${USER}/.bashrc"
bash_aliases_path="/home/${USER}/.bash_aliases"

my_update_cache="/home/${USER}/.update-utils"

sudo touch "${bash_aliases_path}"
sudo chmod 755 "${bash_aliases_path}"
sudo chown ${USER}:${USER} "${bash_aliases_path}"
wget --no-cache -qO - https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/bash_aliases/my.bash_aliases > "${bash_aliases_path}"


if [ -f "${bashrc_path}" ]; then
	bashrc_contents=$(cat "${bashrc_path}")
	if [[ "${bashrc_contents}" != *"my.bashrc"* ]]; then
		echo -e "\nif [ -f ~/my.bashrc ]; then\n\tsource ~/my.bashrc\nfi\n\nexport TERM=xterm-256color" >> "${bashrc_path}"
	fi
fi

# . "${bashrc_path}"
# . "${bash_aliases_path}"

shopt -s expand_aliases
source ~/.bashrc

wgmbr 9

apis locales
sudo dpkg-reconfigure locales

echo -e "\nexport LANG=ja_JP.UTF-8\nexport LC_ALL=ja_JP.UTF-8\n\nclear\n" >> "${bashrc_path}"

up-apt

echo -e "\a\nfinished !!\n"
