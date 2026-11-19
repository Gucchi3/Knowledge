# Quantization notes

Notes on quantizing neural networks for embedded devices, with a focus on integer-only inference.
Each page covers one topic and links to the related pages.

> [!NOTE]
> A Japanese version is in [../jp/](../jp/README.md).

## Quantization basics

1. [What is quantization?](01-what-is-quantization.md)
2. [Scale and zero point](02-scale-zero-point.md)
3. [Symmetric quantization](03-symmetric.md)
4. [Asymmetric quantization](04-asymmetric.md)
5. [Rounding](05-rounding.md)
6. [Choosing the range](06-clipping-range.md)
7. [Granularity](07-granularity.md)
8. [INT and FP formats](08-int-fp.md)
9. [Block scales](09-block-scales.md)

## Setting the scales

10. [Static and dynamic scales](10-static-dynamic.md)
11. [PTQ](11-ptq.md)
12. [QAT, STE, and LSQ](12-qat.md)
13. [Shared scales](13-shared-scales.md)

## Integer math on the device

14. [Integer inference](14-integer-inference.md)
15. [Requantization](15-requantization.md)
16. [BatchNorm folding](16-bn-folding.md)
17. [Packing and SIMD](17-packing-simd.md)

## Quantized layers

18. [ReLU and ReLU6](18-activations.md)
19. [Residual add](19-residual-add.md)
20. [Average pooling](20-average-pooling.md)
21. [SimA attention](21-sima-attention.md)

## References

22. [Papers](22-papers.md)
