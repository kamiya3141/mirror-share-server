import { motion } from 'motion/react';
import { Calendar, BookOpen, Flower2, Mountain } from 'lucide-react';

const activities = [
  {
    icon: Mountain,
    title: '月例参拝',
    time: '毎月第1日曜日 10:00-12:00',
    description: '本堂にて月次祭を執り行います。木霊の導きを受け、心を清める大切な時間です。',
    color: 'emerald',
  },
  {
    icon: BookOpen,
    title: '経典講座',
    time: '毎週水曜日 19:00-20:30',
    description: 'KODAMA教の経典を読み解き、現代を生きる私たちへの教えを学びます。',
    color: 'teal',
  },
  {
    icon: Flower2,
    title: '自然瞑想会',
    time: '毎週土曜日 6:00-7:00',
    description: '境内の森で朝の瞑想を行います。自然のエネルギーを感じ、心身を整えます。',
    color: 'green',
  },
  {
    icon: Calendar,
    title: '年次大祭',
    time: '年2回（春分・秋分の日）',
    description: '一年で最も重要な祭典。全国の信徒が集い、木霊の恵みに感謝を捧げます。',
    color: 'cyan',
  },
];

export function Activities() {
  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            主な活動
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            みなさまと共に歩む、信仰の実践
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${activity.color}-200 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`} />

              <div className="relative">
                <div className={`w-12 h-12 bg-${activity.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <activity.icon className={`w-6 h-6 text-${activity.color}-600`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>

                <p className="text-sm text-emerald-700 font-semibold mb-3">
                  {activity.time}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
