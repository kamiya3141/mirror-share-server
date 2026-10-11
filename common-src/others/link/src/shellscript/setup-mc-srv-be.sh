#!/bin/bash
set -e

mcsrv="mc-srv-be"
mcsrv_path="/srv/${mcsrv}"
mcsrv_zip_url="https://www.minecraft.net/bedrockdedicatedserver/bin-linux/bedrock-server-1.26.52.3.zip"
mcsrv_zip_fn="./be-server.zip"
mcsrv_svc="${mcsrv}"

backup_mcsrv_sh_path="/usr/local/bin/backup-mc-srv-be.sh"
my_1_bash_aliases_path="/home/${USER}/my-1.bash_aliases"
crontab_str="0 5 * * * /usr/local/bin/backup-mc-srv-be.sh"

function wgnc() {
	local remote_filename="${1:-null}"
	local local_filename="${2:-null}"
	if [ "$remote_filename" == "null" -o "$local_filename" == "null" ]; then
		return 1
	fi
	sudo wget --no-cache -q "https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src/${remote_filename}" -O ${local_filename}
	return 0
}
function mkdirp755() {
	sudo mkdir -p -m 755 $@
}

mkdirp755 "${mcsrv_path}"
sudo chown ${USER}:${USER} "${mcsrv_path}"
cd "${mcsrv_path}"

sudo wget --no-cache -q "${mcsrv_zip_url}" -O "${mcsrv_zip_fn}"
sudo unzip "${mcsrv_zip_fn}"
sudo rm "${mcsrv_zip_fn}"

cd ..
sudo chmod 755 -R ./*
sudo chmod +x "${mcsrv_path}/bedrock_server"

sudo tee /etc/systemd/system/$mcsrv_svc.service > /dev/null << EOF
[Unit]
Description=Minecraft Bedrock Server
After=network.target

[Service]
Type=simple
User=tamura
Group=tamura
WorkingDirectory=$mcsrv_path
ExecStart=$mcsrv_path/bedrock_server
Restart=always
RestartSec=10
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable "${mcsrv_svc}"
# sudo systemctl start "${mcsrv_svc}"

wgnc "bash_aliases/mc-srv-be.bash_aliases" "${my_1_bash_aliases_path}"

wgnc "shellscript/backup-mc-srv-be.sh" "${backup_mcsrv_sh_path}"
sudo chmod +x "${backup_mcsrv_sh_path}"

sudo apt update -y
sudo apt install -y rclone
sudo rclone config

(sudo crontab -l 2>/dev/null; echo "${crontab_str}") | sudo crontab -

echo -e "\nfinish!!\n"