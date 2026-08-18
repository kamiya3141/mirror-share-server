<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

$mySubDomain = 'share';

if (!isset($_GET['slug']))
	echoErrorSite(403, 'Direct access forbidden');

$pdo = new PDO(
	'sqlite:/home/tamura/public_html/common-src/sites/blog/database/blog.sqlite'
);

$stmt = $pdo->prepare("
    SELECT *
    FROM articles
    WHERE slug = :slug
");

$stmt->execute([
	':slug' => $_GET['slug']
]);

$article = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$article)
	echoErrorSite(404, '記事が存在しません');

$file_path = '/home/tamura/public_html/common-src/sites/blog/md/' . $article['file_name'];
$file_content = file_get_contents($file_path);

$article['tags'] = json_decode($article['tags']);

$add_article_data = [
	'content' => $file_content
];

$article_data = array_merge($add_article_data, $article);

echo json_encode($article_data);

exit;
