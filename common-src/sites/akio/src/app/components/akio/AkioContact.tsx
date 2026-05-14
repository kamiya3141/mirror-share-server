import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MessageSquare, User } from 'lucide-react';

export function AkioContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('メッセージが送信されました！\n（このフォームはデモです）');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900 border-t-2 border-amber-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-tight">
            連絡
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6" />
          <p className="text-xl text-stone-400 max-w-2xl mx-auto font-semibold">
            戦士への伝言はこちらから
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-800 border-2 border-amber-700 rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-amber-100 mb-2">
                <User className="w-4 h-4" />
                名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-900 border-2 border-stone-700 rounded-lg text-amber-100 placeholder-stone-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all"
                placeholder="あなたの名前"
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-amber-100 mb-2">
                <Mail className="w-4 h-4" />
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-900 border-2 border-stone-700 rounded-lg text-amber-100 placeholder-stone-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-bold text-amber-100 mb-2">
                <MessageSquare className="w-4 h-4" />
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-stone-900 border-2 border-stone-700 rounded-lg text-amber-100 placeholder-stone-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all resize-none"
                placeholder="伝えたいことを書いてくれ..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border-2 border-amber-500"
            >
              <Send className="w-5 h-5" />
              送信する
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t-2 border-stone-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
                <Mail className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xs text-stone-500 mb-1">Email</div>
                <div className="text-sm text-amber-100 font-semibold">akio@orc.warrior</div>
              </div>

              <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
                <MessageSquare className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xs text-stone-500 mb-1">Twitter</div>
                <div className="text-sm text-amber-100 font-semibold">@akio_the_orc</div>
              </div>

              <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
                <MessageSquare className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xs text-stone-500 mb-1">Discord</div>
                <div className="text-sm text-amber-100 font-semibold">OrcAkio#0815</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-stone-500 text-sm">
            気軽に連絡してくれ。返信には少し時間がかかるかもしれんが、必ず返す。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
