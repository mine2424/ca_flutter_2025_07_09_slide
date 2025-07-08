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

<div style="margin-top: 10px; font-size: 18px; line-height: 1.3;">
<strong>技術用語</strong>: TLB = アドレス変換キャッシュ | ページフォルト = メモリ割り込み減少 | フラグメンテーション = 断片化削減
</div>

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

## 2025年8月31日からの要件

**新規アプリ・既存アプリのアップデート必須要件：**
- Android 15 (API 35)以上

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

**公式ドキュメント**: [Target API level requirements for Google Play apps](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)

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

**出典**: [Support 16 KB page sizes - Benefits and performance gains](https://developer.android.com/guide/practices/page-sizes#benefits)

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
<div class="columns-2">
<div>

### 主な.soファイル
- `libflutter.so` - Flutterエンジン
- `libapp.so` - Dartコードのコンパイル結果
- `lib〇〇.so` - 各種プラグイン

</div>
</div>

---

# 影響を受けるパッケージ

<div class="strategy-grid">
<div class="strategy-section">
<h3>✅ Rive</h3>
<p>アニメーションライブラリ</p>
<p>NDK r28.1で自動対応</p>
<span class="badge success">解決済</span>
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

## 1. APKをビルド

```bash
flutter build apk --release
```

Flutterアプリケーションのリリース版APKをビルドします。

---

# STEP1: 現状を確認する

## 2. チェックスクリプトをダウンロード

```bash
curl -O https://android.googlesource.com/\
  platform/build/+/refs/heads/main/\
  tools/check_elf_alignment.sh

chmod +x check_elf_alignment.sh
```

Googleが提供するアライメントチェック用スクリプトを取得します。

---

# STEP1: 現状を確認する

## 3. APKのアライメントをチェック

```bash
./check_elf_alignment.sh /build/app/outputs/flutter-apk/app-release.apk
```

ビルドしたAPKに含まれるネイティブライブラリのアライメントを確認します。

---

# STEP1: 現状を確認する

## 4. 結果の見方

```
arm64-v8a/libflutter.so: ALIGNED (2^16)    # OK!
arm64-v8a/libapp.so: ALIGNED (2^16)        # OK!
x86_64/libflutter.so: ALIGNED (2^16)       # OK!
x86_64/libapp.so: ALIGNED (2^16)           # OK!
x86_64/libplugin.so: UNALIGNED             # 修正しましょう
armeabi-v7a/libplugin.so UNALIGNED         # 修正不要
```

### 重要なポイント
- **arm64-v8a** と **x86_64** が **ALIGNED** なら基本的にOK ✅
- **armeabi-v7a** は32bitアーキテクチャのため影響なし
- **UNALIGNED** のライブラリがある場合は更新が必要

---

# アーキテクチャ別の対応状況

## 16KBページサイズ対応が必要なアーキテクチャ

<div class="columns-2">
<div>

### 対応必須 ⚠️
- **arm64-v8a** (64bit ARM)
  - 最新のAndroidデバイスの主流
  - Pixel、Galaxy等のフラグシップ機

- **x86_64** (64bit Intel/AMD)
  - エミュレータ
  - 一部のChromebook

</div>
<div>

### 対応不要 ✅
- **armeabi-v7a** (32bit ARM)
  - 古いAndroidデバイス
  - 16KBページサイズの影響なし

- **x86** (32bit Intel/AMD)
  - 古いエミュレータ
  - ほぼ使用されていない

</div>
</div>

**重要**: arm64-v8aとx86_64がALIGNEDであれば、Google Playの要件を満たします。

---

# STEP2: 開発環境を更新

<div class="columns-2">
<div>

## 必要なバージョン

<div class="strategy-section" style="margin-bottom: 20px;">
<h3>📱 Android SDK</h3>
<p><strong>34 → 35</strong></p>
<p>compileSdk で確認</p>
</div>

<div class="strategy-section" style="margin-bottom: 20px;">
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

<div class="strategy-section" style="margin-bottom: 20px;">
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

## NDK更新の変遷

<div class="columns-3">
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

各NDKバージョンで16KB対応方法が異なります。

---

# NDKバージョンの指定 - r27

## NDK r27（設定が必要）

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

NDK r27では手動でCMakeの引数設定が必要です。

---

# NDKバージョンの指定 - r28

## NDK r28+（推奨）

```gradle
android {
    ndkVersion "28.1.13356709"
    // 追加設定不要！自動対応
}
```

NDK r28.1以降では16KBページサイズ対応が自動化されています。
**これが最も簡単な方法です。**

---

# 依存関係の更新 1/2

## androidx.coreの更新が必須

```gradle
dependencies {
    implementation 'androidx.core:core-ktx:1.16.0'  // ← 1.16.0以上必須

    // その他の依存関係...
}
```

androidx.core 1.16.0以降が16KBページサイズに対応しています。

---

# 依存関係の更新 2/2

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

Android Gradle Plugin (AGP) 8.6.0以上が必要です。

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
arm64-v8a/libflutter.so: ALIGNED (2^14) ⚠️
arm64-v8a/libapp.so: ALIGNED (2^14) ⚠️
arm64-v8a/librive_text.so: UNALIGNED ❌
x86_64/libflutter.so: ALIGNED (2^14) ⚠️
x86_64/libapp.so: ALIGNED (2^14) ⚠️
armeabi-v7a/libflutter.so: UNALIGNED (対応不要)
```

**結果**: arm64-v8aとx86_64の16KB対応が必要！

---

# デモ: build.gradle修正 1/3

## Before - 現在の設定

```gradle
android {
    compileSdk 34

    defaultConfig {
        targetSdk 34
    }
}
```

Android 14（API 34）をターゲットにした従来の設定です。

---

# デモ: build.gradle修正 2/3

## After - NDK r27の場合

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

NDK r27では手動でCMake引数の設定が必要です。

---

# デモ: build.gradle修正 3/3

## After - NDK r28の場合（推奨）

```gradle
android {
    compileSdk 35
    ndkVersion "28.1.13356709"  // 追加設定不要！

    defaultConfig {
        targetSdk 35
    }
}
```

NDK r28.1以降では自動的に16KB対応されるため、追加設定は不要です。

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
arm64-v8a/libflutter.so: ALIGNED (2^16) ✅
arm64-v8a/libapp.so: ALIGNED (2^16) ✅
arm64-v8a/librive_text.so: UNALIGNED ❌  # プラグイン側の対応待ち
x86_64/libflutter.so: ALIGNED (2^16) ✅
x86_64/libapp.so: ALIGNED (2^16) ✅
armeabi-v7a/libflutter.so: UNALIGNED (対応不要)
```

**重要**: arm64-v8aとx86_64のFlutter本体は対応完了！

---

<!-- _class: section -->

# 🧪 テスト環境の構築
## 16KBページサイズでの動作確認

---

# 16KBテスト環境の準備

## Google公式の推奨環境

<div class="columns-2">
<div>

### 実機テスト
**Pixel 8/8a 以降**
- Android 15 Developer Preview
- [Flash Tool](https://developer.android.com/about/versions/15/get#google-pixel-devices)で書き込み

### エミュレータテスト
**Android Studio Iguana以降**
- Android 15 (API 35)
- 16KB page size system image

</div>
<div>

### テスト対象デバイス
- **必須**: Pixel 8/8a/8 Pro
- **推奨**: Pixel 9シリーズ
- **確認**: Pixel 6/7も対応可

### 注意事項
⚠️ 16KBページサイズは実験的機能
⚠️ 実機の方が正確な結果を取得可能

</div>
</div>

---

# エミュレータのセットアップ

## Android Studio での設定手順
1. **Tools** → **AVD Manager** → **Create Virtual Device**
2. **Hardware Profile**: Pixel 8 以降を選択
3. **System Image**:
   ```
   Release Name: Android 15
   API Level: 35
   ABI: x86_64
   Target: Android 15 (16 KB Page Size)
   ```

---

# 動作確認とパフォーマンス測定

## 基本的な確認コマンド

```bash
# ページサイズの確認
adb shell getconf PAGE_SIZE
# 期待値: 16384

# APKのインストールと起動
adb install app-release.apk
adb shell am start -n com.example.app/.MainActivity

# アライメントログの確認
adb logcat | grep -E "alignment|page_size"
```

## パフォーマンス測定
```bash
# 起動時間の測定
adb shell am start -W com.example.app/.MainActivity

# メモリ使用量の確認
adb shell dumpsys meminfo com.example.app | grep TOTAL
```

---

<!-- _class: section -->

# 🐛 トラブルシューティング
## よくある問題と解決方法

---

# エラー別対処法 1/3

## INSTALL_FAILED_INVALID_APK

```bash
# Gradleキャッシュをクリア
./gradlew clean
rm -rf ~/.gradle/caches/

# 再ビルド
flutter build apk --release
```

**原因**: ネイティブライブラリのアライメント不良
**対処**: クリーンビルドで解決することが多い

---

# エラー別対処法 2/3

## AGP/Gradle互換性エラー

### エラーメッセージ
```
Dependency 'androidx.core:core-ktx:1.16.0' requires AGP 8.6.0+
```

### 解決方法
android/gradle/wrapper/gradle-wrapper.properties を更新：
```properties
distributionUrl=https://services.gradle.org/\
  distributions/gradle-8.11.1-all.zip
```

AGPとGradleのバージョンは互換性が必要です。

---

# エラー別対処法 3/3

## NDKバージョンエラー

### エラーメッセージ
```
No version of NDK matched the requested version
```

### 解決方法
Android StudioでNDKをインストール：

1. **SDK Manager** → **SDK Tools**タブ
2. **Show Package Details**をチェック
3. 必要なNDKバージョンを選択してインストール（推奨: NDK r28.1.13356709）

---

# 主要パッケージの対応状況 1/3

## Rive - アニメーションライブラリ

### ✅ 解決方法
NDK r28.1に更新するだけで自動対応

```gradle
android {
    ndkVersion "28.1.13356709"
}
```

### 実証済み
- [JUMPTOON PR #4198](https://github.com/JUMPTOON/app/pull/4198)
- [Rive Issue #479](https://github.com/rive-app/rive-flutter/issues/479)

---

# 主要パッケージの対応状況 2/3

## flutter_local_notifications - 通知機能

### ⚠️ 問題点
- Desugar依存によりJava 11に制限
- 最新のJava機能が使用不可

### 対応方法
```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
}
```

---

# 主要パッケージの対応状況 3/3

## その他の注意が必要なパッケージ

<div class="columns-2">
<div>

### ⚠️ jcenter依存
- **memory_info**
- **update_available**

Gradle警告が出るが動作に影響なし

</div>
<div>

### ✅ 対応済み
- **datadog_flutter** v2.11.0+
- **Firebase** 全般
- **shared_preferences**
- **sqflite**

</div>
</div>

### 💡 対応のコツ
1. まずNDK r28.1に更新
2. クリーンビルド実行
3. それでも問題がある場合はIssueを確認

---

# Riveライブラリの16KB対応

## 🎉 朗報：NDK r28で解決！

### 解決方法（2025年1月確認済み）

**NDK r28.1以降を使用するだけで自動的に対応されます**

```gradle
android {
    ndkVersion "28.1.13356709"  // これだけでOK！
}
```

### 実証済みの事例
- [JUMPTOON PR #4198](https://github.com/JUMPTOON/app/pull/4198)
- [Rive Flutter Issue #479](https://github.com/rive-app/rive-flutter/issues/479#issuecomment-2962056705)

### 確認方法
```bash
./check_elf_alignment.sh app-release.apk

# 結果：
arm64-v8a/librive_text.so: ALIGNED (2^16) ✅
x86_64/librive_text.so: ALIGNED (2^16) ✅
```

**重要**: Riveを使用している場合は、NDK r28.1への更新が最も簡単な解決策です。

---

<!-- _class: section -->

# 📋 まとめ
## 今日から始める16KB対応

---

# 対応チェックリスト 1/3

## 現状確認

### APKチェック
```bash
./check_elf_alignment.sh app-release.apk
```

### プラグイン対応状況
- Riveライブラリのステータス確認
- ネイティブライブラリを含むプラグインのリストアップ

---

# 対応チェックリスト 2/3

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

# 対応チェックリスト 3/3

## テストと確認

### 動作確認
- 16KBエミュレータまたはPixel 8以降で確認
- アプリの起動と基本動作テスト

### 最終確認
```bash
./check_elf_alignment.sh app-release.apk
# arm64-v8aとx86_64がALIGNED (2^16)になること
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
- arm64-v8aとx86_64のライブラリがALIGNED
- アプリの起動と基本動作
- 16KBエミュレータまたは実機での動作確認

---

# 参考リソース

### 公式ドキュメント
- [16KBページサイズのサポート](https://developer.android.com/guide/practices/page-sizes?hl=ja)
- [Android 15の入手とテスト](https://developer.android.com/about/versions/15/get?hl=ja)
- [Flutter Android 15 Wiki](https://github.com/flutter/flutter/wiki/Android-15)

### トラブルシューティング
- [Flutter Issue #150168](https://github.com/flutter/flutter/issues/150168)
- [Rive Issue #479](https://github.com/rive-app/rive-flutter/issues/479)

### サンプルとツール
- [check_elf_alignment.sh](https://android.googlesource.com/platform/build/+/refs/heads/main/tools/check_elf_alignment.sh)
- [Android Flash Tool](https://flash.android.com/)

---

<!-- _class: lead -->

# ご清聴ありがとうございました

### みんなで Android 16KB 対応を乗り越えましょう！

Twitter: @nihon_kaizou
GitHub: @mine2424
