# 量子化の基礎

実数を整数のコードに変える規則と、その規則で決めること（値の並び、置き方、範囲、粒度）を扱う。最初の「量子化とは」で全体像を見てから、順に読む。

読み終えると、INT8やNVFP4のテンソルがどんな数で表されていて、誤差がどこから来るのかが分かる。

## ページ

1. [量子化とは](01-what-is-quantization.md)
2. [スケールとゼロ点](02-scale-zero-point.md)
3. [対称量子化](03-symmetric.md)
4. [非対称量子化](04-asymmetric.md)
5. [丸め](05-rounding.md)
6. [範囲の選び方](06-clipping-range.md)
7. [粒度](07-granularity.md)
8. [INT形式とFP形式](08-int-fp.md)
9. [ブロックスケール](09-block-scales.md)

次のセクション: [スケールの決め方](../02-setting-scales/README.md)

[目次に戻る](../README.md)
