# 量子化ノート

ニューラルネットワークを量子化し、組み込み機器で整数演算だけで動かすまでをまとめたノートである。
全体は5つのセクションに分かれ、各ページで1つの話題を扱う。最初の[量子化とは](01-basics/01-what-is-quantization.md)で全体像をつかみ、あとは番号順に読めばよいように書いてある。各ページの末尾には、前後のページへのリンクを置いた。

> [!NOTE]
> 英語版は [../en/](../en/README.md) にある。

## [量子化の基礎](01-basics/README.md)

1. [量子化とは](01-basics/01-what-is-quantization.md)
2. [スケールとゼロ点](01-basics/02-scale-zero-point.md)
3. [対称量子化](01-basics/03-symmetric.md)
4. [非対称量子化](01-basics/04-asymmetric.md)
5. [丸め](01-basics/05-rounding.md)
6. [範囲の選び方](01-basics/06-clipping-range.md)
7. [粒度](01-basics/07-granularity.md)
8. [INT形式とFP形式](01-basics/08-int-fp.md)
9. [ブロックスケール](01-basics/09-block-scales.md)

## [スケールの決め方](02-setting-scales/README.md)

10. [静的スケールと動的スケール](02-setting-scales/10-static-dynamic.md)
11. [PTQ](02-setting-scales/11-ptq.md)
12. [QAT、STE、LSQ](02-setting-scales/12-qat.md)

## [デバイス上の整数演算](03-integer-math/README.md)

13. [整数推論](03-integer-math/13-integer-inference.md)
14. [再量子化](03-integer-math/14-requantization.md)
15. [BatchNormの畳み込み](03-integer-math/15-bn-folding.md)
16. [パッキングとSIMD](03-integer-math/16-packing-simd.md)

## [量子化した層](04-quantized-layers/README.md)

17. [ReLUとReLU6](04-quantized-layers/17-activations.md)
18. [残差加算](04-quantized-layers/18-residual-add.md)
19. [共有スケール](04-quantized-layers/19-shared-scales.md)
20. [平均プーリング](04-quantized-layers/20-average-pooling.md)
21. [SimA attention](04-quantized-layers/21-sima-attention.md)

## [参考文献](05-references/README.md)

22. [論文](05-references/22-papers.md)
