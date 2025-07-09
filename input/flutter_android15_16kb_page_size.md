---
marp: true
theme: ca-business
paginate: true
---

<!-- _class: lead -->

# Android 16KBページサイズ対応を
# はじめからていねいに

## CA.Flutter
2025年7月9日

---

# 自己紹介

<div class="profile-container">
  <div class="profile-header">
    <img src="./images/profile.png" alt="Profile" class="profile-image">
    <div class="profile-name">
      <h2>西峰 綾汰</h2>
      <p>にしみね りょうた</p>
      <div class="profile-company">
        <span class="company-logo">🏢</span>
        <span>CyberAgent / SGEマンガ事業部 / 2024年入社</span>
      </div>
      <div class="profile-company">
        <span class="company-logo">📱</span>
        <span>ジャンプTOON という縦型漫画アプリを開発</span>
      </div>
    </div>
  </div>

  <div class="profile-interests">
    <h3>🎯 趣味・興味</h3>
    <ul>
      <li><span class="interest-icon">🏎️</span> <strong>F1</strong> - Mercedes / Redbull</li>
      <li><span class="interest-icon">♠️</span> <strong>ポーカー</strong> - 🇲🇴 / 🇰🇷 / 🇻🇳 / 🇰🇭 / 🇭🇰</li>
      <li><span class="interest-icon">🎸</span> <strong>フジロック</strong> - 今年参戦します！
      </li>
    </ul>
  </div>
</div>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 10px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.profile-name h2 {
  font-size: 32px;
  margin: 0 0 5px 0;
  color: var(--primary-color);
}

.profile-name p {
  font-size: 18px;
  color: #666;
  margin: 0 0 15px 0;
}

.profile-company {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  color: #333;
}

.company-logo {
  font-size: 20px;
}

.profile-interests {
  flex: 1;
  background-color: #f8f8f8;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.profile-interests h3 {
  font-size: 22px;
  margin: 0 0 20px 0;
  color: var(--primary-color);
}

.profile-interests ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.profile-interests li {
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
}

.interest-icon {
  font-size: 24px;
  margin-right: 12px;
  display: inline-block;
  width: 32px;
}

.profile-interests strong {
  color: var(--primary-color);
  margin-right: 8px;
}

.interest-note {
  display: block;
  font-size: 16px;
  color: #666;
  margin-left: 44px;
  margin-top: 4px;
  font-style: italic;
}
</style>

---

# 本日の内容

## 2025年11月以降、必須対応となる16KBページサイズ

1. **なぜ必要？** - パフォーマンス向上の仕組み
2. **何が起きる？** - Flutterアプリへの影響
3. **どう対応する？** - 具体的な導入手順

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

# 主要パッケージの対応状況 1/4

## ✅ 完全対応済みパッケージ

<div class="package-list">
<div class="package-item success">
<h3>🔥 Firebase全般</h3>
<p>Analytics, Crashlytics, Messaging等</p>
<p><strong>対応状況:</strong> 全て対応済み</p>
<p><strong>追加作業:</strong> 不要</p>
</div>

<div class="package-item success">
<h3>📊 datadog_flutter</h3>
<p>監視・パフォーマンス分析</p>
<p><strong>対応バージョン:</strong> v2.11.0以降</p>
<p><strong>追加作業:</strong> バージョン更新のみ</p>
</div>

<div class="package-item success">
<h3>📍 geolocator</h3>
<p>位置情報取得</p>
<p><strong>対応状況:</strong> 最新版で対応済み</p>
<p><strong>追加作業:</strong> 不要</p>
</div>
</div>

---

# 主要パッケージの対応状況 2/4

## ✅ 基本パッケージ（対応済み）

<div class="package-grid">
<div class="package-card">
<h4>shared_preferences</h4>
<p>ローカルストレージ</p>
<span class="status-ok">✓ 対応済み</span>
</div>

<div class="package-card">
<h4>sqflite</h4>
<p>SQLiteデータベース</p>
<span class="status-ok">✓ 対応済み</span>
</div>

<div class="package-card">
<h4>path_provider</h4>
<p>ファイルパス取得</p>
<span class="status-ok">✓ 対応済み</span>
</div>

<div class="package-card">
<h4>url_launcher</h4>
<p>URL起動</p>
<span class="status-ok">✓ 対応済み</span>
</div>

<div class="package-card">
<h4>connectivity_plus</h4>
<p>ネットワーク状態</p>
<span class="status-ok">✓ 対応済み</span>
</div>

<div class="package-card">
<h4>device_info_plus</h4>
<p>デバイス情報</p>
<span class="status-ok">✓ 対応済み</span>
</div>
</div>

<style scoped>
.package-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 12px;
  max-height: 60vh;
  overflow-y: auto;
}

.package-card {
  background: #f8f8f8;
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid var(--success-color);
}

.package-card h4 {
  margin: 0 0 3px 0;
  font-size: 15px;
  color: #333;
}

.package-card p {
  margin: 0 0 5px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
}

.status-ok {
  color: var(--success-color);
  font-weight: bold;
  font-size: 12px;
}
</style>

---

# 主要パッケージの対応状況 3/4

## ⚠️ 設定が必要なパッケージ

<div class="package-list">
<div class="package-item warning">
<h3>🔔 flutter_local_notifications</h3>
<p>ローカル通知機能</p>
<p><strong>問題:</strong> Desugar依存によりJava 11制限</p>
<div class="solution-box">
<h4>解決方法:</h4>
<pre><code>android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_11
    targetCompatibility JavaVersion.VERSION_11
  }
}</code></pre>
</div>
</div>

<div class="package-item warning">
<h3>🎨 Rive Flutter</h3>
<p>アニメーションライブラリ</p>
<p><strong>重要:</strong> NDK r28.1への更新が必須</p>
<div class="solution-box">
<h4>解決方法:</h4>
<pre><code>android {
  ndkVersion "28.1.13356709"
}</code></pre>
<p class="note">※ NDK更新だけで自動的に16KB対応されます</p>
</div>
</div>
</div>

---

# 主要パッケージの対応状況 4/4

## ⚠️ 注意が必要なパッケージ

<div class="warning-packages">
<h3>jcenter依存の警告があるパッケージ</h3>
<ul>
<li><strong>memory_info</strong> - メモリ情報取得</li>
<li><strong>update_available</strong> - アップデート確認</li>
</ul>
<p class="note">※ 動作に影響はないがGradle警告が表示される</p>
</div>

<div class="check-method">
<h3>🔍 パッケージの対応確認方法</h3>
<ol>
<li>APKをビルド: <code>flutter build apk --release</code></li>
<li>チェックスクリプトで確認: <code>./check_elf_alignment.sh app-release.apk</code></li>
<li>UNALIGNEDのライブラリを特定</li>
<li>該当パッケージのGitHub Issueを確認</li>
</ol>
</div>

<style scoped>
.warning-packages {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.warning-packages h3 {
  font-size: 18px;
  margin: 0 0 10px 0;
}

.warning-packages ul {
  margin: 10px 0;
  padding-left: 25px;
}

.warning-packages li {
  font-size: 15px;
  line-height: 1.5;
}

.check-method {
  background: #e3f2fd;
  border: 1px solid #90caf9;
  padding: 15px 20px;
  border-radius: 8px;
}

.check-method h3 {
  font-size: 18px;
  margin: 0 0 10px 0;
}

.check-method ol {
  margin: 10px 0;
  padding-left: 25px;
}

.check-method li {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 5px;
}

.check-method code {
  font-size: 13px;
  padding: 2px 6px;
}

.note {
  font-size: 13px;
  color: #856404;
  margin-top: 8px;
}
</style>

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

## APKをビルド

```bash
flutter build apk --release
```

Flutterアプリケーションのリリース版APKをビルドします。

---

# STEP2: 現状を確認する

## チェックスクリプトをダウンロード

```bash
curl -O https://android.googlesource.com/\
  platform/build/+/refs/heads/main/\
  tools/check_elf_alignment.sh

chmod +x check_elf_alignment.sh
```

Googleが提供するアライメントチェック用スクリプトを取得します。

---

# STEP3: 現状を確認する

## APKのアライメントをチェック

```bash
./check_elf_alignment.sh /build/app/outputs/flutter-apk/app-release.apk
```

ビルドしたAPKに含まれるネイティブライブラリのアライメントを確認します。

---

# STEP4: 現状を確認する

## 結果の見方

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

# 動作確認

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

✅ ページサイズが16384と表示されれば環境設定OK
✅ アプリが正常に起動すれば基本動作OK

---

# パフォーマンス測定

## 測定コマンド

```bash
# 起動時間の測定
adb shell am start -W com.example.app/.MainActivity
# TotalTime: XXXXms を確認

# メモリ使用量の確認
adb shell dumpsys meminfo com.example.app | grep TOTAL
# TOTAL: XXXMB を確認

# CPU使用率のモニタリング
adb shell top -m 10 | grep com.example.app
```

### 期待される結果
- **起動時間**: 初回は遅いが、2回目以降は改善
- **メモリ使用量**: 4KB時と比べて約5%削減
- **CPU使用率**: ページフォルト減少により低下

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

# 本日のまとめ

<div class="columns-2">
<div>

### 📅 重要な日付
- **2025年8月31日**
  - API 35が必須に
- **2025年11月1日**
  - 16KB対応の期限

### 🛠️ 対応方法
- **NDK r28.1**を使用（最も簡単）
- **targetSdk 35**に更新
- **androidx.core 1.16.0**以上

</div>
<div>

### ✅ 確認方法
```bash
./check_elf_alignment.sh \
  app-release.apk
```

### 🎯 ゴール
- arm64-v8aがALIGNED (2^16)
- x86_64がALIGNED (2^16)
- エミュレータ/実機で動作確認

</div>
</div>

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

## みんなで Android 16KB 対応を乗り越えましょう！

Twitter: @nihon_kaizou
GitHub: @mine2424
