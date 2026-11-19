// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import {listFields} from './fields.js';

// GitHubのリポジトリ。サイトのURLとベースパスはこの2つから決まる
const OWNER = 'Gucchi3';
const REPO = 'Knowledge';

const fields = listFields();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Knowledge',
  tagline: '調べたこと、学んだことをためておく場所',
  favicon: 'img/favicon.svg',

  // GitHub Pagesでは https://OWNER.github.io/REPO/ で公開される
  url: `https://${OWNER.toLowerCase()}.github.io`,
  baseUrl: `/${REPO}/`,
  organizationName: OWNER,
  projectName: REPO,
  trailingSlash: false,

  // 壊れたリンクがあればビルドを止める
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // 日本語が既定。英語は i18n/en/ に置く。英訳のないページは日本語のまま表示される
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeConfigs: {
      ja: {label: '日本語', htmlLang: 'ja'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },

  // トップページで分野の一覧を出すために渡す
  customFields: {fields},

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'Knowledge',
        logo: {alt: 'Knowledge', src: 'img/favicon.svg'},
        items: [
          // 言語の切り替えは左上に置く
          {type: 'localeDropdown', position: 'left'},
          // 分野ごとに1つのリンク。docs/ にフォルダを足すと自動で増える
          ...fields.map((field) => ({
            type: 'docSidebar',
            sidebarId: field.id,
            position: 'left',
            label: field.label,
          })),
          {href: `https://github.com/${OWNER}/${REPO}`, label: 'GitHub', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} ${OWNER}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'python', 'verilog'],
      },
    }),
};

export default config;
