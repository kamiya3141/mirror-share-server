<?php

require_once '/home/tamura/public_html/php/utils/utils.php';

$mySubDomain = 'share';

date_default_timezone_set('Asia/Tokyo');

try {

	$base_dir = '/home/tamura/public_html/common-src/sites/blog';
	$pdo = new PDO('sqlite:' . $base_dir . '/database/blog.sqlite');

	$pdo->setAttribute(
		PDO::ATTR_ERRMODE,
		PDO::ERRMODE_EXCEPTION
	);

	$_get_data = json_decode($php_input, true);

	$title = $_get_data['title'] ?? '';
	$slug = date('YmdHis--') . $_get_data['slug'] ?? '';
	$file_name = $slug . '.md';
	$category = $_get_data['category'] ?? '';
	$tags = ('["' . implode('", "', $_get_data['tags']) . '"]') ?? '[]';
	$excerpt = $_get_data['excerpt'] ?? '';
	$content = $_get_data['content'] ?? '';
	$type = $_get_data['type'] ?? 'article';
	$status = $_get_data['status'] ?? 'draft';

	$put_file_name = $base_dir . '/md/' . $file_name;

	$resp = file_put_contents($put_file_name, $content);

	$now = date('Y-m-d H:i:s');

	$stmt = $pdo->prepare("
        INSERT INTO articles (
            title,
            slug,
            file_name,
            category,
            tags,
            excerpt,
            created_at,
            updated_at,
            type,
            status
        )
        VALUES (
            :title,
            :slug,
            :file_name,
            :category,
            :tags,
            :excerpt,
            :created_at,
            :updated_at,
            :type,
            :status
        )
    ");

	$stmt->execute([
		':title' => $title,
		':slug' => $slug,
		':file_name' => $file_name,
		':category' => $category,
		':tags' => $tags,
		':excerpt' => $excerpt,
		':created_at' => $now,
		':updated_at' => $now,
		':type' => $type,
		':status' => $status
	]);

	echo json_encode([
		'success' => true,
		'slug' => $slug
	]);
} catch (Exception $e) {

	echoErrorSite(404, $e->getMessage());

	echo json_encode([
		'success' => false,
		'error' => $e->getMessage()
	]);
}

exit;
