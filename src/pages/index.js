// トップページ。分野の一覧をカードで並べる。

import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/**
 * トップページを描く。
 *
 * @returns {JSX.Element} ページ全体
 */
export default function Home() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const fields = siteConfig.customFields.fields;
  return (
    <Layout title="Knowledge">
      <main className={styles.main}>
        <h1>Knowledge</h1>
        <p className={styles.lead}>
          <Translate id="home.tagline">調べたこと、学んだことをためておく場所</Translate>
        </p>
        <h2>
          <Translate id="home.fields">分野</Translate>
        </h2>
        <ul className={styles.cards}>
          {fields.map((field) => (
            <li key={field.id}>
              <Link className={styles.card} to={`/docs/${field.id}`}>
                {i18n.currentLocale === 'en' ? field.labelEn : field.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
