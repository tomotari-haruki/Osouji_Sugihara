# おそうじのスギハラ デモサイト

大阪府八尾市のハウスクリーニング業者「おそうじのスギハラ」向けの、静的HTML/CSS/JavaScriptデモサイトです。

## 開き方

`index.html` をブラウザで開くと確認できます。ビルドや依存関係のインストールは不要です。

## 実装内容

- モバイルファーストのレスポンシブ設計
- ファーストビューの大きなCTA、電話導線、固定モバイルCTA
- サービス料金カード、お悩み、強み、対応エリア、お客様の声、FAQ
- 入力フォーム、送信完了メッセージ、任意のフィードバック項目
- LocalBusiness / FAQPage のJSON-LD構造化データ
- WebSite / Service のJSON-LD構造化データ
- 会社概要、特定商取引法に基づく表記、キャンセル・変更規定
- 作業事例セクションとサイトマップ
- `dataLayer`、`gtag`、Contentsquare `_uxa` へ送れる計測イベントの土台
- 画像のWebP/JPEG最適化、遅延読み込み、alt属性

## 検証メモ

- `npx --yes html-validate@latest index.html`
- `node --check scripts.js`
- Lighthouse mobile: Performance 100 / Accessibility 97 / SEO 100
- 確認用スクリーンショット: `screenshots/desktop-home.png`, `screenshots/mobile-lighthouse.png`

## 公開前の確認事項

法令表示はデモ用に整備しています。正式公開時は、運営責任者の正式氏名、支払方法、キャンセル料の条件、対応エリア、実際の施工写真・口コミ掲載許可を事業者に確認してください。

## 計測ツールの接続

本番化する場合は、Google AnalyticsのタグまたはContentsquareタグを`index.html`に追加してください。`scripts.js`のイベント送信は、`gtag`または`window._uxa`が存在する場合に自動で連携します。

## 画像クレジット

写真はUnsplashの無料利用可能な写真をデモ用に最適化しています。

- Hero: Vitaly Gariev / Unsplash
- Air conditioner: Andrianto Cahyono Putro / Unsplash
- Kitchen: Linus Belanger / Unsplash
- Bathroom: micheile henderson / Unsplash
