#!/bin/bash

my_update_sh=~/update-php-utils.sh
my_update_cache=~/.update-utils

sub_domain="${1:-none}"
wget -q --no-cache -O "$my_update_sh" https://link.tshuto.com/src/shellscript/update-php-utils.sh

if [ ! -e "$my_update_cache" ]; then
	touch "$my_update_cache"
fi

_sbdm=$(head -n 1 "$my_update_cache")
if [ -z "$_sbdm" ]; then
	sub_domain="share"
else
	sub_domain="$_sbdm"
fi

if [ "$sub_domain" != none ]; then
	echo -n "$sub_domain" > "$my_update_cache"
fi

bash "$my_update_sh" "$sub_domain"