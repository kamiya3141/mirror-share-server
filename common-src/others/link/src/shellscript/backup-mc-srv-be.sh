#!/bin/bash
set -e

systemctl stop mc-srv-be

rsync -aHAX --delete /srv/mc-srv-be/ /srv/mc-srv-be.bak/

systemctl start mc-srv-be

cd /srv

if [ -f mc-srv-be.bak.zip ]; then
        rm mc-srv-be.bak.zip
fi

zip -r mc-srv-be.bak.zip mc-srv-be.bak

send_file_name="$(hostname).bak.zip"

mv mc-srv-be.bak.zip "${send_file_name}"

rclone copy "/srv/${send_file_name}" shuuto-nextcloud:Other-Data/ --webdav-nextcloud-chunk-size 10M --bwlimit 10M -P