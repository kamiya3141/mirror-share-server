import { motion } from 'motion/react';
import { Heart, Leaf, Users, Sun } from 'lucide-react';

const teachings = [
  {
    icon: Heart,
    title: '心の浄化',
    description: '日々の喧騒から離れ、心を清らかに保ちます。内なる平和を見出すことで、真の幸福への道が開けます。',
  },
  {
    icon: Leaf,
    title: '自然との調和',
    description: '木々の木霊のように、自然と共鳴する生き方を大切にします。森羅万象すべてに宿る神聖さを感じ取ります。',
  },
  {
    icon: Users,
    title: '共生の精神',
    description: '一人ひとりの個性を尊重し、互いに支え合う共同体を築きます。調和ある社会の実現を目指します。',
  },
  {
    icon: Sun,
    title: '光明の道',
    description: '困難な時こそ希望の光を見出し、前向きに歩み続けます。木霊の導きによって、真理の道へと進みます。',
  },
];

export function Teachings() {
  return (
    <section id="teachings" className="py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            KODAMA教の教義
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            四つの柱が、私たちの信仰と実践の基盤です
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teachings.map((teaching, index) => (
            <motion.div
              key={teaching.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                  <teaching.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {teaching.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {teaching.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
