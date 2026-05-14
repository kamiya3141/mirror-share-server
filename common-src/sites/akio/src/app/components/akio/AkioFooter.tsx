import { Skull, Swords, Flame } from 'lucide-react';

export function AkioFooter() {
  return (
    <footer className="bg-stone-950 text-amber-100 py-12 border-t-2 border-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Skull className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-bold tracking-wider">AKIO</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              荒野を駆ける、野生の魂。<br />
              大学生という名の戦士。<br />
              肉を喰らい、力を蓄える。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-500" />
              メニュー
            </h3>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#profile" className="hover:text-amber-500 transition-colors">
                  プロフィール
                </a>
              </li>
              <li>
                <a href="#battles" className="hover:text-amber-500 transition-colors">
                  戦歴
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-amber-500 transition-colors">
                  スキル
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-500 transition-colors">
                  ギャラリー
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-500 transition-colors">
                  連絡
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              SNS
            </h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>Twitter: @akio_the_orc</li>
              <li>Discord: OrcAkio#0815</li>
              <li>Email: akio@orc.warrior</li>
              <li className="pt-2 text-xs text-stone-600">
                ※このサイトはネタです
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-stone-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              © 2026 AKIO THE ORC. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-stone-600 text-xs">
              <span>友人間でのネタサイトです</span>
              <span>•</span>
              <span>実在の人物とは関係ありません</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-amber-600 font-bold text-sm">
              「強くあれ、野生であれ、そして笑え」- AKIO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
