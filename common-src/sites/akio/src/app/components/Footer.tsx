import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">KODAMA教</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              心に響く、木霊のように。<br />
              自然と調和し、心を清め、<br />
              魂を磨く信仰の道。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">クイックリンク</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#teachings" className="hover:text-emerald-400 transition-colors">
                  教義
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-emerald-400 transition-colors">
                  活動
                </a>
              </li>
              <li>
                <a href="#messages" className="hover:text-emerald-400 transition-colors">
                  御言葉
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-emerald-400 transition-colors">
                  参拝案内
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">お問い合わせ</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>〒100-0001</li>
              <li>東京都木霊区霊峰1-2-3</li>
              <li className="pt-2">TEL: 03-XXXX-XXXX</li>
              <li>Email: info@kodama-kyo.jp</li>
              <li className="pt-2">受付時間: 9:00 - 17:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> for friends
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2026 KODAMA教. このサイトはネタです。All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
