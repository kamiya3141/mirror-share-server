#!/bin/bash

my_update_cache="$HOME/.update-utils"
sub_domain="$1"

if [ ! -e "$my_update_cache" ]; then
	touch "$my_update_cache"
fi

_sbdm=$(head -n 1 "$my_update_cache")
if [ -z "$_sbdm" ]; then
	_sbdm="share"
fi
if [ "$sub_domain" == none ]; then
	sub_domain="$_sbdm"
fi

echo "$sub_domain" > "$my_update_cache"


if [ ! -d "$HOME/public_html/php/utils" ]; then
	mkdir -p "$HOME/public_html/php/utils"
fi

wget -q --no-cache -O ~/public_html/php/utils/utils.php https://share.tshuto.com/get/common-src/others/link/src/php/utils/utils.php
wget -q --no-cache -O ~/public_html/php/utils/api-local-getDirContents.php https://share.tshuto.com/get/common-src/others/link/src/php/utils/api-local-getDirContents.php
wget -q --no-cache -O ~/public_html/php/utils/script.php https://share.tshuto.com/get/common-src/others/link/src/php/utils/script.php

sed -i "s/mySubDomain = ''/mySubDomain = '$MY_SUBDOMAIN'/i" ~/public_html/php/utils/utils.php

MY_SUBDOMAIN="$sub_domain";
htaccess_content=$(wget -qO- https://link.tshuto.com/src/htaccess/my.htaccess)
result_htaccess=$(echo -e "$htaccess_content" | sed -e "s/RPL_HTACC/$MY_SUBDOMAIN/gi")
add_htaccess=$(echo -e "$result_htaccess" | tail -n 3)
htaccess_path="$HOME/public_html/.htaccess"

if [ -e "$htaccess_path" ]; then
	my_htaccess=$(cat "$htaccess_path")
	if [[ "$my_htaccess" != *"/php/utils/script.php"* ]]; then
		echo -e "\n\n$add_htaccess" >> "$htaccess_path"
	fi
else
	echo -n "$result_htaccess" > "$htaccess_path"
fi