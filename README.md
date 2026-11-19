# Knowledge

調べたこと、学んだことをためておくための知識サイト。[Docusaurus](https://docusaurus.io/) で作っている。
日本語が既定で、ナビゲーションバー左上の言語メニューで英語に切り替えられる。

## 見る

Node.js 20以上が必要。

```bash
npm ci
npm start          # 日本語版を http://localhost:3000/Knowledge/ で開く
npm run start:en   # 英語版を開く（開発サーバは1言語ずつしか動かない）
npm run build      # 両方の言語をビルドする。壊れたリンクがあると失敗する
npm run serve      # ビルドしたものを開く。言語の切り替えも試せる
```

## フォルダの構成

| 場所 | 中身 |
|---|---|
| `docs/<分野>/` | 日本語のページ。分野ごとに1フォルダ |
| `i18n/en/docusaurus-plugin-content-docs/current/<分野>/` | 英語のページ。`docs/` と同じファイル名で置く |
| `i18n/en/*.json` | ナビゲーションバーやサイドバーの英語名 |
| `src/components/<分野>/` | ページに埋め込む図（React） |
| `md/` | GitHubでそのまま読める元のMarkdown |
| `fields.js` | `docs/` 直下のフォルダを分野として集める |

## 分野を足す

1. `docs/<分野>/` を作り、`_category_.json` に日本語の表示名を書く。並び順は `position` で決まる。

   ```json
   {"label": "FPGA", "position": 2}
   ```

2. ページを書く。ファイル名の先頭の番号（`01-` など）が並び順になり、URLからは外れる。サブフォルダにも `_category_.json` を置くと、サイドバーの見出しになる。
3. 英語版を作るなら、`i18n/en/docusaurus-plugin-content-docs/current/<分野>/` に同じ構成で置き、`_category_.json` に英語名を書く。英訳のないページは、英語版でも日本語のまま表示される。
4. `npm run translations` を実行する。英語の `_category_.json` から、ナビゲーションバーとサイドバーの英語名が埋まる。

ナビゲーションバー、サイドバー、トップページの分野一覧は `docs/` のフォルダから自動で作るので、設定ファイルを直す必要はない。

## 書き方

- 数式は `$...$` と `$$...$$` で書ける（KaTeX）。
- 注意書きは `:::note`、`:::tip`、`:::info`、`:::warning`、`:::danger` で囲む。
- 図を埋め込むページは拡張子を `.mdx` にし、`import` で `src/components/` の部品を読み込む。

## 公開

`.github/workflows/deploy.yml` でGitHub Pagesに公開できる。privateリポジトリのPagesは有料プランが必要なので、今は手動実行だけにしてある。
