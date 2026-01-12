#!/bin/bash

my_update_cache="${HOME}/.update-utils"
sub_domain="${1}"
update_remote_url="${2}"

my_base_path="${HOME}/public_html"
php_utils_path="${my_base_path}/php/utils"

if [ ! -e "${my_update_cache}" ]; then
	touch "${my_update_cache}"
	echo -en "\n\n" > "${my_update_cache}"
fi

_sbdm=$(head -n 1 "${my_update_cache}")
if [ ! "${sub_domain}" ] || [ ! "${_sbdm}" ]; then
	sub_domain="none"
elif [ "${sub_domain}" == none ]; then
	sub_domain="${_sbdm}"
fi

sed -i "1s/.*/${sub_domain}/i" "${my_update_cache}"

sub_domain=$(head -n 1 "${my_update_cache}")

if [ ! -d "${php_utils_path}" ]; then
	mkdir -p "${php_utils_path}"
fi
php_utils_base_url="$update_remote_url/phpscript/utils"
wget -q --no-cache -O "${php_utils_path}/utils.php" "${php_utils_base_url}"/utils.php
wget -q --no-cache -O "${php_utils_path}/api-local-getDirContents.php" "${php_utils_base_url}"/api-local-getDirContents.php
wget -q --no-cache -O "${php_utils_path}/script.php" "${php_utils_base_url}"/script.php

sed -i "s/--MYSUBDOMAIN--/${sub_domain}/i" "${php_utils_path}/utils.php"

MY_SUBDOMAIN="${sub_domain}";
htaccess_content=$(wget --no-cache -qO- "${update_remote_url}"/htaccess/my.htaccess)
result_htaccess=$(echo -e "${htaccess_content}" | sed -e "s/RPL_HTACC/${MY_SUBDOMAIN}/gi")
add_htaccess=$(echo -e "${result_htaccess}" | tail -n 3)
htaccess_path="${my_base_path}/.htaccess"
myhtaccess_path="${my_base_path}/my.htaccess"
if [ -e "${htaccess_path}" ]; then
	my_htaccess=$(cat "${htaccess_path}")
	if [[ "${my_htaccess}" != *"/php/utils/script.php"* ]]; then
		echo -n "${result_htaccess}" > "${myhtaccess_path}"
	fi
else
	echo -n "${result_htaccess}" > "${htaccess_path}"
fi
