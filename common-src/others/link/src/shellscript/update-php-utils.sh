#!/bin/bash

if [ ! -d ~/public_html/php/utils ]; then
	mkdir -p ~/public_html/php/utils
fi

wget -qO ~/public_html/php/utils/utils.php https://share.tshuto.com/php/utils/utils.php
wget -qO ~/public_html/php/utils/api-local-getDirContents.php https://share.tshuto.com/php/utils/api-local-getDirContents.php

