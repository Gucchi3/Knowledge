# デバイス上の整数演算

量子化したモデルを、浮動小数点数を使わずに整数だけで動かす手順を扱う。積和とINT32の和、再量子化（乗数とシフト）、BatchNormの畳み込み、パッキングとSIMD。

読み終えると、1つの層がデバイスでどんな整数演算になるかを、ビット幅まで追える。

## ページ

14. [整数推論](14-integer-inference.md)
15. [再量子化](15-requantization.md)
16. [BatchNormの畳み込み](16-bn-folding.md)
17. [パッキングとSIMD](17-packing-simd.md)

次のセクション: [量子化した層](../04-quantized-layers/README.md)

[目次に戻る](../README.md)
