import { motion } from 'motion/react';
import { Swords, Award, Target, Zap } from 'lucide-react';

const battles = [
  {
    year: '2024年',
    title: '期末試験大戦',
    description: '全8科目を制覇。特に「線形代数」では伝説の満点を叩き出し、教授からも一目置かれる存在に。',
    result: '完全勝利',
    icon: Award,
  },
  {
    year: '2023年',
    title: 'サークル新歓バトル',
    description: '新入生50人を前に演説。その熱量と野生的カリスマで、過去最高の30人の入部を獲得。',
    result: '大勝利',
    icon: Target,
  },
  {
    year: '2023年',
    title: '焼肉食べ放題チャレンジ',
    description: '制限時間90分で肉3.2kgを完食。店員も驚愕の記録を樹立し、店の殿堂入りを果たす。',
    result: '伝説的勝利',
    icon: Zap,
  },
  {
    year: '2022年',
    title: '大学入学の儀',
    description: '競争率3倍の難関を突破。荒野での修行の成果を発揮し、見事合格を勝ち取る。',
    result: '勝利',
    icon: Swords,
  },
];

export function AkioBattles() {
  return (
    <section id="battles" className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-tight">
            戦歴
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-xl text-stone-400 max-w-2xl mx-auto font-semibold">
            数々の激戦を生き抜いた記録
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-amber-700" />

          <div className="space-y-12">
            {battles.map((battle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-amber-700 rounded-xl p-6 shadow-xl ${index % 2 === 0 ? 'md:text-right' : ''
                      }`}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''
                      }`}>
                      <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center border-2 border-amber-600">
                        <battle.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-amber-500 font-bold">{battle.year}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-amber-100 mb-3">
                      {battle.title}
                    </h3>

                    <p className="text-stone-300 leading-relaxed mb-4">
                      {battle.description}
                    </p>

                    <div className={`inline-block bg-amber-900 border-2 border-amber-600 px-4 py-2 rounded-lg`}>
                      <span className="text-amber-100 font-bold">
                        結果: {battle.result}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-6 h-6 bg-amber-600 rounded-full border-4 border-stone-900 shadow-lg z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
