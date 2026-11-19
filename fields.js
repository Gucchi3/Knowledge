// @ts-check
// docs/ 直下のフォルダを分野として集める。サイドバーとナビゲーションバーと
// トップページは、すべてこの一覧から作る。分野を足すときにこのファイルを直す必要はない。

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');
const EN_DOCS_DIR = path.join(__dirname, 'i18n/en/docusaurus-plugin-content-docs/current');

/**
 * _category_.json を読む。なければ空のオブジェクトを返す。
 *
 * @param {string} dir 読むフォルダ
 * @returns {{label?: string, position?: number}} _category_.json の中身
 */
function readCategory(dir) {
  const file = path.join(dir, '_category_.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

/**
 * docs/ 直下の分野を、_category_.json の position と名前の順に返す。
 *
 * @returns {{id: string, label: string, labelEn: string, position: number}[]} 分野のフォルダ名、日本語と英語の表示名、並び順の一覧
 */
function listFields() {
  return fs
    .readdirSync(DOCS_DIR, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const id = entry.name;
      // _category_.json がなければ、フォルダ名をそのまま表示名にする
      const category = readCategory(path.join(DOCS_DIR, id));
      const categoryEn = readCategory(path.join(EN_DOCS_DIR, id));
      const label = category.label ?? id;
      return {
        id,
        label,
        labelEn: categoryEn.label ?? label,
        position: category.position ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => a.position - b.position || a.id.localeCompare(b.id));
}

module.exports = {listFields, readCategory, DOCS_DIR, EN_DOCS_DIR};
