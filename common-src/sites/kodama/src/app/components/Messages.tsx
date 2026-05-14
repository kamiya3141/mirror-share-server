import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const messages = [
  {
    text: '森に響く木霊のように、あなたの声も世界に響き渡る。恐れずに、真実の声を発しなさい。',
    author: '開祖 木霊一心',
    date: '2025年1月',
  },
  {
    text: '川の流れは岩を避けず、包み込む。困難に直面した時こそ、柔軟な心を持ちなさい。',
    author: '第二代 木霊悟道',
    date: '2024年秋',
  },
  {
    text: '一本の木が森となるには時間がかかる。焦らず、日々の小さな成長を大切にしなさい。',
    author: '第三代 木霊慈恵',
    date: '2023年春',
  },
];

export function Messages() {
  return (
    <section id="messages" className="py-24 bg-gradient-to-b from-emerald-900 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            御言葉
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            歴代教主からの教えと導き
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-colors"
            >
              <Quote className="w-10 h-10 text-emerald-300 mb-4" />

              <p className="text-lg leading-relaxed mb-6 italic">
                「{message.text}」
              </p>

              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold text-emerald-200">
                  {message.author}
                </p>
                <p className="text-sm text-emerald-300 mt-1">
                  {message.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
