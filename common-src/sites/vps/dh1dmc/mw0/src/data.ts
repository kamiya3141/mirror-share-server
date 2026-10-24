export type Place = {
	id: string;
	name: string;
	category: string;
	region: "地域A" | "地域B" | "";
	description: string;
	relatedPlaces: string[];
	mapPosition: { x: number; z: number; };
	src: string;
};

export const server_info: Place = {
	id: "server-information",
	name: "サーバー情報",
	category: "server-information",
	region: "",
	description: "",
	relatedPlaces: ["vps.tshuto.com", "10000"],
	mapPosition: { x: 0, z: 0 },
	src: "/img/background/jpeg/main.jpeg"
};

export const places: Place[] = [
	{
		id: "spawn",
		name: "初期リスポーン地点",
		category: "村・拠点",
		region: "地域A",
		description: "旅の起点。周辺には4つの村と生活に関わる施設が集まっています。",
		relatedPlaces: [
			"village",
			"farm"
		],
		mapPosition: { x: 28, z: 40 },
		src: "/img/background/jpeg/init-world-spawn.jpeg"
	},
	{
		id: "village",
		name: "近隣の4つの村",
		category: "村・拠点",
		region: "地域A",
		description: "初期リスポーン地点の近くに点在する4つの村。開拓の足がかりとなる地域です。",
		relatedPlaces: [
			"spawn",
			"farm",
			"ranch"
		],
		mapPosition: { x: 41, z: 27 },
		src: "/img/background/jpeg/four-villages.jpeg"
	},
	{
		id: "skull-house",
		name: "髑髏の家",
		category: "城壁・建築",
		region: "地域A",
		description: "村の近隣施設群とあわせて巡る、特徴的な外観の建築です。",
		relatedPlaces: [
			"village"
		],
		mapPosition: { x: 16, z: 25 },
		src: "/img/background/jpeg/skull-house.jpeg"
	},
	{
		id: "farm",
		name: "巨大畑",
		category: "農業・牧畜",
		region: "地域A",
		description: "村の近くに広がる、生活と農業に関わる施設です。",
		relatedPlaces: [
			"village",
			"ranch"
		],
		mapPosition: { x: 46, z: 46 },
		src: "/img/background/jpeg/vegetable-garden.jpeg"
	},
	{
		id: "ranch",
		name: "牧場",
		category: "農業・牧畜",
		region: "地域A",
		description: "村の近くにある牧畜施設。巨大畑とともに開拓の景観を形づくります。",
		relatedPlaces: [
			"farm"
		],
		mapPosition: { x: 35, z: 57 },
		src: "/img/background/jpeg/ranch-hut.jpeg"
	},
	{
		id: "potion",
		name: "ポーション生成装置",
		category: "生活施設",
		region: "地域A",
		description: "生活・資源確保に関係する施設群のひとつです。",
		relatedPlaces: [
			"village"
		],
		mapPosition: { x: 55, z: 34 },
		src: "/img/background/jpeg/potion-crafter.jpeg"
	},
	{
		id: "sky-trap",
		name: "天空トラップタワー",
		category: "装置・トラップタワー",
		region: "地域A",
		description: "空中に建設された施設。地上から見上げる景観も見どころです。",
		relatedPlaces: [
			"creeper-trap"
		],
		mapPosition: { x: 63, z: 18 },
		src: "/img/background/jpeg/monster-trap.jpeg"
	},
	{
		id: "creeper-trap",
		name: "天空クリーパートラップタワー",
		category: "装置・トラップタワー",
		region: "地域A",
		description: "天空に伸びるもうひとつのトラップタワーです。",
		relatedPlaces: [
			"sky-trap"
		],
		mapPosition: { x: 73, z: 29 },
		src: "/img/background/jpeg/creeper-trap.jpeg"
	},
	{
		id: "wall",
		name: "石レンガの城壁",
		category: "城壁・建築",
		region: "地域A",
		description: "別荘を囲み、波止場と海岸の景観へつながる石レンガの城壁です。",
		relatedPlaces: [
			"villa",
			"dock"
		],
		mapPosition: { x: 25, z: 76 },
		src: "/img/background/jpeg/stone-wall.jpeg"
	},
	{
		id: "villa",
		name: "別荘",
		category: "城壁・建築",
		region: "地域A",
		description: "石レンガの城壁に囲まれた建築です。",
		relatedPlaces: [
			"wall",
			"dock"
		],
		mapPosition: { x: 34, z: 75 },
		src: "/img/background/jpeg/past-house.jpeg"
	},
	{
		id: "dock",
		name: "波止場",
		category: "港・海岸",
		region: "地域A",
		description: "城壁と別荘から海岸へ視線を導く波止場です。",
		relatedPlaces: [
			"wall",
			"villa"
		],
		mapPosition: { x: 42, z: 87 },
		src: "/img/background/jpeg/dock.jpeg"
	},
	{
		id: "ancient-city",
		name: "復元済みの古代都市",
		category: "古代都市・遺跡",
		region: "地域A",
		description: "古代都市を現代の地上に再現した、復元済みの建築群です。",
		relatedPlaces: [
			"bridge",
			"ruins"
		],
		mapPosition: { x: 65, z: 60 },
		src: "/img/background/jpeg/ancient-city.jpeg"
	},
	{
		id: "bridge",
		name: "巨大な橋",
		category: "城壁・建築",
		region: "地域A",
		description: "海岸から謎の遺跡へと続く巨大な橋です。",
		relatedPlaces: [
			"ancient-city",
			"ruins"
		],
		mapPosition: { x: 76, z: 70 },
		src: "/img/background/jpeg/bridge.jpeg"
	},
	{
		id: "ruins",
		name: "謎の遺跡",
		category: "古代都市・遺跡",
		region: "地域A",
		description: "正体や由来がまだ記録されていない、観察と探索の対象です。",
		relatedPlaces: [
			"bridge"
		],
		mapPosition: { x: 89, z: 63 },
		src: "/img/background/jpeg/unknown-ruins.jpeg"
	},
	{
		id: "spruce-house",
		name: "巨大なトウヒの家",
		category: "海の向こうの地域",
		region: "地域B",
		description: "海を少し渡った先にある、トウヒの木材でできた巨大な家です。",
		relatedPlaces: [
			"capital"
		],
		mapPosition: { x: 36, z: 53 },
		src: "/img/background/jpeg/current-house.jpeg"
	},
	{
		id: "capital",
		name: "王都",
		category: "王都",
		region: "地域B",
		description: "巨大なトウヒの家のさらに先の大陸にある王都です。",
		relatedPlaces: [
			"spruce-house"
		],
		mapPosition: { x: 70, z: 42 },
		src: "/img/background/jpeg/royal-capital.jpeg"
	}
];

export const routes = [
	{
		no: "01",
		name: "開拓の拠点",
		text: "初期リスポーン地点と4つの村から、髑髏の家、巨大畑、牧場、ポーション生成装置へ。",
		stops: "初期地点 / 4つの村 / 生活施設群",
		src: "/img/background/jpeg/main.jpeg"
	},
	{
		no: "02",
		name: "空へ伸びる建築",
		text: "2つの天空トラップタワーを、全景・内部・地上からの視点で記録するルート。",
		stops: "天空トラップタワー / クリーパートラップ",
		src: "/img/background/jpeg/monster-trap.jpeg"
	},
	{
		no: "03",
		name: "城壁と海岸",
		text: "石レンガの城壁に囲まれた別荘を抜け、波止場へと景観をたどります。",
		stops: "城壁 / 別荘 / 波止場",
		src: "/img/background/jpeg/dock.jpeg"
	},
	{
		no: "04",
		name: "古代都市と謎の遺跡",
		text: "地上に復元された古代都市から、巨大な橋を通って謎の遺跡へ。",
		stops: "古代都市 / 巨大な橋 / 謎の遺跡",
		src: "/img/background/jpeg/ancient-city.jpeg"
	},
	{
		no: "05",
		name: "海の向こうへ",
		text: "海を隔てた大陸へ渡り、巨大なトウヒの家と、その先の王都を訪ねます。",
		stops: "海 / 巨大なトウヒの家 / 王都",
		src: "/img/background/jpeg/current-house.jpeg"
	}
];
