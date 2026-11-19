# Quantization notes

Notes on quantizing neural networks and running them on embedded devices with integer math only.
The notes have five sections, and each page covers one topic. Start with the big picture in [What is quantization?](01-basics/01-what-is-quantization.md), then read the pages in order. Every page ends with links to the previous and next pages.

> [!NOTE]
> A Japanese version is in [../jp/](../jp/README.md).

## [Quantization basics](01-basics/README.md)

1. [What is quantization?](01-basics/01-what-is-quantization.md)
2. [Scale and zero point](01-basics/02-scale-zero-point.md)
3. [Symmetric quantization](01-basics/03-symmetric.md)
4. [Asymmetric quantization](01-basics/04-asymmetric.md)
5. [Rounding](01-basics/05-rounding.md)
6. [Choosing the range](01-basics/06-clipping-range.md)
7. [Granularity](01-basics/07-granularity.md)
8. [INT and FP formats](01-basics/08-int-fp.md)
9. [Block scales](01-basics/09-block-scales.md)

## [Setting the scales](02-setting-scales/README.md)

10. [Static and dynamic scales](02-setting-scales/10-static-dynamic.md)
11. [PTQ](02-setting-scales/11-ptq.md)
12. [QAT, STE, and LSQ](02-setting-scales/12-qat.md)

## [Integer math on the device](03-integer-math/README.md)

13. [Integer inference](03-integer-math/13-integer-inference.md)
14. [Requantization](03-integer-math/14-requantization.md)
15. [BatchNorm folding](03-integer-math/15-bn-folding.md)
16. [Packing and SIMD](03-integer-math/16-packing-simd.md)

## [Quantized layers](04-quantized-layers/README.md)

17. [ReLU and ReLU6](04-quantized-layers/17-activations.md)
18. [Residual add](04-quantized-layers/18-residual-add.md)
19. [Shared scales](04-quantized-layers/19-shared-scales.md)
20. [Average pooling](04-quantized-layers/20-average-pooling.md)
21. [SimA attention](04-quantized-layers/21-sima-attention.md)

## [References](05-references/README.md)

22. [Papers](05-references/22-papers.md)
