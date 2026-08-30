<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

//ecex($php_input);

$mySubDomain = 'share';

$base_dir = '/home/tamura/public_html/common-src/sites/blog';
$pdo = new PDO('sqlite:' . $base_dir . '/database/blog.sqlite');

$pdo->setAttribute(
	PDO::ATTR_ERRMODE,
	PDO::ERRMODE_EXCEPTION
);

$_get_data = json_decode($php_input, true);


$slug = $_get_data['slug'] ?? '';

if ($slug === '')
	throw new Exception('slug required');

$stmt = $pdo->prepare("
		SELECT *
		FROM articles
		WHERE slug = :slug
	");

$stmt->execute([
	':slug' => $slug
]);

$article = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$article)
	throw new Exception('article not found');

$title = $_get_data['title'] ?? $article['title'];

$category = $_get_data['category'] ?? $article['category'];

$tags = ('["' . implode('", "', $_get_data['tags']) . '"]') ?? $article['tags'];

$excerpt = $_get_data['excerpt'] ?? $article['excerpt'];

$type = $_get_data['type'] ?? $article['type'];

$status = $_get_data['status'] ?? $article['status'];

$content = $_get_data['content'] ?? null;

$allowed_types = [
	'article',
	'backup'
];

$allowed_status = [
	'published',
	'privated',
	'draft',
	'deleted'
];

if (!in_array($type, $allowed_types))
	throw new Exception('invalid type');

if (!in_array($status, $allowed_status))
	throw new Exception('invalid status');

// 正式な記事ではないのに公開設定になっているならprivatedにおとす
if ($type == 'backup' && $status == 'published')
	$status = 'privated';

$now = date('Y-m-d H:i:s');

$stmt = $pdo->prepare("
		UPDATE articles
		SET
			title = :title,
			category = :category,
			tags = :tags,
			excerpt = :excerpt,
			updated_at = :updated_at,
			type = :type,
			status = :status
		WHERE slug = :slug
	");

$stmt->execute([
	':title' => $title,
	':category' => $category,
	':tags' => $tags,
	':excerpt' => $excerpt,
	':updated_at' => $now,
	':type' => $type,
	':status' => $status,
	':slug' => $slug
]);

if ($content !== null) {
	$path = $base_dir . '/md/' . $article['file_name'];
	file_put_contents($path, $content);
}

$file_path = url_join(__DIR__, '../../', 'cache', $slug . '.html');
$api_url = url_join(getMyHostName('api'), '/express/browser-view/cache/blog');
$html = forwardRemoteFile("{$api_url}?id={$slug}", false, false, "html", true);
$result = file_put_contents($file_path, $html);
if (!$result)
	echoErrorSite(500, error_get_last()['message']);
else
	echo json_encode(['success' => true]);
