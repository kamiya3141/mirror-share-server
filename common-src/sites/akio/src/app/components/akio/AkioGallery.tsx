import { motion } from 'motion/react';
import { Image, Camera, Flame } from 'lucide-react';

const galleryItems = [
  { title: '荒野での修行', description: '日々の鍛錬風景', icon: Flame },
  { title: '肉食の記録', description: '伝説の焼肉3kg完食', icon: Flame },
  { title: '仲間との宴', description: 'サークルメンバーと', icon: Flame },
  { title: '戦闘の瞬間', description: 'ゲーム大会優勝時', icon: Flame },
  { title: '学問の道', description: '図書館での勉強', icon: Flame },
  { title: '筋トレの日々', description: 'ジムでの一コマ', icon: Flame },
];

export function AkioGallery() {
  return (
    <section id="gallery" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-tight">
            ギャラリー
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-xl text-stone-400 max-w-2xl mx-auto font-semibold">
            戦士の日常を切り取る
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl border-2 border-stone-700 overflow-hidden cursor-pointer hover:border-amber-600 transition-all shadow-lg"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-amber-900 rounded-full flex items-center justify-center mb-4 border-2 border-amber-600"
                >
                  <item.icon className="w-10 h-10 text-amber-400" />
                </motion.div>

                <h3 className="text-xl font-bold text-amber-100 mb-2">
                  {item.title}
                </h3>

                <p className="text-stone-400 text-sm">
                  {item.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-10 transition-opacity" />

              {/* Corner accent */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-amber-400" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-stone-800 border-2 border-stone-700 rounded-lg px-6 py-3">
            <Image className="w-5 h-5 text-amber-400" />
            <span className="text-stone-400">
              実際の写真はここに配置されます
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
