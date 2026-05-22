import { motion } from 'motion/react';
import { Drumstick, Dumbbell, Gamepad2, Code, BookOpen, Beer } from 'lucide-react';

const skills = [
	{
		icon: Drumstick,
		name: '肉食本能',
		level: 99,
		description: 'あらゆる肉料理を最速で平らげる能力。焼肉店での戦闘力は無双状態。',
		color: 'from-red-900 to-red-700',
	},
	{
		icon: Dumbbell,
		name: '筋力',
		level: 85,
		description: '荒野での鍛錬により培われた肉体。ベンチプレス100kg余裕。',
		color: 'from-orange-900 to-orange-700',
	},
	{
		icon: Gamepad2,
		name: 'ゲーム戦闘',
		level: 92,
		description: 'FPSからRPGまで。特にダークソウルシリーズは全作クリア済み。',
		color: 'from-purple-900 to-purple-700',
	},
	{
		icon: Code,
		name: 'プログラミング',
		level: 70,
		description: 'Python、JavaScriptを使いこなす。荒々しいコードで問題を力技で解決。',
		color: 'from-blue-900 to-blue-700',
	},
	{
		icon: BookOpen,
		name: '学問',
		level: 75,
		description: '見た目に反して成績優秀。特に数学と物理は得意分野。',
		color: 'from-green-900 to-green-700',
	},
	{
		icon: Beer,
		name: '飲酒耐性',
		level: 88,
		description: '底なしの胃袋。飲み会では常にラスボス的存在として君臨。',
		color: 'from-amber-900 to-amber-700',
	},
];

export function AkioSkills() {
	return (
		<section id="skills" className="py-24 bg-gradient-to-b from-stone-900 to-stone-950 border-t-2 border-amber-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-tight">
						スキル
					</h2>
					<div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
					<p className="text-xl text-stone-400 max-w-2xl mx-auto font-semibold">
						戦士が持つ多彩な能力
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="bg-stone-800 border-2 border-stone-700 rounded-xl p-6 hover:border-amber-700 transition-all shadow-lg"
						>
							<div className={`w-14 h-14 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center mb-4 border-2 border-amber-600`}>
								<skill.icon className="w-7 h-7 text-amber-100" />
							</div>

							<h3 className="text-xl font-bold text-amber-100 mb-2">
								{skill.name}
							</h3>

							<p className="text-stone-400 text-sm mb-4 leading-relaxed">
								{skill.description}
							</p>

							{/* Level bar */}
							<div className="space-y-2">
								<div className="flex justify-between items-center">
									<span className="text-xs text-stone-500 font-semibold">LEVEL</span>
									<span className="text-amber-400 font-bold text-lg">{skill.level}</span>
								</div>
								<div className="w-full bg-stone-700 rounded-full h-3 overflow-hidden border border-stone-600">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${skill.level}%` }}
										viewport={{ once: true }}
										transition={{ duration: 1, delay: index * 0.1 }}
										className={`h-full bg-gradient-to-r ${skill.color} relative`}
									>
										<div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
									</motion.div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Stats summary */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 bg-gradient-to-r from-amber-900 to-orange-900 border-2 border-amber-600 rounded-2xl p-8 text-center shadow-2xl"
				>
					<h3 className="text-2xl font-bold text-amber-100 mb-4">
						総合戦闘力
					</h3>
					<div className="text-6xl font-bold text-white mb-2">
						{skills.reduce((sum, skill) => sum + skill.level, 0)}
					</div>
					<p className="text-amber-200 font-semibold">
						全スキルレベル合計値
					</p>
				</motion.div>
			</div>
		</section>
	);
}
