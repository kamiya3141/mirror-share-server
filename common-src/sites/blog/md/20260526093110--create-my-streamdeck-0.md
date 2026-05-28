# 第０回 自作streamdeck 準備編

## 今回作ろうと思った経緯
* StreamDeckがすげー高い
* 自作できる余地があるなら極力お金を使わないのが私流
* AutoHotkey v2で似たようなものを作ったが、使い勝手が悪い
* ~~spacedeskを使用する関係で同じネットワーク内にいなきゃいけないとかどんな拷問？~~

## 今回必要なもの一覧
* **プログラミング未経験者に比べ、経験・知識が髪の毛一本分以上の差があること**
* **cloudflare + 自前サーバ or WSL** or rootに入れるVPS
 * **cloudflareの場合**
  * ドメイン
  * アカウント
  * サーバ用pc
  * cloudflaredのコネクタ: websocket.example.com -> http://localhost:XXXX
 * **WSLの場合**
  * OS: Debian13
 * VPSの場合
  * root権限(sudoできりゃ充分ニダ)
 * Node.js
 * npm
 * pnpm
* Windows11 PC
 * AutoHotkey v2.0.19
* 最新版のchrome or safariが利用できるpcとは別の端末