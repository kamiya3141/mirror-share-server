import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type IconName = "arrow" | "book" | "castle" | "chevron" | "coin" | "compass" | "flag" | "flame" | "map" | "menu" | "search" | "shield" | "store" | "users" | "x" | "LINE";

const LINE_OC_LINK = "https://line.me/ti/g2/2XnA3c1aEMY0FP-g5MDqPQ2obwsR8poLA4AyTg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default";
const LINE_OC_STR = `<a class="mydef--dash--my-a mydef--dash--my-a--type-0" href="${LINE_OC_LINK}"> マイクラ統合版マルチ 国造り鯖 </a>`;
const LINE_OC_STR_NO_DECO = LINE_OC_STR.replace("--type-0", "--type-1");

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
	const svg_viewBox_size = 24;
	const paths: Record<IconName, React.ReactNode> = {
		arrow: (
			<>
				<path d="M5 12h14" />
				<path d="m13 6 6 6-6 6" />
			</>
		),
		book: (
			<>
				<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
				<path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />{" "}
			</>
		),
		castle: (
			<>
				<path d="M5 22V9l3 2V6l4 3 4-3v5l3-2v13" />
				<path d="M3 22h18M9 22v-5a3 3 0 0 1 6 0v5" />{" "}
			</>
		),
		chevron: <path d="m9 18 6-6-6-6" />,
		coin: (
			<>
				<ellipse cx="12" cy="6" rx="7" ry="3" /> <path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
			</>
		),
		compass: (
			<>
				<circle cx="12" cy="12" r="9" /> <path d="m15.5 8.5-2 5-5 2 2-5z" />
			</>
		),
		flag: (
			<>
				<path d="M5 22V4" />
				<path d="M5 5h11l-2 4 2 4H5" />{" "}
			</>
		),
		flame: <path d="M12 22c4 0 7-2.8 7-6.8 0-3.1-1.8-5.4-4.5-8.2-.2 2-1 3.2-2.1 4.2.1-3.8-1.8-6.5-4.1-8.2.2 3.8-3.3 6.5-3.3 11.3C5 18.8 8.1 22 12 22Z" />,
		map: (
			<>
				<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
				<path d="M9 3v15M15 6v15" />{" "}
			</>
		),
		menu: (
			<>
				<path d="M4 7h16M4 12h16M4 17h16" />
			</>
		),
		search: (
			<>
				<circle cx="11" cy="11" r="7" /> <path d="m20 20-4-4" />
			</>
		),
		shield: <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />,
		store: (
			<>
				<path d="M4 10v10h16V10M3 10l2-6h14l2 6" />
				<path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 20v-6h6v6" />{" "}
			</>
		),
		users: (
			<>
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" /> <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
			</>
		),
		x: (
			<>
				<path d="m6 6 12 12M18 6 6 18" />
			</>
		),
		LINE: (
			<>
				<image href="https://file-nextcloud.tshuto.com/image/icon-png/LINE_Brand_icon/LINE_64.png" x="0" y="0" width={svg_viewBox_size} height={svg_viewBox_size} preserveAspectRatio="xMidYMid slice" />
			</>
		),
	};
	return (
		<svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${svg_viewBox_size} ${svg_viewBox_size}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
			{" "}
			{paths[name]}{" "}
		</svg>
	);
}

const navItems = [
	["ホーム", "#home"],
	["サーバーについて", "#about"],
	["国保護", "#kunihogo"],
	["経済システム", "#economy"],
	["国家情報", "#portal"],
	["お知らせ", "#news"],
	["プレイガイド", "#guide"],
] as const;

const guideItems = [
	{ title: "サーバーへの参加方法", description: "対応バージョンや接続情報、参加条件を確認します。", category: "はじめに", icon: "compass" as IconName, status: `${LINE_OC_STR_NO_DECO}にて説明します。` },
	{ title: "サーバールール", description: "コミュニティで守る基本方針を掲載する予定です。", category: "ルール", icon: "book" as IconName, status: `${LINE_OC_STR_NO_DECO}にて説明します。` },
	{ title: "国保護の使い方", description: "正式な操作手順の確認後に公開します。架空のコマンドは掲載していません。", category: "KuniHogo", icon: "shield" as IconName, status: `${LINE_OC_STR_NO_DECO}にて説明します。` },
	{ title: "経済システムの使い方", description: "導入済みの経済アドオンに沿った案内を準備しています。", category: "経済", icon: "coin" as IconName, status: `${LINE_OC_STR_NO_DECO}にて説明します。` },
	{ title: "トラブル時の確認事項", description: "接続やゲームプレイで困ったときの確認手順です。", category: "サポート", icon: "compass" as IconName, status: `${LINE_OC_STR_NO_DECO}にて説明します。` },
	{ title: "よくある質問", description: "参加前・プレイ中の疑問を項目別に確認できます。", category: "サポート", icon: "book" as IconName, status: "このページで確認" },
];

const faqItems = [
	["サーバーへの参加方法は？", `対応バージョン、サーバーアドレス、ポート番号を含む接続情報は${LINE_OC_STR}にて説明します。`],
	["国保護システムはどのように利用する？", `操作説明は${LINE_OC_STR}に参加後説明します。ここではコマンドや操作方法を掲載していません。`],
	["保護領域では何が保護される？", "爆発・炎上、ダメージなどに関する保護処理があります。（落下ダメージは対象外）対象のエンティティ、領域、イベント、設定などにより動作が異なる可能性があります。"],
	["経済システムはどのように利用する？", `詳細は${LINE_OC_STR}にて順次掲載します。`],
	["サーバールールはどこで確認できる？", `${LINE_OC_STR}にて確認できます。`],
];

function Brand() {
	return (
		<a className="brand" href="#home" aria-label="国造りサーバー ポータル ホーム">
			{" "}
			<span className="brand-mark">
				{" "}
				<Icon name="castle" size={25} />{" "}
			</span>
			<span>
				<b>国造りサーバー</b>
				<small>BEDROCK OFFICIAL PORTAL </small>
			</span>{" "}
		</a>
	);
}

function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
	return (
		<div className={`section-heading ${align === "center" ? "center" : ""}`}>
			{" "}
			<span className="eyebrow">
				{" "}
				<i />
				{eyebrow}
			</span>{" "}
			<h2>{title} </h2>
			{description && <p>{description}</p>}{" "}
		</div>
	);
}

function StatusBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="status-badge">
			{" "}
			<span />
			{children}
		</span>
	);
}

function Header() {
	const [open, setOpen] = useState(false);
	return (
		<header className="site-header">
			{" "}
			<div className="header-inner">
				{" "}
				<Brand />
				<nav className="desktop-nav" aria-label="メインナビゲーション">
					{navItems.map(([label, href]) => (
						<a key={href} href={href}>
							{label}
						</a>
					))}{" "}
				</nav>
				<a className="button button-gold header-cta" href="#join">
					参加方法
					<Icon name="arrow" size={17} />
				</a>
				<a className="button button-lightgreen header-cta" href={LINE_OC_LINK}>
					LINEオプチャに参加
					<Icon name="LINE" size={24} />
				</a>
				<button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "メニューを閉じる" : "メニューを開く"}>
					<Icon name={open ? "x" : "menu"} size={24} />{" "}
				</button>
			</div>{" "}
			{open && (
				<nav className="mobile-nav" id="mobile-nav" aria-label="モバイルナビゲーション">
					{" "}
					{navItems.map(([label, href]) => (
						<a key={href} href={href} onClick={() => setOpen(false)}>
							{" "}
							{label} <Icon name="chevron" size={17} />{" "}
						</a>
					))}
					<a className="button button-gold" href="#join" onClick={() => setOpen(false)}>
						参加方法を見る
					</a>
					<a className="button button-lightgreen" href={LINE_OC_LINK} onClick={() => setOpen(false)}>
						LINEオプチャに参加
						<Icon name="LINE" size={24} />
					</a>{" "}
				</nav>
			)}
		</header>
	);
}

function Hero() {
	return (
		<section className="hero" id="home">
			{" "}
			<div className="hero-grid" />{" "}
			<div className="hero-content">
				{" "}
				<span className="hero-kicker">
					{" "}
					<Icon name="flag" size={16} /> MINECRAFT BEDROCK EDITION{" "}
				</span>
				<h1>
					自分の国を築き
					<br /> <em>世界に名を刻め</em>
				</h1>{" "}
				<p>
					土地を守り、経済を動かし、仲間と国家を発展させる
					<br className="desktop-only" /> ここから、自分たちだけの国造りが始まる
				</p>
				<br />
				<a className="button button-lightgreen" href={LINE_OC_LINK}>
					LINEオプチャに参加
					<Icon name="LINE" size={24} />
				</a>
				<br />
				<div className="hero-actions">
					<a className="button button-gold" href="#about">
						サーバーについて
						<Icon name="arrow" size={18} />
					</a>
					<a className="button button-outline" href="#join">
						参加方法を見る
					</a>
				</div>
				<div className="hero-features">
					{[
						["shield", "国造りと領土保護", "独自アドオン KuniHogo, BlockAdd"],
						["coin", "経済活動と資源管理", "独自アドオン EcoPhone"],
						["users", "仲間と進める国家の発展", "協力して築く世界"],
					].map(([icon, title, sub]) => (
						<div className="hero-feature" key={title}>
							{" "}
							<span>
								<Icon name={icon as IconName} size={22} />{" "}
							</span>
							<div>
								<b>{title}</b> <small>{sub} </small>
							</div>{" "}
						</div>
					))}
				</div>{" "}
			</div>
			<div className="image-note">SERVER IMAGE — サービス開始後に実際の画像へ差し替え予定</div>{" "}
		</section>
	);
}

function Features() {
	const cards = [
		{ icon: "shield" as IconName, number: "01", title: "国造りと領土保護", text: "独自開発アドオン「KuniHogo」により、保護された土地でのプレイヤー活動を管理。築いた街や建築を守り、継続的な国造りを支えます。", link: "#kunihogo" },
		{ icon: "coin" as IconName, number: "02", title: "経済活動", text: "経済アドオンを通じて、資源やアイテムを活かした活動を楽しめます。具体的な機能は、確認済みの仕様に沿って順次ご案内します。", link: "#economy" },
		{ icon: "castle" as IconName, number: "03", title: "国家の発展", text: "建築、資源採集、農業、街づくり。仲間と役割を分担しながら、自分たちの手で国家の風景と歴史を築いていきます。", link: "#guide" },
	];
	return (
		<section className="section" id="about">
			{" "}
			<div className="container">
				{" "}
				<SectionHeading eyebrow="ABOUT THE SERVER" title="ひとつの拠点から、国家へ。" description="領土を守り、資源を活かし、人が集う街を築く。長く続く国造りを支える、3つの柱があります。" />{" "}
				<div className="feature-grid">
					{" "}
					{cards.map((card) => (
						<article className="feature-card" key={card.number}>
							{" "}
							<div className="card-top">
								{" "}
								<span className="icon-box">
									{" "}
									<Icon name={card.icon} size={27} />{" "}
								</span>
								<span className="card-number">{card.number}</span>{" "}
							</div>
							<h3>{card.title}</h3> <p>{card.text} </p>
							<a className="text-link" href={card.link}>
								詳しく見る <Icon name="arrow" size={16} />{" "}
							</a>
						</article>
					))}{" "}
				</div>
			</div>{" "}
		</section>
	);
}

function KuniHogo() {
	const items = [
		["shield", "国保護の仕組み", "保護された領域に応じて、プレイヤー活動を制御する仕組みを提供します。"],
		["flame", "ダメージへの対策", "爆発、火災、落下ダメージなどに関する保護処理が実装されています。"],
		["users", "操作とタグ管理", "プレイヤーの操作やタグを用いた、アドオン内の制御機能を備えています。"],
	] as const;
	return (
		<section className="section section-alt" id="kunihogo">
			{" "}
			<div className="container split-layout">
				{" "}
				<div className="protection-visual" aria-label="城壁で守られた保護領域の模式図">
					{" "}
					<div className="map-lines" /> <span className="coordinate coordinate-a"> X: 240 </span>
					<span className="coordinate coordinate-b">Z: -128</span> <div className="protection-ring ring-outer" /> <div className="protection-ring ring-inner" />{" "}
					<div className="shield-core">
						{" "}
						<Icon name="shield" size={48} />{" "}
						<span>
							PROTECTED <br /> AREA{" "}
						</span>
					</div>{" "}
					<div className="map-corner">
						{" "}
						<Icon name="map" size={22} /> 領域保護イメージ{" "}
					</div>
				</div>{" "}
				<div>
					<SectionHeading eyebrow="ORIGINAL ADD-ON / KUNIHOGO" title="築いたものを、守る。" /> <p className="lead"> KuniHogoは、このサーバー向けに開発されている国保護アドオンです。保護された領域でのプレイヤー活動や、特定のダメージ・爆発などへの対策を通じて、国造りを支える仕組みを提供します。</p>
					<div className="protect-list">
						{items.map(([icon, title, text]) => (
							<div className="protect-item" key={title}>
								<span>
									<Icon name={icon} size={21} />{" "}
								</span>
								<div>
									<h3>{title}</h3> <p>{text} </p>
								</div>{" "}
							</div>
						))}
					</div>{" "}
					<div className="notice">
						{" "}
						<b>保護機能について </b>
						<p>すべての条件下で被害を完全に防止するものではありません。対象エンティティ、領域、イベント、設定などにより動作が異なる可能性があります。</p>{" "}
					</div>
				</div>{" "}
			</div>
		</section>
	);
}

function Economy() {
	return (
		<section className="section" id="economy">
			{" "}
			<div className="container">
				{" "}
				<div className="economy-intro">
					{" "}
					<SectionHeading eyebrow="ECONOMY SYSTEM" title="経済を動かし、国を発展させる。" description="資源を集め、アイテムを活かし、活動の循環を生み出す。経済アドオンを通じたプレイが、国家の発展に新しい目的を与えます。" /> <StatusBadge>詳細仕様を確認中 </StatusBadge>
				</div>{" "}
				<div className="economy-flow">
					{" "}
					{[
						["map", "資源", "採集・生産", "世界で得られる資源を、国の活動へ。"],
						["store", "交易", "取引・交流", "プレイヤー間の経済活動を支える構想。"],
						["castle", "発展", "建築・街づくり", "蓄えた力を、国家の景観と成長へ。"],
					].map(([icon, overline, title, text], index) => (
						<div className="flow-wrap" key={overline}>
							{" "}
							<article className="flow-card">
								{" "}
								<span className="flow-icon">
									{" "}
									<Icon name={icon as IconName} size={25} />{" "}
								</span>
								<small>{overline}</small> <h3>{title} </h3>
								<p>{text}</p>{" "}
							</article>
							{index < 2 && <Icon name="chevron" size={24} />}{" "}
						</div>
					))}
				</div>{" "}
				<div className="future-panel">
					{" "}
					<div>
						<Icon name="coin" size={24} />{" "}
						<span>
							<b>経済機能の詳細 </b>
							<small>今後、実際のアドオン仕様に合わせて更新します</small>{" "}
						</span>
					</div>{" "}
					<StatusBadge>データ連携準備中 </StatusBadge>
				</div>{" "}
			</div>
		</section>
	);
}

function Portal() {
	const [tab, setTab] = useState<"nations" | "economy">("nations");
	return (
		<section className="section section-alt" id="portal">
			{" "}
			<div className="container">
				{" "}
				<SectionHeading eyebrow="PLAYER PORTAL" title="必要な情報へ、すばやく。" description="既存プレイヤー向けの情報ポータルです。将来のサーバーAPI連携を見据え、表示状態を分離しています。" />{" "}
				<div className="portal-shell">
					{" "}
					<div className="portal-tabs" role="tablist" aria-label="ポータル情報">
						{" "}
						<button role="tab" aria-selected={tab === "nations"} onClick={() => setTab("nations")}>
							{" "}
							<Icon name="flag" size={19} /> 国家情報{" "}
						</button>
						<button role="tab" aria-selected={tab === "economy"} onClick={() => setTab("economy")}>
							<Icon name="coin" size={19} /> 経済情報{" "}
						</button>
					</div>{" "}
					<div className="portal-toolbar">
						{" "}
						<label className="search-box">
							{" "}
							<Icon name="search" size={18} /> <input disabled placeholder={tab === "nations" ? "国名や都市名で検索" : "経済情報を検索"} aria-label="情報を検索" />{" "}
						</label>
						<span>API未接続</span>{" "}
					</div>
					<div className="empty-state" role="tabpanel">
						<span className="empty-icon">
							<Icon name={tab === "nations" ? "flag" : "coin"} size={36} />{" "}
						</span>
						<h3>{tab === "nations" ? "国家データはまだありません" : "経済データ連携準備中"}</h3> <p>{tab === "nations" ? "API連携後、国名・国旗・紹介・都市・領土・街並みなどの情報をここに表示します。架空の国家データは掲載していません。" : "取得可能な項目が確認できた段階で、経済情報や統計を表示します。仮の金額やランキングは掲載していません。"}</p>
						<StatusBadge>{tab === "nations" ? "国家API 連携準備中" : "経済API 連携準備中"}</StatusBadge>{" "}
					</div>
				</div>{" "}
			</div>
		</section>
	);
}

function News() {
	const [category, setCategory] = useState("すべて");
	return (
		<section className="section" id="news">
			{" "}
			<div className="container">
				{" "}
				<div className="section-row">
					{" "}
					<SectionHeading eyebrow="ANNOUNCEMENTS" title="運営からのお知らせ" description="アップデートやメンテナンスなど、サーバー運営からの情報を掲載します。" />{" "}
					<div className="filter-row" aria-label="お知らせカテゴリ">
						{" "}
						{["すべて", "運営情報", "アップデート", "メンテナンス", "イベント"].map((item) => (
							<button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
								{item}
							</button>
						))}
					</div>{" "}
				</div>
				<div className="news-empty">
					<span>
						<Icon name="flag" size={29} />{" "}
					</span>
					<div>
						<h3>現在、お知らせはありません</h3> <p>新しいお知らせが公開されると、選択中の「{category}」カテゴリに応じてここに表示されます。</p>
					</div>{" "}
				</div>
			</div>{" "}
		</section>
	);
}

function Guide() {
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState("すべて");
	const filtered = useMemo(() => guideItems.filter((item) => (filter === "すべて" || item.category === filter) && `${item.title}${item.description}${item.category}`.toLowerCase().includes(query.toLowerCase())), [query, filter]);
	return (
		<section className="section section-alt" id="guide">
			{" "}
			<div className="container">
				{" "}
				<SectionHeading eyebrow="PLAY GUIDE" title="プレイガイド" description="参加前の準備からゲーム内の仕組みまで、必要な情報を探せます。未確認の操作方法は「準備中」としています。" />{" "}
				<div className="guide-tools">
					{" "}
					<label className="search-box active">
						{" "}
						<Icon name="search" size={19} /> <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ガイドを検索" aria-label="ガイドを検索" />{" "}
					</label>
					<div className="filter-row">
						{["すべて", "はじめに", "KuniHogo", "経済", "サポート"].map((item) => (
							<button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
								{item}
							</button>
						))}{" "}
					</div>
				</div>{" "}
				{filtered.length > 0 ? (
					<div className="guide-grid">
						{" "}
						{filtered.map((item) => (
							<article className="guide-card" key={item.title}>
								{" "}
								<span className="guide-icon">
									{" "}
									<Icon name={item.icon} size={22} />{" "}
								</span>
								<div>
									<small>{item.category}</small> <h3>{item.title} </h3>
									<p>{item.description}</p> <span className="guide-status" dangerouslySetInnerHTML={{ __html: item.status }}></span>
								</div>{" "}
							</article>
						))}
					</div>
				) : (
					<div className="no-results">
						{" "}
						<Icon name="search" size={25} /> <p>条件に一致するガイドはありません。</p>
						<button
							onClick={() => {
								setQuery("");
								setFilter("すべて");
							}}
						>
							検索をリセット
						</button>{" "}
					</div>
				)}
			</div>
		</section>
	);
}

function JoinAndFaq() {
	return (
		<>
			<section className="section" id="join">
				{" "}
				<div className="container join-grid">
					{" "}
					<div>
						<SectionHeading eyebrow="HOW TO JOIN" title="この世界への、最初の一歩。" description="正確な接続情報は現在準備中です。公開後は、以下の手順に沿ってMinecraft Bedrock Editionから参加できます。" />{" "}
						<div className="join-steps">
							{" "}
							{["対応バージョンと参加条件を確認", "サーバー情報をゲームに追加", "ルールを確認して世界へ参加"].map((step, i) => (
								<div key={step}>
									{" "}
									<span>0{i + 1} </span>
									<p>{step}</p>{" "}
								</div>
							))}
						</div>{" "}
					</div>
					<aside className="connection-card">
						<div className="connection-head">
							<span>
								<Icon name="compass" size={24} />{" "}
							</span>
							<div>
								<small>SERVER CONNECTION</small> <h3>接続情報 </h3>
							</div>{" "}
						</div>
						{[
							["対応バージョン", "最新版"],
							["サーバーアドレス", "vps.tshuto.com"],
							["ポート番号", "15000"],
							["参加条件", `${LINE_OC_STR}に入る`],
							["問い合わせ先", `${LINE_OC_STR}までお越しください`],
						].map(([key, value]) => (
							<div className="connection-row" key={key}>
								<span>{key}</span> <b dangerouslySetInnerHTML={{ __html: value }}></b>
							</div>
						))}{" "}
						<p>架空のIPアドレスやポート番号は掲載していません。確定後に更新されます。</p>
					</aside>{" "}
				</div>
			</section>{" "}
			<section className="section section-alt" id="faq">
				{" "}
				<div className="container faq-layout">
					{" "}
					<SectionHeading eyebrow="FAQ" title="よくある質問" description="知りたい質問を選択すると回答が開きます。仕様が未確定の内容は、その旨を明記しています。" />{" "}
					<div className="faq-list">
						{" "}
						{faqItems.map(([question, answer]) => (
							<details key={question}>
								{" "}
								<summary>
									{question}
									<span>＋</span>
								</summary>{" "}
								<p dangerouslySetInnerHTML={{ __html: answer }} />
							</details>
						))}{" "}
					</div>
				</div>{" "}
			</section>
		</>
	);
}

function Footer() {
	return (
		<footer>
			<div className="container footer-top">
				{" "}
				<div>
					<Brand />
					<p>
						Minecraft Bedrock Edition
						<br /> 国造り・領土保護・経済活動サーバー{" "}
					</p>
				</div>{" "}
				<div className="footer-links">
					{" "}
					<div>
						<b>サーバー </b>
						<a href="#about">サーバーについて</a> <a href="#kunihogo"> 国保護 </a>
						<a href="#economy">経済システム</a>{" "}
					</div>
					<div>
						<b>サポート</b> <a href="#guide"> プレイガイド </a>
						<a href="#faq">よくある質問</a> <a href="#join"> 参加方法 </a>
					</div>{" "}
					<div>
						<b>ポータル </b>
						<a href="#portal">国家情報</a> <a href="#news"> お知らせ </a>
					</div>{" "}
				</div>
			</div>{" "}
			<div className="container footer-bottom">
				{" "}
				<span>© 国造りサーバー運営 </span>
				<span>非公式のMinecraftコミュニティサーバーです。Mojang Studiosとは関係ありません。</span>{" "}
			</div>
		</footer>
	);
}

export default function App() {
	return (
		<>
			<Header />
			<main>
				<Hero /> <Features />
				<KuniHogo /> <Economy />
				<Portal /> <News />
				<Guide /> <JoinAndFaq />
			</main>{" "}
			<Footer />
		</>
	);
}
