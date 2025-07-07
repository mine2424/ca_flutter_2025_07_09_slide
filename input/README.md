# Input Directory

このディレクトリにスライドのソースとなるMarkdownファイルを配置します。

## ファイル命名規則

- `YYYYMMDD_topic.md` - 日付とトピック名
- 例: `20250709_flutter_introduction.md`

## スライドの作成方法

1. テンプレートをコピー:
   ```bash
   npm run template
   ```

2. 生成されたファイルを編集

3. 開発サーバーでプレビュー:
   ```bash
   npm run dev
   ```

4. 制約チェック:
   ```bash
   npm run validate
   ```

## 注意事項

- 必ずUTF-8エンコーディングで保存
- 各スライドは`---`で区切る
- 最初のスライドにMarpのメタデータを含める