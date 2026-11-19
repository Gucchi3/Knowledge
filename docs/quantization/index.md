---
sidebar_position: 0
slug: /quantization
---

# 量子化ノート

組み込み機器向けにニューラルネットワークを量子化するためのノートである。特に、整数演算だけで推論する方法を中心に扱う。
各ページは一つの話題を扱い、関連するページへリンクしている。


## 量子化の基礎

1. [量子化とは](01-basics/01-what-is-quantization.mdx)
2. [スケールとゼロ点](01-basics/02-scale-zero-point.mdx)
3. [対称量子化](01-basics/03-symmetric.md)
4. [非対称量子化](01-basics/04-asymmetric.mdx)
5. [丸め](01-basics/05-rounding.md)
6. [範囲の選び方](01-basics/06-clipping-range.md)
7. [粒度](01-basics/07-granularity.md)
8. [INT形式とFP形式](01-basics/08-int-fp.md)
9. [ブロックスケール](01-basics/09-block-scales.md)

## スケールの決め方

10. [静的スケールと動的スケール](02-setting-scales/10-static-dynamic.md)
11. [PTQ](02-setting-scales/11-ptq.md)
12. [QAT、STE、LSQ](02-setting-scales/12-qat.md)
13. [共有スケール](02-setting-scales/13-shared-scales.md)

## デバイス上の整数演算

14. [整数推論](03-integer-math/14-integer-inference.mdx)
15. [再量子化](03-integer-math/15-requantization.md)
16. [BatchNormの畳み込み](03-integer-math/16-bn-folding.md)
17. [パッキングとSIMD](03-integer-math/17-packing-simd.md)

## 量子化した層

18. [ReLUとReLU6](04-quantized-layers/18-activations.md)
19. [残差加算](04-quantized-layers/19-residual-add.md)
20. [平均プーリング](04-quantized-layers/20-average-pooling.md)
21. [SimA attention](04-quantized-layers/21-sima-attention.md)

## 参考文献

22. [論文](05-references/22-papers.md)
