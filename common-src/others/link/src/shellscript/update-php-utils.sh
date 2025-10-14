#!/bin/bash

if [ ! -d ~/public_html/php/utils ]; then
	mkdir -p ~/public_html/php/utils
fi

wget -q --no-cache -O ~/public_html/php/utils/utils.php https://share.tshuto.com/php/utils/utils.php
wget -q --no-cache -O ~/public_html/php/utils/api-local-getDirContents.php https://share.tshuto.com/php/utils/api-local-getDirContents.php
wget -q --no-cache -O ~/public_html/php/utils/script.php https://share.tshuto.com/php/utils/script.php

MY_SUBDOMAIN=${1:-share};
htaccess_content=$(wget -qO- https://link.tshuto.com/src/htaccess/my.htaccess)
result_htaccess=$(echo "$htaccess_content" | sed -e "s/RPL_HTACC/$MY_SUBDOMAIN/gi")
add_htaccess=$(echo "$result_htaccess" | tail -n 2)
htaccess_path=~/public_html/.htaccess

if [ -e "$htaccess_path" ]; then
	echo "$add_htaccess" >> "$htaccess_path"
else
	echo "$result_htaccess" > "$htaccess_path"
fi