#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 制約設定
const CONSTRAINTS = {
  titleMaxLength: 30,
  lineMaxLength: 40,
  slideMaxChars: 400,
  slideMaxLines: 12,
  maxImagesPerSlide: 2,
  maxListDepth: 3
};

// 入力ディレクトリ
const INPUT_DIR = path.join(__dirname, '..', 'input');

// スライドを分割
function splitSlides(content) {
  return content.split(/^---$/m).filter(slide => slide.trim());
}

// 行の文字数をチェック
function checkLineLength(line, lineNum) {
  const visibleLength = line.replace(/[#*`\[\]()]/g, '').length;
  if (visibleLength > CONSTRAINTS.lineMaxLength) {
    return {
      line: lineNum,
      length: visibleLength,
      content: line
    };
  }
  return null;
}

// タイトルの文字数をチェック
function checkTitle(slide) {
  const titleMatch = slide.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length > CONSTRAINTS.titleMaxLength) {
      return {
        title,
        length: title.length
      };
    }
  }
  return null;
}

// スライドの総文字数と行数をチェック
function checkSlideContent(slide) {
  const lines = slide.split('\n').filter(line => 
    line.trim() && !line.match(/^(marp:|theme:|paginate:|class:|_class:|backgroundImage:)/)
  );
  
  const totalChars = lines.join('').replace(/[#*`\[\]()]/g, '').length;
  const issues = [];

  if (totalChars > CONSTRAINTS.slideMaxChars) {
    issues.push({
      type: 'totalChars',
      value: totalChars
    });
  }

  if (lines.length > CONSTRAINTS.slideMaxLines) {
    issues.push({
      type: 'totalLines',
      value: lines.length
    });
  }

  return issues;
}

// 画像の数をチェック
function checkImages(slide) {
  const imageMatches = slide.match(/!\[.*?\]\(.*?\)/g) || [];
  if (imageMatches.length > CONSTRAINTS.maxImagesPerSlide) {
    return imageMatches.length;
  }
  return 0;
}

// メインの検証関数
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slides = splitSlides(content);
  const fileName = path.basename(filePath);
  const issues = [];

  slides.forEach((slide, index) => {
    const slideIssues = {
      slideNumber: index + 1,
      problems: []
    };

    // タイトルチェック
    const titleIssue = checkTitle(slide);
    if (titleIssue) {
      slideIssues.problems.push({
        type: 'title',
        message: `タイトルが${CONSTRAINTS.titleMaxLength}文字を超えています (${titleIssue.length}文字)`,
        detail: titleIssue.title
      });
    }

    // 行の長さチェック
    const lines = slide.split('\n');
    lines.forEach((line, lineNum) => {
      const lineIssue = checkLineLength(line, lineNum + 1);
      if (lineIssue) {
        slideIssues.problems.push({
          type: 'lineLength',
          message: `${lineIssue.line}行目が${CONSTRAINTS.lineMaxLength}文字を超えています (${lineIssue.length}文字)`,
          detail: lineIssue.content
        });
      }
    });

    // スライド全体のチェック
    const contentIssues = checkSlideContent(slide);
    contentIssues.forEach(issue => {
      if (issue.type === 'totalChars') {
        slideIssues.problems.push({
          type: 'totalChars',
          message: `スライドの総文字数が${CONSTRAINTS.slideMaxChars}文字を超えています (${issue.value}文字)`
        });
      } else if (issue.type === 'totalLines') {
        slideIssues.problems.push({
          type: 'totalLines',
          message: `スライドの行数が${CONSTRAINTS.slideMaxLines}行を超えています (${issue.value}行)`
        });
      }
    });

    // 画像数チェック
    const imageCount = checkImages(slide);
    if (imageCount > CONSTRAINTS.maxImagesPerSlide) {
      slideIssues.problems.push({
        type: 'images',
        message: `画像が${CONSTRAINTS.maxImagesPerSlide}枚を超えています (${imageCount}枚)`
      });
    }

    if (slideIssues.problems.length > 0) {
      issues.push(slideIssues);
    }
  });

  return {
    fileName,
    totalSlides: slides.length,
    issues
  };
}

// メイン処理
function main() {
  console.log('🔍 スライドの検証を開始します...\n');

  try {
    const files = fs.readdirSync(INPUT_DIR)
      .filter(file => file.endsWith('.md'));

    if (files.length === 0) {
      console.log('⚠️  検証するMarkdownファイルが見つかりません。');
      return;
    }

    let hasIssues = false;

    files.forEach(file => {
      const filePath = path.join(INPUT_DIR, file);
      const result = validateFile(filePath);

      console.log(`📄 ${result.fileName} (${result.totalSlides}スライド)`);

      if (result.issues.length === 0) {
        console.log('   ✅ すべての制約を満たしています\n');
      } else {
        hasIssues = true;
        result.issues.forEach(slideIssue => {
          console.log(`   ❌ スライド ${slideIssue.slideNumber}:`);
          slideIssue.problems.forEach(problem => {
            console.log(`      - ${problem.message}`);
            if (problem.detail) {
              console.log(`        "${problem.detail}"`);
            }
          });
        });
        console.log('');
      }
    });

    if (hasIssues) {
      console.log('⚠️  制約違反が見つかりました。修正してください。');
      process.exit(1);
    } else {
      console.log('✨ すべてのスライドが制約を満たしています！');
    }

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}