<?php

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

if (!$article) {
	exit('記事が存在しません');
}

$path = '/home/tamura/public_html/common-src/sites/blog/md/' .
	$article['file_name'];

$content = file_get_contents($path);

echo '<h1>' . htmlspecialchars($article['title']) . '</h1>';

echo '<pre>';
echo htmlspecialchars($content);
echo '</pre>';
