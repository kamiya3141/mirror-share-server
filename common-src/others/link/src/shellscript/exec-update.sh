#!/bin/bash

my_update_sh=~/update-php-utils.sh
my_update_remote_url="https://raw.githubusercontent.com/kamiya3141/mirror-share-server/refs/heads/main/common-src/others/link/src"

if [ "$MY_UPDATE_REMOTE_URL" ]; then
	my_update_remote_url="$MY_UPDATE_REMOTE_URL"
fi

wget -q --no-cache -O "$my_update_sh" "$my_update_remote_url"/shellscript/update-php-utils.sh
bash "$my_update_sh" none "$my_update_remote_url"