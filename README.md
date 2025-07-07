# CA Flutter 2025 スライドテンプレート

Marpを使用したFlutter技術プレゼンテーション用スライドテンプレート

[![Marp](https://img.shields.io/badge/Marp-v3.2.0-blue)](https://marp.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-CA%20Business-e7140f)](themes/theme.css)

## 🎯 プロジェクト概要

このプロジェクトは、Flutter関連の技術プレゼンテーションを作成するためのMarpベースのスライドシステムです。特にAndroid 15の16KB Page Size対応など、最新の技術トピックに対応したスライド作成を支援します。

### 主な特徴

- 🎨 **カスタムテーマ**: CAブランドカラー（#e7140f）を使用したプロフェッショナルなデザイン
- 📱 **レスポンシブ対応**: 様々な画面サイズで最適な表示
- 🚀 **高速ビルド**: Marp CLIによる高速なHTML/PDF生成
- 📊 **リッチなコンポーネント**: メトリックカード、戦略グリッド、比較マトリックスなど
- 🤖 **Claude Code統合**: AIアシスタントによるスライド作成支援
- 🖨️ **多形式出力**: HTML、PDF、画像形式での出力に対応

## 📋 必要な環境

- Node.js 14.0以降
- npm または yarn
- Chrome/Chromium（PDFエクスポート用）

## 🚀 クイックスタート

```bash
# リポジトリのクローン
git clone <repository-url>
cd ca_flutter_2025_07_09_slide

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# スライドのビルド
npm run build

# PDFの生成
npm run build:pdf
```

## 🛠️ 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | ウォッチモードで開発サーバーを起動 |
| `npm run build` | HTMLファイルを生成 |
| `npm run build:pdf` | PDFファイルを生成 |
| `npm run build:all` | HTMLとPDFを同時に生成 |
| `npm run preview` | ブラウザでプレビュー |
| `npm run clean` | 出力ディレクトリをクリーン |
| `npm run template` | 今日の日付で新しいスライドテンプレートを作成 |
| `npm run validate` | スライドの制約チェック |

## 📁 プロジェクト構造

```
ca_flutter_2025_07_09_slide/
├── .claude/                  # Claude Code設定
├── .marprc.yml              # Marp CLI設定
├── CLAUDE.md                # Claude Code用プロジェクトルール
├── README.md                # このファイル
├── package.json             # Node.js設定とスクリプト
├── slide_rules.md           # スライド作成ガイドライン
├── themes/                  # カスタムテーマ
│   └── theme.css           # ca-businessテーマ（メインカラー: #e7140f）
├── input/                   # ソースMarkdownファイル
│   ├── flutter_android15_16kb_page_size.md  # メインプレゼンテーション
│   └── 20250709_example.md                   # サンプルスライド
└── output/                  # 生成されたHTML/PDFファイル
```

## 🎨 テーマのカスタマイズ

### カラーパレット

現在のテーマは以下のカラーを使用しています：

- **プライマリーカラー**: #e7140f（CA赤）
- **セカンダリーカラー**: #ff4d49
- **成功**: #22C55E
- **警告**: #F59E0B
- **エラー**: #EF4444

### スタイル調整

`themes/theme.css`で以下の要素をカスタマイズできます：

- パディング: 現在30px 40px（コンパクト設計）
- フォントサイズ: 基準24px
- コードブロック: 最大高さ60vh、行間1.6
- インラインコード: パディング4px 8px

## 📝 スライド作成のベストプラクティス

### 文字数制限
- **タイトル（h1）**: 最大30文字
- **本文1行**: 最大40文字
- **1スライド**: 最大400文字、12行まで

### レイアウトガイドライン
- **画像**: 最大2枚/スライド
- **見出し**: h1-h3のみ使用
- **リスト**: 最大3階層まで

### カスタムコンポーネントの使用例

#### メトリックカード
```markdown
<div class="columns-2">
  <div class="metric-card">
    <div class="metric-number">31.7<small>%増加</small></div>
    <p>初回起動時間の変化</p>
  </div>
</div>
```

#### 戦略グリッド
```markdown
<div class="strategy-grid">
  <div class="strategy-section">
    <h3>📦 タイトル</h3>
    <p>説明文</p>
    <span class="badge primary">カテゴリ</span>
  </div>
</div>
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

1. **フォントが表示されない**
   - インターネット接続を確認（Google Fontsを使用）
   - ローカルフォントの使用を検討

2. **PDFエクスポートでレイアウトが崩れる**
   - Chrome/Chromiumのバージョンを更新
   - `--pdf-notes`オプションを確認

3. **テーマが適用されない**
   - `.marprc.yml`のthemeパスを確認
   - CSSファイルの`@theme`ディレクティブを確認

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Marp](https://marp.app/) - Markdownプレゼンテーションエコシステム
- [Flutter](https://flutter.dev/) - 美しいネイティブアプリケーションのフレームワーク

---

最終更新: 2025年1月6日