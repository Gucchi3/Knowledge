# デバイス上の整数演算

量子化したモデルを、浮動小数点数を使わずに整数だけで動かす仕組みを扱う。積和とINT32の和、再量子化（乗数とシフト）、BatchNormの畳み込み、パッキングとSIMDである。

このセクションを読むと、畳み込みや線形層1つがデバイスでどんな整数演算になるかを、ビット幅まで追えるようになる。

## ページ

13. [整数推論](13-integer-inference.md)
14. [再量子化](14-requantization.md)
15. [BatchNormの畳み込み](15-bn-folding.md)
16. [パッキングとSIMD](16-packing-simd.md)

次のセクション: [量子化した層](../04-quantized-layers/README.md)

[目次に戻る](../README.md)
