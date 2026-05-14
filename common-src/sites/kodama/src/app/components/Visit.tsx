import { motion } from 'motion/react';
import { MapPin, Clock, Train, Phone, Mail, DollarSign } from 'lucide-react';

export function Visit() {
  return (
    <section id="visit" className="py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            参拝案内
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            皆様のお越しを心よりお待ちしております
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">所在地</h3>
                  <p className="text-gray-600">
                    〒100-0001<br />
                    東京都木霊区霊峰1-2-3<br />
                    KODAMA教本山
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">参拝時間</h3>
                  <p className="text-gray-600">
                    平日：6:00 - 18:00<br />
                    土日祝：5:00 - 19:00<br />
                    <span className="text-sm text-emerald-600">年中無休</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Train className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">アクセス</h3>
                  <p className="text-gray-600">
                    ◆ 電車でお越しの方<br />
                    JR山手線「木霊駅」より徒歩5分<br />
                    <br />
                    ◆ お車でお越しの方<br />
                    専用駐車場完備（100台）
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">初穂料</h3>
                  <p className="text-gray-600">
                    一般参拝：無料<br />
                    祈祷：5,000円〜<br />
                    <span className="text-sm text-gray-500">※お気持ちでお納めください</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Map & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold">地図エリア</p>
                <p className="text-sm text-gray-600 mt-2">
                  実際のサイトではGoogle Mapsなどを<br />
                  埋め込むことができます
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">お問い合わせ</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-600">03-XXXX-XXXX</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-600">info@kodama-kyo.jp</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                受付時間：9:00 - 17:00（年中無休）
              </p>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">参拝時のお願い</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 境内は禁煙です</li>
                <li>• 静粛にお参りください</li>
                <li>• 写真撮影は可能ですが、他の参拝者にご配慮ください</li>
                <li>• ペット同伴はご遠慮ください</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
