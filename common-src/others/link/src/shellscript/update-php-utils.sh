#!/bin/bash

if [ ! -d ~/public_html/php/utils ]; then
	mkdir -p ~/public_html/php/utils
fi

wget -qO ~/public_html/php/utils/utils.php https://share.tshuto.com/php/utils/utils.php
wget -qO ~/public_html/php/utils/api-local-getDirContents.php https://share.tshuto.com/php/utils/api-local-getDirContents.php
wget -qO ~/public_html/php/utils/script.php https://share.tshuto.com/php/utils/script.php

MY_SUBDOMAIN=${1:-share};

htaccess_content=$(wget -qO- https://link.tshuto.com/src/htaccess/my.htaccess)

echo "$htaccess_content" | sed "s/RPL_HTACC/$MY_SUBDOMAIN/gi"