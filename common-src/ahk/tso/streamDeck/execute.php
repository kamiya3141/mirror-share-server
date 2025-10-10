<?php

// めんどくさくなってchatgptを頼った部分があるよ

// 自分自身のへのアクセス拒否
if ($_SERVER['SCRIPT_FILENAME'] === __FILE__ && getenv('REDIRECT_FROM_REWRITE') !== '1') {
	http_response_code(403);
	exit('Direct access forbidden');
}
