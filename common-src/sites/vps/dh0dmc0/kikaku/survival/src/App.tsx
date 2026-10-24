import { useEffect, useMemo, useState } from "react";

type Page = "home" | "fields" | "armory" | "operations" | "deployment" | "gallery";
type IconName = "home" | "map" | "target" | "rules" | "signal" | "image" | "arrow" | "search" | "reset" | "menu" | "close";

const LINE_OC_LINK = "https://line.me/ti/g2/2XnA3c1aEMY0FP-g5MDqPQ2obwsR8poLA4AyTg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
const LINE_OC_STR = `<a class="mydef--dash--my-a mydef--dash--my-a--type-0" href="${LINE_OC_LINK}"> マイクラ統合版マルチ 国造り鯖 </a>`;

const pages: { id: Page; label: string; code: string; icon: IconName }[] = [
	{ id: "home", label: "ホーム", code: "HOME", icon: "home" },
	{ id: "fields", label: "フィールド", code: "FIELDS", icon: "map" },
	{ id: "armory", label: "武器図鑑", code: "ARMORY", icon: "target" },
	{ id: "operations", label: "ルール・モード", code: "OPERATIONS", icon: "rules" },
	{ id: "deployment", label: "参加方法", code: "DEPLOYMENT", icon: "signal" },
	{ id: "gallery", label: "ギャラリー", code: "INTEL GALLERY", icon: "image" },
];

const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => {
	const paths: Record<IconName, React.ReactNode> = {
		home: (
			<>
				<path d="m3 10 9-7 9 7" />
				<path d="M5 9v11h14V9M9 20v-7h6v7" />
			</>
		),
		map: (
			<>
				<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
				<path d="M9 3v15M15 6v15" />
			</>
		),
		target: (
			<>
				<circle cx="12" cy="12" r="8" />
				<circle cx="12" cy="12" r="3" />
				<path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
			</>
		),
		rules: (
			<>
				<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
			</>
		),
		signal: (
			<>
				<path d="M4 18h2M8 14h2v4H8zM12 10h2v8h-2zM16 6h2v12h-2zM20 2h2v16h-2z" />
			</>
		),
		image: (
			<>
				<rect x="3" y="4" width="18" height="16" rx="1" />
				<circle cx="9" cy="10" r="2" />
				<path d="m3 17 5-4 4 3 3-2 6 4" />
			</>
		),
		arrow: (
			<>
				<path d="M5 12h14M14 7l5 5-5 5" />
			</>
		),
		search: (
			<>
				<circle cx="10" cy="10" r="6" />
				<path d="m15 15 5 5" />
			</>
		),
		reset: (
			<>
				<path d="M4 10a8 8 0 1 1 2 7M4 4v6h6" />
			</>
		),
		menu: <path d="M4 7h16M4 12h16M4 17h16" />,
		close: <path d="m6 6 12 12M18 6 6 18" />,
	};
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
			{paths[name]}
		</svg>
	);
};

const Status = ({ children, tone = "pending" }: { children: React.ReactNode; tone?: "pending" | "planned" | "muted" }) => (
	<span className={`status ${tone}`}>
		<span className="status-dot" />
		{children}
	</span>
);

const EmptyState = ({ type, text }: { type: string; text: string }) => (
	<div className="empty-state">
		<div className="empty-glyph">
			<span>＋</span>
		</div>
		<p className="eyebrow">NO {type} REGISTERED</p>
		<h3>登録データはありません</h3>
		<p>{text}</p>
		<div className="empty-line" />
	</div>
);

const SectionHead = ({ code, title, description }: { code: string; title: string; description: string }) => (
	<header className="section-head">
		<p className="eyebrow">
			<span>///</span> {code}
		</p>
		<h1>{title}</h1>
		<p>{description}</p>
	</header>
);

function Home({ go }: { go: (p: Page) => void }) {
	const cards = pages.slice(1);
	return (
		<div className="page home-page">
			<section className="hero">
				<div className="hero-art" role="img" aria-label="実際のワールド画像を配置するためのプレースホルダー">
					<div className="horizon" />
					<div className="block b1" />
					<div className="block b2" />
					<div className="block b3" />
					<span className="crosshair" />
					<div className="image-note">
						<Icon name="image" size={17} />
						<span>WORLD IMAGE / 準備中</span>
					</div>
				</div>
				<div className="hero-shade" />
				<div className="hero-content">
					<p className="eyebrow">
						<span>SYS://</span> BEDROCK TACTICAL WORLD
					</p>
					<h1>
						ENTER THE
						<br />
						<em>BATTLEFIELD</em>
					</h1>
					<p className="hero-jp">Minecraft Bedrock サバゲーワールド公式ポータル</p>
					<p className="hero-copy">
						フィールドを把握し、ルールを確認し、戦場へ参加する。
						<br />
						ワールドの最新情報とゲームに必要な情報をここに集約。
					</p>
					<div className="hero-actions">
						<button className="btn primary" onClick={() => go("fields")}>
							フィールドを確認 <Icon name="arrow" size={17} />
						</button>
						<button className="btn ghost" onClick={() => go("armory")}>
							武器図鑑を開く
						</button>
					</div>
				</div>
				<div className="hero-index">
					TN—00
					<br />
					<span>35.0000° N</span>
				</div>
			</section>
			<section className="status-strip" aria-label="プロジェクト状況">
				{[
					["WORLD ACCESS", "公開状態", "情報準備中", "pending"],
					["CUSTOM ADD-ON", "銃アドオン", "導入予定", "planned"],
					["FIELD DATABASE", "フィールド情報", "登録準備中", "pending"],
					["OPERATION RULES", "ルール公開", "情報準備中", "pending"],
				].map(([code, label, value, tone], i) => (
					<div className="status-item" key={code}>
						<span className="status-num">0{i + 1}</span>
						<div>
							<small>{code}</small>
							<strong>{label}</strong>
						</div>
						<Status tone={tone as "pending" | "planned"}>{value}</Status>
					</div>
				))}
			</section>
			<section className="menu-section">
				<div className="menu-heading">
					<div>
						<p className="eyebrow">/// SYSTEM MODULES</p>
						<h2>作戦情報へアクセス</h2>
					</div>
					<p>必要な情報を選択してください</p>
				</div>
				<div className="module-grid">
					{cards.map((item, i) => (
						<button className="module-card" key={item.id} onClick={() => go(item.id)}>
							<div className="module-top">
								<span>0{i + 1}</span>
								<Icon name={item.icon} size={26} />
							</div>
							<p className="eyebrow">{item.code}</p>
							<h3>{item.label}</h3>
							<p>{["登録された戦闘エリアの構造と情報を確認", "独自銃アドオンの装備情報を参照", "ゲーム参加前に規定とモードを確認", "接続情報と参加手順を確認", "ワールドの記録画像と映像を閲覧"][i]}</p>
							<span className="card-link">
								OPEN MODULE <Icon name="arrow" size={15} />
							</span>
						</button>
					))}
				</div>
			</section>
		</div>
	);
}

function DataToolbar({ kind }: { kind: "field" | "armory" | "gallery" }) {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
	const categoryOptions = kind === "field" ? ["すべてのカテゴリ", "屋外", "屋内", "市街地", "自然地形", "その他"] : kind === "armory" ? ["すべてのカテゴリ", "ハンドガン", "アサルトライフル", "サブマシンガン", "ショットガン", "スナイパーライフル", "その他"] : ["すべてのメディア", "スクリーンショット", "動画"];
	return (
		<div className="toolbar">
			<label className="search">
				<Icon name="search" size={18} />
				<span className="sr-only">検索</span>
				<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={kind === "field" ? "フィールド名を検索" : kind === "armory" ? "武器名を検索" : "タイトルを検索"} />
			</label>
			<label>
				<span className="sr-only">カテゴリ</span>
				<select value={category} onChange={(e) => setCategory(e.target.value)}>
					{categoryOptions.map((x, i) => (
						<option value={i ? x : "all"} key={x}>
							{x}
						</option>
					))}
				</select>
			</label>
			{kind !== "gallery" && (
				<label>
					<span className="sr-only">表示順</span>
					<select>
						<option>登録順</option>
						<option>名前順</option>
					</select>
				</label>
			)}
			<button
				className="reset"
				onClick={() => {
					setQuery("");
					setCategory("all");
				}}
			>
				<Icon name="reset" size={17} /> 条件をリセット
			</button>
		</div>
	);
}

function Fields() {
	return (
		<div className="page content-page">
			<SectionHead code="SECTOR DATABASE / 01" title="FIELDS" description="ワールド内の戦闘フィールド情報を検索・閲覧します。" />
			<DataToolbar kind="field" />
			<EmptyState type="FIELDS" text="フィールド情報は準備中です。登録後、この画面から地形や対応モードを確認できます。" />
		</div>
	);
}

function Armory() {
	return (
		<div className="page content-page">
			<SectionHead code="EQUIPMENT DATABASE / 02" title="ARMORY" description="独自銃アドオンの装備情報を確認するためのデータベースです。" />
			<div className="notice">
				<Status tone="planned">導入予定</Status>
				<div>
					<strong>独自銃アドオン</strong>
					<p>具体的な武器・性能・操作方法は未確定です。確認済みの情報のみ順次公開します。</p>
				</div>
			</div>
			<DataToolbar kind="armory" />
			<EmptyState type="WEAPONS" text="独自銃アドオンの導入に合わせて公開予定です。未確認の武器情報や性能値は掲載していません。" />
		</div>
	);
}

const ruleSections = ["基本ルール", "攻撃・被弾時の扱い", "リスポーン", "チーム分け", "禁止事項", "不具合・迷惑行為"];
function Operations() {
	const [open, setOpen] = useState<number | null>(0);
	const [tab, setTab] = useState<"rules" | "modes">("rules");
	return (
		<div className="page content-page">
			<SectionHead code="MISSION PROTOCOL / 03" title="OPERATIONS" description="参加前にゲームルールと採用モードを確認してください。" />
			<div className="tabs">
				<button className={tab === "rules" ? "active" : ""} onClick={() => setTab("rules")}>
					共通ルール
				</button>
				<button className={tab === "modes" ? "active" : ""} onClick={() => setTab("modes")}>
					ゲームモード
				</button>
			</div>
			{tab === "modes" ? (
				<EmptyState type="GAME MODES" text="採用ゲームモードは情報準備中です。決定後に勝利条件・人数・制限時間を公開します。" />
			) : (
				<div className="rules-layout">
					<nav className="toc" aria-label="ルール目次">
						<p className="eyebrow">INDEX</p>
						{ruleSections.map((x, i) => (
							<button key={x} onClick={() => setOpen(i)} className={open === i ? "active" : ""}>
								<span>0{i + 1}</span>
								{x}
							</button>
						))}
					</nav>
					<div className="accordion">
						{ruleSections.map((x, i) => (
							<div className="rule" key={x}>
								<button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
									<span>
										<b>0{i + 1}</b>
										{x}
									</span>
									<i>{open === i ? "−" : "＋"}</i>
								</button>
								{open === i && (
									<div className="rule-body">
										<Status>ルール準備中</Status>
										<p>内容は現在確認中です。確定した規定のみ、このセクションに掲載します。</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function Deployment() {
	const fields = [
		["サーバー名", "企画鯖:サバゲー"],
		["接続アドレス", "vps.tshuto.com"],
		["ポート番号", "12345"],
		["対応バージョン", "最新版"],
		["参加条件", LINE_OC_STR],
		["公開状態", "公開中"],
	];
	const steps = ["対応バージョンを確認", "必要な参加条件を確認", "サーバーを追加する方法を確認", "接続情報を入力", "ワールドへ参加"];
	return (
		<div className="page content-page">
			<SectionHead code="CONNECTION PROTOCOL / 04" title="DEPLOYMENT" description="Minecraft Bedrock Editionからワールドへ参加するための案内です。" />
			<div className="deployment-grid">
				<section className="panel">
					<div className="panel-title">
						<p className="eyebrow">CONNECTION DATA</p>
						<Status>未連携</Status>
					</div>
					{fields.map((x) => (
						<div className="data-row" key={x[0]}>
							<span>{x[0]}</span>
							<strong dangerouslySetInnerHTML={{ __html: x[1] }}></strong>
						</div>
					))}
					<button className="btn disabled" disabled>
						接続情報をコピー
					</button>
					<small>アドレス登録後にコピー機能が有効になります。</small>
				</section>
				<section className="steps">
					<p className="eyebrow">JOIN SEQUENCE</p>
					<h2>参加手順</h2>
					{steps.map((x, i) => (
						<div className="step" key={x}>
							<b>0{i + 1}</b>
							<div>
								<strong>{x}</strong>
								<p>{i < 2 ? "確認済みの情報が公開されるまでお待ちください。" : "サーバー設定の確定後に詳しい手順を掲載します。"}</p>
							</div>
						</div>
					))}
				</section>
			</div>
			<div className="notice addon">
				<Status tone="planned">導入予定</Status>
				<div>
					<strong>アドオンに関する案内</strong>
					<p>プレイヤー側で必要な操作、自動配布、リソースパック適用の有無は未確認です。確定後に掲載します。</p>
				</div>
			</div>
		</div>
	);
}

function Gallery() {
	return (
		<div className="page content-page">
			<SectionHead code="VISUAL ARCHIVE / 05" title="INTEL GALLERY" description="実際のワールドの景観やプレイ記録を閲覧するメディアアーカイブです。" />
			<DataToolbar kind="gallery" />
			<div className="placeholder-grid">
				{[1, 2, 3].map((i) => (
					<div className="media-placeholder" key={i}>
						<Icon name="image" size={30} />
						<span>WORLD MEDIA PLACEHOLDER</span>
						<small>実際の画像へ差し替え予定</small>
					</div>
				))}
			</div>
			<EmptyState type="MEDIA" text="ワールドのスクリーンショット・動画は準備中です。プレースホルダーは実際のワールド画像ではありません。" />
		</div>
	);
}

export default function App() {
	const initial = (location.hash.replace("#/", "") || "home") as Page;
	const [page, setPage] = useState<Page>(pages.some((p) => p.id === initial) ? initial : "home");
	const [mobileOpen, setMobileOpen] = useState(false);
	const current = useMemo(() => pages.find((p) => p.id === page)!, [page]);
	const go = (next: Page) => {
		setPage(next);
		setMobileOpen(false);
		location.hash = `/${next}`;
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	useEffect(() => {
		const fn = () => {
			const x = location.hash.replace("#/", "") as Page;
			if (pages.some((p) => p.id === x)) setPage(x);
		};
		addEventListener("hashchange", fn);
		return () => removeEventListener("hashchange", fn);
	}, []);
	return (
		<div className="app-shell">
			<aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
				<div className="brand" onClick={() => go("home")} role="button" tabIndex={0}>
					<div className="emblem">
						<span>TN</span>
					</div>
					<div>
						<strong>TACTICAL</strong>
						<small>NETWORK // BEDROCK</small>
					</div>
				</div>
				<nav>
					{pages.map((item, i) => (
						<button key={item.id} className={page === item.id ? "active" : ""} onClick={() => go(item.id)}>
							<span className="nav-code">0{i}</span>
							<Icon name={item.icon} />
							<span>
								<b>{item.code}</b>
								<small>{item.label}</small>
							</span>
						</button>
					))}
				</nav>
				<div className="side-bottom">
					<p>NETWORK STATUS</p>
					<Status>接続状態：未連携</Status>
					<small>DATA SOURCE / LOCAL</small>
				</div>
			</aside>
			{mobileOpen && <button className="backdrop" aria-label="メニューを閉じる" onClick={() => setMobileOpen(false)} />}
			<div className="main">
				<header className="topbar">
					<button className="mobile-menu" aria-label="ナビゲーションを開く" onClick={() => setMobileOpen(!mobileOpen)}>
						<Icon name={mobileOpen ? "close" : "menu"} />
					</button>
					<div className="breadcrumb">
						<span>TACTICAL NETWORK</span>
						<i>/</i>
						<strong>{current.code}</strong>
					</div>
					<div className="top-actions">
						<div>
							<small>WORLD LINK</small>
							<Status>未連携</Status>
						</div>
						<button className="btn compact" onClick={() => go("deployment")}>
							参加方法 <Icon name="arrow" size={15} />
						</button>
					</div>
				</header>
				<main>
					{page === "home" && <Home go={go} />} {page === "fields" && <Fields />} {page === "armory" && <Armory />} {page === "operations" && <Operations />} {page === "deployment" && <Deployment />} {page === "gallery" && <Gallery />}
				</main>
				<footer>
					<span>TACTICAL NETWORK // LOCAL DATA MODE</span>
					<span>実装済み：ポータルUI | 外部データ連携：未実装</span>
				</footer>
			</div>
		</div>
	);
}
