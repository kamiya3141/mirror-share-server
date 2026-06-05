# 第０回 自作streamdeck 準備編

## 今回作ろうと思った経緯
* StreamDeckがすげー高い
* 自作できる余地があるなら極力お金を使わないのが私流
* AutoHotkey v2で似たようなものを作ったが、使い勝手が悪い
* ~~spacedeskを使用する関係で同じネットワーク内にいなきゃいけないとかどんな拷問？~~
<details>
<summary>~~愚痴~~</summary>

> おい!うちの大学！認証ついてるんだからf〇〇-wifiと有線の行き来可能にしろよな！！
</details>

## 今回必要なもの一覧
※本記事では黄色の文字のものを扱います(水色の文字は実際の私の構成です)

* **未経験者**比較した際に、プログラミング経験・知識が**__髪の毛一本分以上の差__**を有すること
* **@css["color:lightblue;"](cloudflare + 自前サーバ) or @css["color:yellow;"](WSL)** or rootに入れるVPS
 * **@css["color:lightblue;"](cloudflareの場合)**
  * ドメイン
  * アカウント
  * サーバ用pc
  * cloudflaredのコネクタ: websocket.example.com -> http://localhost:XXXX
 * **@css["color:yellow;"](WSLの場合)**
  * OS: Debian13
 * VPSの場合
  * root権限(sudoできりゃ充分ニダ)
 * Node.js
 * npm
 * pnpm
* Windows11 PC
 * AutoHotkey v2.0.19
* 最新版のchrome or safariが利用できるpcとは別の端末
> ~~できればAndroidが良いと思います、なぜなら私はAndroidが好きで、iosが嫌いだからです~~
