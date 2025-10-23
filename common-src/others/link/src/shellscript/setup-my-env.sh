#!/bin/bash

sudo touch ~/.bash_aliases
sudo chmod 755 ${HOME}/.bash_aliases
sudo chown ${USER}:${USER} ${HOME}/.bash_aliases
wget --no-cache -qO - https://link.tshuto.com/src/bash_aliases/my.bash_aliases > ${HOME}/.bash_aliases

bashrc_path="${HOME}/.bashrc"

if [ -f "${bashrc_path}" ]; then
	bashrc_contents=$(cat "${bashrc_path}")
	if [[ "${bashrc_contents}" != *"my.bashrc"* ]]; then
		echo -e "if [ -f ~/my.bashrc ]; then\n\tsource ~/my.bashrc\nfi" >> "${bashrc_path}"
	fi
fi

source "${bashrc_path}"