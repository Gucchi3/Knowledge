// 図の中の文言を、表示中の言語に合わせて選ぶためのフック。

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * 日本語と英語の組から、表示中の言語の文言を返す関数を作る。
 *
 * @returns {(ja: string, en: string) => string} 文言を選ぶ関数
 */
export default function useLocaleText() {
  const {i18n} = useDocusaurusContext();
  const isEn = i18n.currentLocale === 'en';
  return (ja, en) => (isEn ? en : ja);
}
