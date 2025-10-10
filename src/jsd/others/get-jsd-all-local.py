import os
import re

def get_latest_version_folder(path: str) -> str | None:
	# ディレクトリ一覧を取得
	dirs = os.listdir(path)

	# 正規表現で x.y.z 形式の名前だけをフィルタ
	pattern = re.compile(r'^\d+\.\d+\.\d+$')
	versions = [d for d in dirs if pattern.match(d)]

	if not versions:
		return None  # 対応するフォルダがない場合

	# バージョンを数値タプルに変換して比較
	def parse_version(v: str):
		return tuple(map(int, v.split('.')))

	latest = max(versions, key=parse_version)
	return latest


base_path = "./../../../common-src/javascript/def/";
path_list = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))];
export_path = [];
for path in path_list:
	latest_version = get_latest_version_folder(f"{base_path}{path}")
	print("最新バージョン:", path, latest_version)
	export_path.append(f"{base_path}{path}/{latest_version}/{path}");
	print(export_path[-1]);

with open("./jsd-all.txt", mode="w", encoding="utf-8") as f:
	f.write(",".join(export_path));

input("エンターキーを押してください・・・");