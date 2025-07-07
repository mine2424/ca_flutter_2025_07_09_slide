# クイックスタートガイド

## 1. セットアップ（初回のみ）

```bash
# 依存関係のインストール
npm install
```

## 2. スライド作成の流れ

### ステップ1: テンプレートから新規作成

```bash
npm run template
```
→ `input/20250709_draft.md` が作成されます

### ステップ2: 開発サーバーで編集

```bash
npm run dev
```
→ ブラウザが開き、リアルタイムプレビューが表示されます

### ステップ3: 内容を編集

`input/20250709_draft.md` を編集して、スライドを作成します。

**制約を守りましょう:**
- タイトル: 30文字以内
- 1行: 40文字以内
- 1スライド: 400文字、12行以内

### ステップ4: 制約チェック

```bash
npm run validate
```

### ステップ5: ビルド

```bash
# HTMLとPDFを生成
npm run build:all
```

## 3. カスタムコンポーネントの使い方

### 数値強調
```html
<div class="metric-card">
  <div class="metric-number">100<small>%</small></div>
  <p>達成率</p>
</div>
```

### 2列レイアウト
```html
<div class="strategy-grid">
  <div class="strategy-section">
    <h3>📊 タイトル</h3>
    <p>説明文</p>
    <span class="badge primary">タグ</span>
  </div>
</div>
```

## 4. よく使うコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build:pdf` | PDF生成 |
| `npm run validate` | 制約チェック |
| `npm run clean` | 出力をクリーン |

## 5. トラブルシューティング

### PDFが生成されない
- Chrome/Chromiumがインストールされているか確認
- `npm install` を再実行

### フォントが表示されない
- インターネット接続を確認（Google Fonts使用）

### テーマが適用されない
- `.marprc.yml` のthemeパスを確認
- CSSファイルの存在を確認