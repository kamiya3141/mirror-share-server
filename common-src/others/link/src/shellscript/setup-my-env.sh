#!/bin/bash

profile_path="/home/${USER}/.profile"
bashrc_path="/home/${USER}/.bashrc"
bash_aliases_path="/home/${USER}/.bash_aliases"
my_bashrc_path="/home/${USER}/my.bashrc"
my_0_bash_aliases_path="/home/${USER}/my-0.bash_aliases"

my_update_cache="/home/${USER}/.update-utils"

sudo touch "${bash_aliases_path}"
sudo chmod 755 "${bash_aliases_path}"
sudo chown ${USER}:${USER} "${bash_aliases_path}"
wget --no-cache -qO - https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/bash_aliases/my.bash_aliases > "${bash_aliases_path}"


if [ -f "${bashrc_path}" ]; then
	bashrc_contents=$(cat "${bashrc_path}")
	if [[ "${bashrc_contents}" != *"my.bashrc"* ]]; then
		echo -e "\nif [ -f ~/my.bashrc ]; then\n\t. ~/my.bashrc\nfi\nif [ -f ~/my-*.bash_aliases ]; then\n\t. ~/my-*.bash_aliases\nfi\n\nexport TERM=xterm-256color" >> "${bashrc_path}"
	fi
fi



sudo apt install -y locales
sudo dpkg-reconfigure locales


echo -e "\nexport LANG=ja_JP.UTF-8\nexport LC_ALL=ja_JP.UTF-8\n\nclear\n" >> "${bashrc_path}"


sudo apt install -y parted rsync curl gpg mc screen


sudo mc
mc


wget https://share.tshuto.com/.hide/.debian/.screenrc -O ~/.screenrc

echo -e '\nif [ -z "$STY" ] && [ "$TERM" != "dumb" ]; then\n\tscreen -xRR\nfi' | sudo tee -a "${profile_path}"


sudo touch "${my_0_bash_aliases_path}"
sudo chmod 755 "${my_0_bash_aliases_path}"
echo -e 'alias rmba=". ~/my-*.bash_aliases && clear"\nalias emba="sudo nano ~/my-0.bash_aliases && rmba"' | sudo tee -a "${my_0_bash_aliases_path}"

wget --no-cache -qO - https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/bashrc/my-7.bashrc >> "${my_bashrc_path}"

sudo apt update
sudo apt -y upgrade
sudo apt -y autoremove
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y autoremove


read -p "cloudflaredをインストールしますか？	Y / (N): " -n 1 _val
_val=${_val:-Y}
case "$_val" in
	Y|y)
		_val="Y"
	;;
	*)
		_val="B"
	;;
esac

if [[ $_var == Y ]]; then
	echo -e "\nYesが選択されました"
	sudo mkdir -p --mode=0755 /usr/share/keyrings
	curl -fsSL https://pkg.cloudflare.com/cloudflare-public-v2.gpg | sudo tee /usr/share/keyrings/cloudflare-public-v2.gpg >/dev/null
	echo 'deb [signed-by=/usr/share/keyrings/cloudflare-public-v2.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
	sudo apt update
	sudo apt -y install cloudflared
	echo -e "\nCloudflaredのインストールが終了しました\n"
fi


echo -e "\a\nfinished !!\n"
