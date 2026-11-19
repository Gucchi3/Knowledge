# 量子化ノート

組み込み機器向けにニューラルネットワークを量子化するためのノートである。特に、整数演算だけで推論する方法を中心に扱う。
各ページは一つの話題を扱い、関連するページへリンクしている。

> [!NOTE]
> 英語版は [../en/](../en/README.md) にある。

## 量子化の基礎

1. [量子化とは](01-what-is-quantization.md)
2. [スケールとゼロ点](02-scale-zero-point.md)
3. [対称量子化](03-symmetric.md)
4. [非対称量子化](04-asymmetric.md)
5. [丸め](05-rounding.md)
6. [範囲の選び方](06-clipping-range.md)
7. [粒度](07-granularity.md)
8. [INT形式とFP形式](08-int-fp.md)
9. [ブロックスケール](09-block-scales.md)

## スケールの決め方

10. [静的スケールと動的スケール](10-static-dynamic.md)
11. [PTQ](11-ptq.md)
12. [QAT、STE、LSQ](12-qat.md)
13. [共有スケール](13-shared-scales.md)

## デバイス上の整数演算

14. [整数推論](14-integer-inference.md)
15. [再量子化](15-requantization.md)
16. [BatchNormの畳み込み](16-bn-folding.md)
17. [パッキングとSIMD](17-packing-simd.md)

## 量子化した層

18. [ReLUとReLU6](18-activations.md)
19. [残差加算](19-residual-add.md)
20. [平均プーリング](20-average-pooling.md)
21. [SimA attention](21-sima-attention.md)

## 参考文献

22. [論文](22-papers.md)
