import { motion } from 'motion/react';
import { User, Calendar, MapPin, Briefcase, Trophy, Flame } from 'lucide-react';

const profileData = [
	{ icon: User, label: '名前', value: 'アキオ（AKIO）' },
	{ icon: Briefcase, label: '職業', value: '大学生 / オーク戦士' },
	{ icon: Calendar, label: '生年月日', value: '20XX年YY月ZZ日' },
	{ icon: MapPin, label: '出身地', value: '荒野の彼方' },
	{ icon: Trophy, label: '称号', value: '鉄の胃袋、野生児' },
	{ icon: Flame, label: '戦闘力', value: '9,800' },
];

export function AkioProfile() {
	return (
		<section id="profile" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900 border-y-2 border-amber-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-tight">
						プロフィール
					</h2>
					<div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
					<p className="text-xl text-stone-400 max-w-2xl mx-auto font-semibold">
						荒野から来た戦士の素顔
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left - Image placeholder */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl border-4 border-amber-700 shadow-2xl flex items-center justify-center overflow-hidden">
							<div className="text-center p-8">
								<User className="w-32 h-32 text-amber-600 mx-auto mb-4" />
								<p className="text-stone-500 font-bold text-lg">オークの肖像</p>
								<p className="text-stone-600 text-sm mt-2">荒々しき戦士</p>
							</div>
						</div>

						{/* Decorative corner accents */}
						<div className="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-amber-500" />
						<div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-4 border-b-4 border-amber-500" />
					</motion.div>

					{/* Right - Profile data */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="space-y-4"
					>
						{profileData.map((item, index) => (
							<motion.div
								key={item.label}
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-stone-800 border-2 border-stone-700 rounded-lg p-5 hover:border-amber-700 transition-all hover:shadow-lg"
							>
								<div className="flex items-center gap-4">
									<div className="flex-shrink-0 w-12 h-12 bg-amber-900 rounded-lg flex items-center justify-center border-2 border-amber-700">
										<item.icon className="w-6 h-6 text-amber-400" />
									</div>
									<div className="flex-1">
										<div className="text-sm text-stone-500 font-semibold mb-1">
											{item.label}
										</div>
										<div className="text-lg text-amber-100 font-bold">
											{item.value}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Bio section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-amber-700 rounded-2xl p-8 shadow-2xl"
				>
					<h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
						<Flame className="w-6 h-6 text-amber-500" />
						自己紹介
					</h3>
					<div className="text-stone-300 leading-relaxed space-y-4">
						<p>
							俺の名はアキオ。荒野を駆け、獲物を狩り、肉を喰らう。大学生という肩書きを持ちながらも、心は野生のオーク戦士だ。
						</p>
						<p>
							講義室は戦場、試験は決闘、レポートは戦利品。サークル活動では常に先陣を切り、仲間たちと共に荒々しく駆け抜ける。
						</p>
						<p>
							好物は肉。焼肉、ステーキ、ハンバーグ、唐揚げ...何でも来い。野菜?知らん。炭水化物と肉があれば生きていける。
						</p>
						<p className="text-amber-400 font-bold">
							「強くなければ生き残れない。優しくなければ生きている資格がない」- これが俺の信条だ。
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
