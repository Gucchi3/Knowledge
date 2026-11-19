// 英語版の翻訳ファイルを作り直し、分野とカテゴリの英語名を埋める。
// 英語名は i18n/en/docusaurus-plugin-content-docs/current/ の各 _category_.json から取る。
// 使い方: npm run translations

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const {readCategory, DOCS_DIR, EN_DOCS_DIR} = require('../fields');

const ROOT = path.join(__dirname, '..');
const DOCS_JSON = path.join(ROOT, 'i18n/en/docusaurus-plugin-content-docs/current.json');
const NAVBAR_JSON = path.join(ROOT, 'i18n/en/docusaurus-theme-classic/navbar.json');
const CODE_JSON = path.join(ROOT, 'i18n/en/code.json');

/**
 * docs/ の下の _category_.json をすべてたどり、日本語名から英語名への対応を作る。
 *
 * @param {string} rel docs/ からの相対パス
 * @param {string} field 分野のフォルダ名（最上位では空）
 * @param {{field: string, ja: string, en: string, top: boolean}[]} out 結果を足していく配列
 * @returns {{field: string, ja: string, en: string, top: boolean}[]} 対応の一覧
 */
function collect(rel = '', field = '', out = []) {
  for (const entry of fs.readdirSync(path.join(DOCS_DIR, rel), {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const childRel = path.join(rel, entry.name);
    const ja = readCategory(path.join(DOCS_DIR, childRel)).label;
    const en = readCategory(path.join(EN_DOCS_DIR, childRel)).label;
    const childField = field || entry.name;
    if (ja && en) out.push({field: childField, ja, en, top: !field});
    collect(childRel, childField, out);
  }
  return out;
}

/**
 * JSONファイルの各キーの message を書き換える。
 *
 * @param {string} file 書き換えるファイル
 * @param {Record<string, string>} messages キーと新しい message
 */
function patch(file, messages) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [key, message] of Object.entries(messages)) {
    if (data[key]) data[key].message = message;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

// 既存の訳は残したまま、新しいキーだけ足される
execSync('npx docusaurus write-translations --locale en', {cwd: ROOT, stdio: 'inherit'});

const docs = {};
const navbar = {};
for (const {field, ja, en, top} of collect()) {
  if (top) navbar[`item.label.${ja}`] = en;
  else docs[`sidebar.${field}.category.${ja}`] = en;
}
patch(DOCS_JSON, docs);
patch(NAVBAR_JSON, navbar);

// テーマの既定の文言（theme.で始まるキー）は英語のままでよいので、code.json から外して短く保つ
const code = JSON.parse(fs.readFileSync(CODE_JSON, 'utf8'));
const own = Object.fromEntries(Object.entries(code).filter(([key]) => !key.startsWith('theme.')));
fs.writeFileSync(CODE_JSON, JSON.stringify(own, null, 2) + '\n');
console.log(`[sync-translations] カテゴリ ${Object.keys(docs).length} 件、分野 ${Object.keys(navbar).length} 件の英語名を埋めた`);
