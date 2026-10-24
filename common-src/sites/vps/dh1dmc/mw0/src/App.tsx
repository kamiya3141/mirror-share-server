import { useEffect, useMemo, useState } from "react";
import { places, routes, type Place } from "./data";

const nav = [
	["ホーム", "home"],
	["ワールドマップ", "map"],
	["探索ルート", "routes"],
	["施設図鑑", "places"],
	["歴史と謎", "history"],
	["ギャラリー", "gallery"],
];

function Placeholder({ name, tall = false, src = "" }: { name: string; tall?: boolean; src?: string }) {
	if (src)
		return (
			<div className={`placeholder ${tall ? "tall" : ""}`}>
				<img title={name} src={src}></img>
			</div>
		);
	else
		return (
			<div className={`placeholder ${tall ? "tall" : ""}`}>
				<span>SCREENSHOT PENDING</span>
				<strong>{name}</strong>
				<small>実際のワールド画像に差し替え予定</small>
			</div>
		);
}

function SectionTitle({ no, eyebrow, children }: { no: string; eyebrow: string; children: React.ReactNode }) {
	return (
		<div className="section-title">
			<span>{no}</span>
			<div>
				<small>{eyebrow}</small>
				<h2>{children}</h2>
			</div>
		</div>
	);
}

export default function App() {
	const [menu, setMenu] = useState(false);
	const [region, setRegion] = useState<"地域A" | "地域B">("地域A");
	const [selected, setSelected] = useState<Place>(places[0]);
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("すべて");
	const [modal, setModal] = useState<Place | null>(null);
	const categories = ["すべて", ...new Set(places.map((p) => p.category))];
	const filtered = useMemo(() => places.filter((p) => (category === "すべて" || p.category === category) && `${p.name}${p.region}`.includes(query)), [query, category]);
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<div className="app">
			<header>
				<a className="brand" href="#home">
					<span className="brand-mark">W</span>
					<span>
						BEDROCK
						<br />
						<small>WORLD ARCHIVE</small>
					</span>
				</a>
				<button className="menu" aria-label="メニュー" onClick={() => setMenu(!menu)}>
					<i></i>
					<i></i>
				</button>
				<nav className={menu ? "open" : ""}>
					{nav.map(([label, id]) => (
						<a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
							{label}
						</a>
					))}
				</nav>
			</header>

			<main>
				<section id="home" className="hero">
					<div className="hero-grid"></div>
					<div className="compass">
						N<br />
						<span>◇</span>
					</div>
					<div className="hero-copy">
						<p className="kicker">OFFICIAL WORLD GUIDE / BEDROCK EDITION</p>
						<h1>
							この世界には、
							<br />
							<em>まだ見ぬ景色</em>がある。
						</h1>
						<p>
							村から海岸へ、古代都市から王都へ。
							<br />
							サバイバルの中で築かれた世界を巡る。
						</p>
						<div className="actions">
							<a className="primary" href="#map">
								ワールドを探索する <b>→</b>
							</a>
							<a href="#places">建築物を見る</a>
						</div>
					</div>
					<div className="hero-photo">
						<Placeholder name="ワールド全景 / ヒーロー画像" tall src="/img/background/jpeg/main.jpeg" />
					</div>
					<div className="scroll">
						SCROLL TO EXPLORE <span>↓</span>
					</div>
				</section>

				<section className="intro wrap">
					<div>
						<p className="kicker">A WORLD BUILT IN SURVIVAL</p>
						<h2>
							暮らしから始まり、
							<br />
							世界は海の向こうへ広がった。
						</h2>
					</div>
					<p>初期リスポーン地点付近の4つの村と生活施設群。空へ伸びる塔、城壁と波止場、復元された古代都市。巨大な橋の先には謎の遺跡があり、海を越えればトウヒの家と王都が待っています。</p>
					<div className="fact">
						<b>2</b>
						<span>
							REGIONS
							<br />
							<small>海で隔てられた地域</small>
						</span>
					</div>
				</section>

				<section id="map" className="map-section">
					<div className="wrap">
						<SectionTitle no="01" eyebrow="SCHEMATIC WORLD MAP">
							ワールドマップ
						</SectionTitle>
						<div className="map-note">これは位置関係を示す模式図です。正確な座標・方角・距離は未記録です。</div>
						<div className="region-tabs">
							<button className={region === "地域A" ? "active" : ""} onClick={() => setRegion("地域A")}>
								地域A <small>初期大陸</small>
							</button>
							<button className={region === "地域B" ? "active" : ""} onClick={() => setRegion("地域B")}>
								地域B <small>海の向こう</small>
							</button>
						</div>
						<div className="map-layout">
							<div className="map-canvas">
								<div className="contours"></div>
								<span className="map-label">{region === "地域A" ? "INITIAL CONTINENT" : "ACROSS THE SEA"}</span>
								{places
									.filter((p) => p.region === region)
									.map((p, i) => (
										<button aria-label={p.name} className={`marker ${selected.id === p.id ? "selected" : ""}`} key={p.id} style={{ left: `${p.mapPosition?.x}%`, top: `${p.mapPosition?.y}%` }} onClick={() => setSelected(p)}>
											<i>{i + 1}</i>
											<span>{p.name}</span>
										</button>
									))}
								{region === "地域B" && <div className="sea">海域 — 距離未記録</div>}
							</div>
							<aside className="map-detail">
								<small>SELECTED PLACE</small>
								<span className="index">{String(places.indexOf(selected) + 1).padStart(2, "0")}</span>
								<h3>{selected.name}</h3>
								<p>{selected.description}</p>
								<dl>
									<div>
										<dt>地域</dt>
										<dd>{selected.region}</dd>
									</div>
									<div>
										<dt>分類</dt>
										<dd>{selected.category}</dd>
									</div>
									<div>
										<dt>座標</dt>
										<dd>情報準備中</dd>
									</div>
								</dl>
								<a href="#places">図鑑で詳細を見る →</a>
							</aside>
						</div>
						<div className="legend">
							<b>凡例</b>
							<span>
								<i></i>拠点・村
							</span>
							<span>
								<i></i>施設・建築
							</span>
							<span>
								<i></i>遺跡・探索地点
							</span>
						</div>
					</div>
				</section>

				<section id="routes" className="routes wrap">
					<SectionTitle no="02" eyebrow="EXPLORATION ROUTES">
						5つの探索ルート
					</SectionTitle>
					<div className="route-list">
						{routes.map((r, i) => (
							<article key={r.no}>
								<div className="route-no">
									ROUTE
									<br />
									<b>{r.no}</b>
								</div>
								<div className="route-image">
									<Placeholder name={r.name} />
								</div>
								<div className="route-copy">
									<small>{r.stops}</small>
									<h3>{r.name}</h3>
									<p>{r.text}</p>
								</div>
								<span className="arrow">↗</span>
							</article>
						))}
					</div>
				</section>

				<section id="places" className="catalog">
					<div className="wrap">
						<SectionTitle no="03" eyebrow="PLACES & STRUCTURES">
							建築物・施設図鑑
						</SectionTitle>
						<div className="filters">
							<label>
								施設を検索
								<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="施設名・地域で検索" />
							</label>
							<label>
								カテゴリ
								<select value={category} onChange={(e) => setCategory(e.target.value)}>
									{categories.map((c) => (
										<option key={c}>{c}</option>
									))}
								</select>
							</label>
						</div>
						<p className="result">{filtered.length}件を表示</p>
						<div className="cards">
							{filtered.map((p) => (
								<article className="card" key={p.id} onClick={() => setModal(p)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setModal(p)}>
									<Placeholder name={p.name} />
									<div>
										<small>
											{p.category} — {p.region}
										</small>
										<h3>{p.name}</h3>
										<p>{p.description}</p>
										<button>記録を見る →</button>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section id="history" className="history wrap">
					<SectionTitle no="04" eyebrow="HISTORY & MYSTERIES">
						歴史と謎
					</SectionTitle>
					<div className="history-grid">
						<div className="history-lead">
							<Placeholder name="復元済みの古代都市" tall />
							<span>記録 001</span>
						</div>
						<div className="record">
							<small>KNOWN / 判明していること</small>
							<h3>
								地上に再現された
								<br />
								復元済みの古代都市
							</h3>
							<p>この建築が「復元済みの古代都市」であることは記録されています。建設時期や復元の経緯は、まだ資料がありません。</p>
							<hr />
							<small>UNRECORDED / 未記録</small>
							<ul>
								<li>建設・復元の時期</li>
								<li>制作に関わった人物</li>
								<li>各区画の用途と由来</li>
							</ul>
						</div>
					</div>
					<div className="mysteries">
						{["謎の遺跡", "遺跡へ続く巨大な橋", "石レンガの城壁と別荘", "巨大なトウヒの家", "王都"].map((x, i) => (
							<div key={x}>
								<span>{String(i + 2).padStart(3, "0")}</span>
								<h3>{x}</h3>
								<small>記録を収集中</small>
							</div>
						))}
					</div>
				</section>

				<section id="gallery" className="gallery">
					<div className="wrap">
						<SectionTitle no="05" eyebrow="WORLD GALLERY">
							スクリーンショット集
						</SectionTitle>
						<p className="gallery-note">現在は画像差し替え用の領域です。実際のワールドスクリーンショットを追加すると、大きく閲覧できます。</p>
						<div className="gallery-grid">
							{places.slice(0, 7).map((p, i) => (
								<button className={i === 0 || i === 5 ? "wide" : ""} key={p.id} onClick={() => setModal(p)}>
									<Placeholder name={p.name} />
								</button>
							))}
						</div>
					</div>
				</section>
			</main>

			<footer>
				<div className="wrap">
					<div className="brand">
						<span className="brand-mark">W</span>
						<span>
							BEDROCK
							<br />
							<small>WORLD ARCHIVE</small>
						</span>
					</div>
					<p>サバイバル世界を巡る、冒険者のための公式ガイド。</p>
					<nav>
						{nav.map(([label, id]) => (
							<a key={id} href={`#${id}`}>
								{label}
							</a>
						))}
					</nav>
					<div className="status">
						<i></i>
						<span>
							WORLD INFORMATION
							<br />
							<small>記録・画像を準備中</small>
						</span>
					</div>
				</div>
			</footer>

			{modal && (
				<div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}>
					<div className="modal" role="dialog" aria-modal="true" aria-label={modal.name} onClick={(e) => e.stopPropagation()}>
						<button className="close" onClick={() => setModal(null)} aria-label="閉じる">
							×
						</button>
						<Placeholder name={modal.name} tall />
						<small>
							{modal.category} — {modal.region}
						</small>
						<h2>{modal.name}</h2>
						<p>{modal.description}</p>
						<dl>
							<div>
								<dt>関連施設</dt>
								<dd>{modal.relatedPlaces.map((id) => places.find((p) => p.id === id)?.name).join(" / ") || "情報準備中"}</dd>
							</div>
							<div>
								<dt>座標</dt>
								<dd>情報準備中</dd>
							</div>
						</dl>
					</div>
				</div>
			)}
		</div>
	);
}
