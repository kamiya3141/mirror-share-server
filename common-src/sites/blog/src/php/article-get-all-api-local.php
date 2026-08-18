<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

$mySubDomain = 'share';

$pdo = new PDO('sqlite:/home/tamura/public_html/common-src/sites/blog/database/blog.sqlite');

$stmt = $pdo->query("
    SELECT *
    FROM articles
");

$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$articles)
	echoErrorSite(404, '記事一覧の取得に失敗しました');
/*
foreach ($articles as $article) {

	$file_path = '/home/tamura/public_html/common-src/sites/blog/md/' . $article['file_name'];
	$file_content = file_get_contents($file_path);

	$article['tags'] = json_decode($article['tags']);

	$add_article_data = [
		'content' => $file_content
	];

	$article_data = array_merge($add_article_data, $article);
	$article = $article_data;
}
*/
echo json_encode($articles);

exit;
