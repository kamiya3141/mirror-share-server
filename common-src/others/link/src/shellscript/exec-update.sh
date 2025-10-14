#!/bin/bash

my_update_sh=~/update-php-utils.sh

wget -q --no-cache -O "$my_update_sh" https://link.tshuto.com/src/shellscript/update-php-utils.sh

bash "$my_update_sh" "${1:-none}"