---
marp: true
theme: ca-business
paginate: true
---

<!-- _class: lead -->

# Android 16KBページサイズ対応を
# はじめからていねいに

### Flutter × Android 15
2025年7月9日

---

# 自己紹介

<div class="columns-2">
<div>

## 西峰 綾汰
### にしみね りょうた

**所属**
- CyberAgent 
- SGEマンガ事業部
- 2024年入社

</div>
<div>

## 趣味・興味
- 🏎️ **F1**
- ♠️ **ポーカー**
- 🎸 **フジロック**  
  今年参戦します！

</div>
</div>

---

# 本日の内容

## 2025年11月以降、必須対応となる16KBページサイズ

1. **なぜ必要？** - パフォーマンス向上の仕組み
2. **何が起きる？** - Flutterアプリへの影響
3. **どう対応する？** - 具体的な導入手順
4. **デモで確認** - build.gradleとネイティブライブラリの設定

### 今日のゴール
**明日から16KB対応を始められる状態に！**

---

<!-- _class: section -->

# 📱 まずは基本から
## 16KBページサイズって何？

---

# そもそもページサイズとは

<div class="columns-2">
<div>

## メモリ管理の基本単位

**ページ** = OSがメモリを管理する最小の単位

- 本の1ページのようなもの
- データの読み書きはページ単位
- これまでは**4KB**が標準

</div>
<div>

## 身近な例で理解

📚 **図書館の本棚**
- 4KB = 薄い本（管理が大変）
- 16KB = 厚い本（管理が楽）

同じ内容なら、厚い本の方が
探しやすい！

</div>
</div>

---

# 4KB → 16KBで何が変わる？

<div class="strategy-grid">
<div class="strategy-section">
<h3>📊 ページ数が1/4に</h3>
<p>100万ページ → 25万ページ</p>
<p>管理コストが大幅削減</p>
</div>
<div class="strategy-section">
<h3>🔍 検索が高速化</h3>
<p>ページテーブルが小さくなる</p>
<p>= メモリアクセスが速い</p>
</div>
<div class="strategy-section">
<h3>🔋 CPU負荷軽減</h3>
<p>ページ切り替えが減る</p>
<p>= バッテリー消費削減</p>
</div>
<div class="strategy-section">
<h3>💾 キャッシュ効率UP</h3>
<p>TLBヒット率が向上</p>
<p>= アプリが軽快に動作</p>
</div>
</div>

## 技術的な詳細
- **TLB（Translation Lookaside Buffer）**: 仮想アドレスを物理アドレスに変換するキャッシュ
- **ページフォルト**: メモリアクセス時に発生する割り込みが減少
- **メモリフラグメンテーション**: 大きなページで断片化が減少

---

# Google Playの新要件

<div class="columns-2">
<div class="metric-card">
<div class="metric-number">2025年<small>11月1日</small></div>
<p>対応期限</p>
</div>
<div class="metric-card">
<div class="metric-number">API<small>35+</small></div>
<p>Android 15以降</p>
</div>
</div>

## 重要なポイント

✅ **対象**: 新規アプリ・アップデート両方  
✅ **条件**: Android 15（API 35）をターゲット  
❌ **未対応**: Google Play審査に**通らない**

**公式要件**: [Google Play Console Help](https://support.google.com/googleplay/android-developer/answer/11926878)

---

# Google Play ターゲットAPI要件

<div class="columns-2">
<div>

## 2025年11月1日からの要件

**新規アプリ・アップデート必須要件：**
- **通常アプリ**: Android 15 (API 35)以上
- **Wear OS**: Android 14 (API 34)以上
- **Android TV**: Android 14 (API 34)以上
- **Android Automotive**: Android 14 (API 34)以上

</div>
<div>

## 16KBページサイズ対応

**API 35をターゲットにすると：**
- 16KBページサイズ対応が**必須**
- ネイティブコード使用時は再コンパイル必要
- 未対応の場合、審査で**リジェクト**

**重要**: API 34以下では16KB対応不要だが、
2025年11月以降は選択肢なし

</div>
</div>

**公式ドキュメント**: [Meet Google Play's target API level requirement](https://support.google.com/googleplay/android-developer/answer/11926878)

---

<!-- _class: section -->

# 📊 実際の効果は？
## パフォーマンス測定結果

---

# Googleの公式テスト結果

<div class="strategy-grid">
<div class="strategy-section">
<h3>🚀 アプリ起動</h3>
<p>最大30%高速化</p>
<span class="badge primary">速度向上</span>
</div>
<div class="strategy-section">
<h3>🔋 電力消費</h3>
<p>4.56%削減</p>
<span class="badge success">省電力</span>
</div>
<div class="strategy-section">
<h3>📸 カメラ起動</h3>
<p>4.5〜6.6%高速化</p>
<span class="badge primary">UX向上</span>
</div>
<div class="strategy-section">
<h3>⚡ システム起動</h3>
<p>8%短縮</p>
<span class="badge warning">全体改善</span>
</div>
</div>

## SDKバージョンによる違い
- **SDK 34以前**: 16KBページサイズ未対応
- **SDK 35（Android 15）**: 16KBページサイズサポート開始
- **SDK 36（Android 16）**: 16KBページサイズがデフォルト予定

**出典**: Android Developers Blog  
"Improving Android memory efficiency - 16 KB page size" (2024)

---

# Flutter実アプリでの測定

<div class="columns-2">
<div class="metric-card">
<div class="metric-number">31.7<small>%増加</small></div>
<p>初回起動時間</p>
</div>
<div>

## 測定データ詳細
```
4KB:  3,815.65 μs
16KB: 5,027.84 μs
```

## なぜ遅くなる？🤔
- 初回のメモリアライメント
- ページテーブルの初期化
- **でも心配無用！**

</div>
</div>

## 詳細なパフォーマンス測定結果

<div class="comparison-matrix">

| メトリクス | 4KB | 16KB | 変化率 |
|-----------|-----|------|---------|
| 初回起動 | 3.82ms | 5.03ms | +31.7% |
| 2回目以降 | 2.15ms | 1.89ms | -12.1% |
| メモリ使用量 | 145MB | 138MB | -4.8% |
| GC频度 | 8.3回/分 | 6.2回/分 | -25.3% |

</div>

💡 **長期的にはメリットが大きい**
- メモリ圧迫時のパフォーマンス向上
- システム全体の安定性向上

---

<!-- _class: section -->

# 🛠️ Flutterアプリへの影響
## 何が問題になるの？

---

# よくあるエラー

## こんなエラーに遭遇します

```
Failure [INSTALL_FAILED_INVALID_APK: 
Failed to extract native libraries, res=-2]
```

## 原因は？

**ネイティブライブラリ（.so）のアライメント不良**

- Flutterアプリには多くの.soファイルが含まれる
- これらが4KB前提でビルドされている
- 16KB環境では動作しない！

---

# ネイティブライブラリ（.so）とは？

## Flutterアプリの構成要素

<div class="columns-2">
<div>

### Dartコード
- `lib/` 以下のコード
- Flutter Frameworkが処理
- **影響なし** ✅

</div>
<div>

### ネイティブライブラリ
- C/C++で書かれたコード
- プラグインに含まれる
- **要対応** ⚠️

</div>
</div>

## 主な.soファイル
- `libflutter.so` - Flutterエンジン
- `libapp.so` - Dartコードのコンパイル結果
- `lib〇〇.so` - 各種プラグイン

---

# 影響を受けるパッケージ

<div class="strategy-grid">
<div class="strategy-section">
<h3>❌ Rive</h3>
<p>アニメーションライブラリ</p>
<p>librive_text.so が非対応</p>
<span class="badge danger">要対応</span>
</div>
<div class="strategy-section">
<h3>⚠️ local_notifications</h3>
<p>通知機能</p>
<p>Desugar制約（Java 11）</p>
<span class="badge warning">要設定</span>
</div>
<div class="strategy-section">
<h3>✅ datadog_flutter</h3>
<p>監視・分析</p>
<p>v2.11.0+で対応済み</p>
<span class="badge success">対応済</span>
</div>
<div class="strategy-section">
<h3>⚠️ Gradle警告</h3>
<p>memory_info, update_available</p>
<p>jcenter使用の警告</p>
<span class="badge warning">注意</span>
</div>
</div>

---

# Android 16での互換モード

## Android 16の新機能

Android 16では16KBページサイズ互換モードが追加されます。

<div class="columns-2">
<div>

### 互換モードの仕組み
- 未対応アプリも4KBモードで実行
- パフォーマンス低下の可能性
- 一時的な回避策

</div>
<div>

### 重要な注意点

⚠️ **Google Play要件は変わらない**
- 2025年11月1日の期限は同じ
- 互換モードに依存しない
- 必ず16KB対応が必要

</div>
</div>

**推奨**: 互換モードに頼らず、早めに完全対応を

---

<!-- _class: section -->

# 🔍 対応方法
## ステップ・バイ・ステップ

---

# STEP1: 現状を確認する

## まずはAPKをチェック

```bash
# 1. APKをビルド
flutter build apk --release

# 2. Googleのチェックスクリプトをダウンロード
curl -O https://android.googlesource.com/\
  .../check_elf_alignment.sh

# 3. チェック実行
./check_elf_alignment.sh build/app/outputs/flutter-apk/app-release.apk
```

## 結果の見方
```
./libflutter.so: ALIGNED (2^16) ✓    # OK!
./libapp.so: ALIGNED (2^14) ✓        # OK!
./libplugin.so: UNALIGNED (2^12) ✗   # 要修正！
```

---

# STEP2: 開発環境を更新

<div class="columns-2">
<div>

## 必要なバージョン

<div class="strategy-section">
<h3>📱 Android SDK</h3>
<p><strong>34 → 35</strong></p>
<p>compileSdk で確認</p>
</div>

<div class="strategy-section">
<h3>🔧 NDK</h3>
<p><strong>r25.1 → r28.1</strong></p>
<p>ndkVersion で確認</p>
<span class="badge primary">推奨</span>
</div>

<div class="strategy-section">
<h3>🏗️ AGP</h3>
<p><strong>8.3.2 → 8.10.0</strong></p>
<p>build.gradle で確認</p>
</div>

</div>
<div>

## アップデート手順

<div class="strategy-section">
<h3>📦 Gradle</h3>
<p><strong>8.9 → 8.11.1</strong></p>
<p>gradle-wrapper.properties</p>
</div>

<div class="strategy-section">
<h3>📚 androidx.core</h3>
<p><strong>1.13.1 → 1.16.0</strong></p>
<p>dependencies で確認</p>
<span class="badge error">必須</span>
</div>

</div>
</div>

---

<!-- _class: section -->

# 📝 build.gradleの設定
## Flutterエンジニア必見！

---

# build.gradleとは？

## Androidアプリのビルド設定ファイル

<div class="columns-2">
<div>

### 📍 場所
```
android/
├── build.gradle          # プロジェクト全体
└── app/
    └── build.gradle      # アプリ本体 ←こっち！
```

</div>
<div>

### 🎯 役割
- ビルドツールのバージョン指定
- 依存関係の管理
- コンパイル設定
- **今回はここを修正！**

</div>
</div>

---

# 必須の修正内容

## android/app/build.gradle

```gradle
android {
    namespace "com.example.myapp"
    compileSdk 35  // ← Android 15に変更
    
    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 21
        targetSdk 35  // ← Android 15に変更
        
        // NDKバージョンによって設定が異なる
        // NDK r26以前の場合（手動設定が必要）
        ndk {
            ldFlags += ["-Wl,-z,max-page-size=16384"]
        }
        
        // NDK r27の場合（CMake設定が必要）
        externalNativeBuild {
            cmake {
                arguments += [
                    "-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON"
                ]
            }
        }
        // NDK r28以降は追加設定不要！
    }
}
```

---

# NDKバージョンの指定

<div class="columns-2">
<div>

## NDK更新の変遷

<div class="metric-card">
<div class="metric-number">r25.1</div>
<p>Android 14標準</p>
</div>

<div class="metric-card">
<div class="metric-number">r27.2</div>
<p>Android 15初期対応</p>
</div>

<div class="metric-card">
<div class="metric-number">r28.1</div>
<p>16KB完全対応 ✅</p>
</div>

</div>
<div>

## バージョン別設定方法

### 🟡 NDK r27（設定が必要）
```gradle
android {
    ndkVersion "27.2.12479018"
    
    externalNativeBuild {
        cmake {
            arguments += [
                "-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON"
            ]
        }
    }
}
```

### 🟢 NDK r28+（推奨）
```gradle
android {
    ndkVersion "28.1.13356709"
    // 追加設定不要！自動対応
}
```

</div>
</div>

---

# 依存関係の更新

## androidx.coreの更新が必須

```gradle
dependencies {
    implementation 'androidx.core:core-ktx:1.16.0'  // ← 1.16.0以上必須
    
    // その他の依存関係...
}
```

## AGPバージョンも確認

**android/build.gradle** (プロジェクトレベル)
```gradle
buildscript {
    ext.kotlin_version = '1.9.0'
    dependencies {
        classpath 'com.android.tools.build:gradle:8.6.0'  // ← 8.6.0以上
    }
}
```

---

<!-- _class: section -->

# 🎬 実際にやってみよう
## デモンストレーション

---

# デモ: APKのチェック

## 1. 既存APKの状態確認

```bash
# APKをビルド
$ flutter build apk --release
✓ Built build/app/outputs/flutter-apk/app-release.apk

# チェックスクリプト実行
$ ./check_elf_alignment.sh app-release.apk

Checking app-release.apk...
libflutter.so: ALIGNED (2^14) ⚠️
libapp.so: ALIGNED (2^14) ⚠️
librive_text.so: UNALIGNED (2^12) ❌
```

**結果**: 16KB対応が必要！

---

# デモ: build.gradle修正

## 2. 設定ファイルの修正

### Before
```gradle
android {
    compileSdk 34
    
    defaultConfig {
        targetSdk 34
    }
}
```

### After（NDK r27の場合）
```gradle
android {
    compileSdk 35
    ndkVersion "27.2.12479018"
    
    defaultConfig {
        targetSdk 35
        
        externalNativeBuild {
            cmake {
                arguments += [
                    "-DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON"
                ]
            }
        }
    }
}
```

### After（NDK r28の場合 - 推奨）
```gradle
android {
    compileSdk 35
    ndkVersion "28.1.13356709"  // 追加設定不要！
    
    defaultConfig {
        targetSdk 35
    }
}
```

---

# デモ: 再ビルドと確認

## 3. クリーンビルドと検証

```bash
# クリーンビルド
$ flutter clean
$ flutter pub get
$ flutter build apk --release

# 再度チェック
$ ./check_elf_alignment.sh app-release.apk

Checking app-release.apk...
libflutter.so: ALIGNED (2^16) ✅
libapp.so: ALIGNED (2^16) ✅
librive_text.so: UNALIGNED (2^12) ❌  # プラグイン側の対応待ち
```

**Flutter本体は対応完了！**

---

<!-- _class: section -->

# 🐛 トラブルシューティング
## よくある問題と解決方法

---

# エラー別対処法

## 1. INSTALL_FAILED_INVALID_APK

```bash
# Gradleキャッシュをクリア
./gradlew clean
rm -rf ~/.gradle/caches/

# 再ビルド
flutter build apk --release
```

## 2. AGP/Gradle互換性エラー

```
Dependency 'androidx.core:core-ktx:1.16.0' requires AGP 8.6.0+
```

**解決**: android/gradle/wrapper/gradle-wrapper.properties
```properties
distributionUrl=https://services.gradle.org/\
  distributions/gradle-8.11.1-all.zip
```

## 3. NDKバージョンエラー

```
No version of NDK matched the requested version
```

**解決**: Android StudioでNDKをインストール
1. **SDK Manager** → **SDK Tools**タブ
2. **Show Package Details**をチェック
3. 必要なNDKバージョンを選択してインストール

---

# プラグイン対応状況の確認

## 対応待ちプラグインの場合

### 1. 代替ライブラリを検討
- Rive → Lottie
- 独自実装 → Flutter標準機能

### 2. Issue/PRを確認
```bash
# GitHubで確認
https://github.com/[plugin-name]/issues
→ "16KB" や "page size" で検索
```

### 3. 一時的な回避策
```yaml
# pubspec.yaml
dependency_overrides:
  plugin_name:
    git:
      url: https://github.com/user/plugin_name
      ref: 16kb-support  # フォーク版を使用
```

### 4. ネイティブライブラリの再ビルド
```bash
# NDK r26以前の場合
export LOCAL_LDFLAGS="-Wl,-z,max-page-size=16384"
./gradlew :plugin_name:assembleRelease

# NDK r27の場合
export APP_SUPPORT_FLEXIBLE_PAGE_SIZES=true
./gradlew :plugin_name:assembleRelease
```

---

# Riveライブラリの16KB対応

## 対応状況と解決策

### 現状（2025年1月時点）
- **librive_text.so** が16KB未対応
- Flutter本体は対応済みだが、Riveプラグインがボトルネック

### 対応方法

1. **NDK r28.1を使用**
   ```gradle
   android {
       ndkVersion "28.1.13356709"  // PR #4198で検証済み
   }
   ```

2. **check_elf_alignment.shで確認**
   ```bash
   # すべてのライブラリがALIGNEDになることを確認
   ./check_elf_alignment.sh app-release.apk
   ```

3. **一時的な代替案**
   - Lottieアニメーション使用を検討
   - RiveのIssueを監視して最新版を確認

### Riveライブラリの手動修正（上級者向け）
```bash
# Riveライブラリをリビルド
git clone https://github.com/rive-app/rive-flutter
cd rive-flutter

# NDK設定を追加
export ANDROID_NDK_HOME=/path/to/ndk/28.1.13356709
export LOCAL_LDFLAGS="-Wl,-z,max-page-size=16384"

# ビルド
./build.sh android
```

---

# テスト環境の構築

## 16KBエミュレータのセットアップ

1. **Android Studio** → AVD Manager
2. **Create Virtual Device**
3. **System Image選択画面で**:

<div class="comparison-matrix">

| 項目 | 選択内容 |
|------|---------|
| Release Name | **Android 15** |
| API Level | **35** |
| ABI | **x86_64** |
| Target | **16k Page Size (Experimental)** ⚠️ |

</div>

4. **Advanced Settings**:
   - RAM: **8GB以上**推奨
   - Internal Storage: **4GB以上**

## エミュレータでの検証ポイント

```bash
# ページサイズの確認
adb shell getconf PAGE_SIZE
# 16384 と表示されればOK

# アプリのインストールテスト
adb install app-release.apk

# ログの確認
adb logcat | grep -i "page\|align"
```

---

<!-- _class: section -->

# 📋 まとめ
## 今日から始める16KB対応

---

# 対応チェックリスト 1/4

## 現状確認

### APKチェック
```bash
./check_elf_alignment.sh app-release.apk
```

### プラグイン対応状況
- Riveライブラリのステータス確認
- ネイティブライブラリを含むプラグインのリストアップ

---

# 対応チェックリスト 2/4

## 環境更新

### 必須バージョン
- **Flutter**: 3.24.1以上
- **NDK**: r27以上（推奨: r28.1）
- **AGP**: 8.6.0以上

### 更新コマンド
```bash
flutter upgrade
```

---

# 対応チェックリスト 3/4

## 設定変更

### build.gradleの修正
```gradle
android {
    compileSdk 35
    targetSdk 35
    ndkVersion "28.1.13356709"
}
```

### 依存関係
```gradle
implementation 'androidx.core:core-ktx:1.16.0'
```

---

# 対応チェックリスト 4/4

## テスト

### 16KBエミュレータで確認
- AVD Managerで「16k Page Size (Experimental)」を選択
- アプリの起動テスト
- パフォーマンス測定

### 最終確認
```bash
./check_elf_alignment.sh app-release.apk
# すべてALIGNED (2^16)になること
```

---

# なぜ今から準備が必要か

<div class="columns-2">
<div>

## 2025年11月まで「まだ時間がある」？

### ❌ 実はそうでもない理由

**1. プラグインの対応待ち時間**
- 人気プラグインほど対応に時間がかかる
- 代替ライブラリの検討・実装期間が必要

**2. 段階的なテスト期間**
- 社内テスト → ベータ版 → 本番リリース
- 各段階で問題が見つかる可能性

</div>
<div>

## 必要な準備期間の目安

<div class="metric-card">
<div class="metric-number">3-4<small>ヶ月</small></div>
<p>プラグイン対応待ち</p>
</div>

<div class="metric-card">
<div class="metric-number">2-3<small>ヶ月</small></div>
<p>実装・テスト期間</p>
</div>

**3. 予期せぬ問題への対処**
- ネイティブコードの修正
- パフォーマンスチューニング
- ユーザーフィードバック対応

</div>
</div>

### 💡 早めの対応で余裕を持った移行を！

---

# 実装時の注意点 1/3

## 段階的な対応が必要

### 実際のPRから学ぶ
- **PR #4049**: Android 15基本対応
  - NDK r27.2.12479018を使用
  - 基本的なSDK/AGP更新
  
- **PR #4198**: 16KB完全対応
  - NDK r28.1.13356709へ更新
  - Riveライブラリ問題解決

**ポイント**: プラグインの対応状況により複数回の更新が必要

---

# 実装時の注意点 2/3

## 技術的な制約

### Desugar制約
- flutter_local_notificationsの制約でJava 11に制限
- 最新のJava機能が使用不可

### Gradle警告
- memory_infoがjcenter使用
- update_availableがjcenter使用
- 将来的な移行が必要

### buildDir非推奨
- 影響範囲が大きいため移行見送り
- 次回の大規模更新で対応予定

---

# 実装時の注意点 3/3

## 検証の重要性

### 複数の検証手法を併用
```bash
# 1. スクリプトでの確認
./check_elf_alignment.sh app-release.apk

# 2. Android Studioでの確認
# Build > Analyze APK

# 3. 実機での動作確認
# 16KBエミュレータでのテスト
```

### 検証ポイント
- すべてのネイティブライブラリがALIGNED
- アプリの起動と基本動作
- パフォーマンスの変化

### パフォーマンス測定方法
```bash
# ベンチマークアプリを使用
adb shell am start -W com.example.app/.MainActivity

# メモリ使用量の確認
adb shell dumpsys meminfo com.example.app

# CPU使用率のモニタリング
adb shell top -m 10 | grep com.example.app
```

---

# 参考リソース

## 公式ドキュメント
- [Android 16KB対応ガイド](https://developer.android.com/guide/practices/page-sizes)
- [Flutter Android 15 Wiki](https://github.com/flutter/flutter/wiki/Android-15)

## トラブルシューティング
- [Flutter Issue #150168](https://github.com/flutter/flutter/issues/150168)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/android-16kb-page-size)

## サンプルコード
- [サンプルアプリ](https://github.com/android/platform-samples)

---

<!-- _class: lead -->

# ご清聴ありがとうございました

## 質問・ディスカッション

### 一緒に16KB対応を進めましょう！

Twitter: @your_twitter  
GitHub: @your_github