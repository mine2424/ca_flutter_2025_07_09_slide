# Claude Code Rules for Marp Slide Generation

このドキュメントは、Claude Codeを使用してMarpスライドを生成する際のルールとガイドラインを定義しています。

最終更新: 2025年1月6日

## 更新履歴

### 2025年1月6日
- メインカラーを#e7140fに変更（CAブランドカラー）
- パディングを30px 40pxに縮小（コンパクト設計）
- コードブロックの高さ調整（最大60vh、行間1.6）
- インラインコードのパディング改善（4px 8px）
- 30枚のスライド構成でAndroid 15対応ガイドを作成

## 目次

1. [プロジェクト構造](#プロジェクト構造)
2. [スライド作成の制約](#スライド作成の制約)
3. [カスタムコンポーネント](#カスタムコンポーネント)
4. [スライドタイプ](#スライドタイプ)
5. [コマンド](#コマンド)
6. [ベストプラクティス](#ベストプラクティス)
7. [Claude Code連携](#claude-code連携)
8. [トラブルシューティング](#トラブルシューティング)

## プロジェクト構造

```
ca_flutter_2025_07_09_slide/
├── .claude/          # Claude Code設定
├── .marprc.yml       # Marp CLI設定
├── CLAUDE.md         # このファイル
├── package.json      # Node.js設定とスクリプト
├── themes/           # カスタムテーマ
│   └── theme.css     # ca-businessテーマ
├── input/            # 入力Markdownファイル
├── output/           # 生成されたスライドとPDF
├── docs/             # ドキュメント
└── slide_rules.md    # スライド作成ルール
```

## スライド作成の制約

### 文字数制限
- **タイトル（h1）**: 最大30文字
- **本文1行**: 最大40文字
- **1スライド**: 最大400文字、12行まで

### レイアウト制約
- **画像**: 最大2枚/スライド
- **見出し**: h1-h3のみ使用（h4以降は小さすぎる）
- **リスト**: 最大3階層まで

## カスタムコンポーネント

### 数値強調（メトリックカード）
```markdown
<div class="columns-3">
  <div class="metric-card">
    <div class="metric-number">380<small>億円</small></div>
    <p>2023年 市場規模</p>
  </div>
</div>
```

### 戦略グリッド
```markdown
<div class="strategy-grid">
  <div class="strategy-section">
    <h3>💬 タイトル</h3>
    <p>説明文</p>
    <span class="badge primary">カテゴリ</span>
  </div>
</div>
```

### 比較マトリックス
```markdown
<div class="comparison-matrix">
| 機能 | プランA | プランB |
|------|---------|---------|
| 価格 | ¥1,000  | ¥2,000  |
</div>
```

## スライドタイプ

### タイトルスライド
```markdown
---
class: lead
---

# メインタイトル
## サブタイトル
2025年7月9日
```

### セクション区切り
```markdown
---
class: section
---

# セクションタイトル
```

## コマンド

### 開発
```bash
npm run dev          # ウォッチモードでサーバー起動
npm run preview      # プレビューモード
```

### ビルド
```bash
npm run build        # HTML生成
npm run build:pdf    # PDF生成
npm run build:all    # HTML+PDF生成
```

### ユーティリティ
```bash
npm run template     # 今日の日付でテンプレート作成
npm run clean        # 出力ディレクトリをクリーン
npm run validate     # スライドの制約チェック
```

## ベストプラクティス

1. **簡潔に**: 1スライド1メッセージを心がける
2. **視覚的に**: 文字より図表を優先
3. **構造化**: 見出しとリストで整理
4. **一貫性**: テーマとスタイルを統一
5. **アクセシビリティ**: 色のコントラストに注意

## テーマカスタマイズ

`themes/theme.css`で以下をカスタマイズ可能：
- カラースキーム（CSS変数で定義）
- フォントサイズと行間
- カスタムコンポーネントのスタイル
- アニメーション効果

## トラブルシューティング

### フォントが表示されない
- インターネット接続を確認（Google Fontsを使用）
- ローカルフォントの使用を検討

### PDFエクスポートでレイアウトが崩れる
- `--pdf-notes`オプションを確認
- Chrome/Chromiumのバージョンを更新

### テーマが適用されない
- `.marprc.yml`のthemeパスを確認
- CSSファイルの`@theme`ディレクティブを確認

## Claude Code連携

### カスタムコマンドの使い方

1. **スライド生成コマンド**
   ```
   @generate-slides
   ```
   入力ファイルから制約に従ったスライドを生成

2. **スライド検証コマンド**
   ```
   @validate-slides
   ```
   制約違反をチェックして報告

### Claude Codeへの指示例

```markdown
以下のトピックについてスライドを作成してください：
- Flutter 3.0の新機能
- パフォーマンス改善
- 実装例

制約：
- 各スライド最大400文字
- メトリックカードで数値を強調
- 比較表を含める
```

### 効果的なプロンプト

1. **具体的な要求**
   - トピックを明確に指定
   - 必要なスライド数を提示
   - 含めるべき要素を列挙

2. **スタイル指定**
   - フォーマルまたはカジュアル
   - 技術的な深さのレベル
   - 対象オーディエンス

3. **構造の指定**
   - アジェンダの有無
   - セクション分け
   - まとめスライドの形式

## 高度な使い方

### カスタムレイアウト

```markdown
<!-- _class: custom-layout -->

# カスタムレイアウトの例

<style scoped>
section.custom-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
```

### アニメーション

```css
/* theme.css に追加 */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-slide {
  animation: slideIn 0.5s ease-out;
}
```

### 条件付きスタイル

```markdown
<!-- _backgroundColor: #f0f0f0 -->
<!-- _color: #333 -->

# 背景色を変更したスライド
```

## パフォーマンスTips

1. **画像の最適化**
   - WebP形式を使用
   - 適切なサイズにリサイズ
   - 遅延読み込みを検討

2. **フォントの最適化**
   - 必要なウェイトのみ読み込み
   - フォントのサブセット化
   - ローカルフォントの使用

3. **CSSの最適化**
   - 未使用のスタイルを削除
   - CSSの縮小化
   - Critical CSSの抽出

## 現在のテーマ設定

### カラーパレット（2025年1月6日更新）
```css
:root {
  --primary-color: #e7140f;     /* CAブランドレッド */
  --secondary-color: #ff4d49;   /* 明るいレッド */
  --accent-color: #FF6B35;      /* アクセントオレンジ */
  --success-color: #22C55E;     /* 成功グリーン */
  --warning-color: #F59E0B;     /* 警告イエロー */
  --error-color: #EF4444;       /* エラーレッド */
}
```

### レイアウト設定
```css
section {
  padding: 30px 40px;  /* コンパクト設計 */
  font-size: 24px;     /* 基準フォントサイズ */
  line-height: 1.4;    /* 読みやすい行間 */
}

/* コードブロック */
section pre {
  font-size: 18px;
  line-height: 1.6;
  max-height: 60vh;    /* 画面の60%まで */
  overflow-y: auto;    /* スクロール可能 */
}

/* インラインコード */
section code {
  padding: 4px 8px;    /* 読みやすいパディング */
  font-size: 0.85em;
  line-height: 1.4;
}
```

## プロジェクト固有の設定

### Android 15対応スライドの構成
1. タイトルスライド - 完全攻略ガイド
2. 重要なお知らせ（締切: 2025年11月1日）
3. 技術的背景と影響
4. パフォーマンス測定結果（31.7%増加）
5. パッケージ対応状況（Rive非対応など）
6. 実装手順とコード例
7. トラブルシューティング
8. ベストプラクティス

計30枚のスライドで包括的にカバー