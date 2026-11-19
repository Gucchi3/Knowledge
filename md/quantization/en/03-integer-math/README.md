# Integer math on the device

How a quantized model runs with integers only, without floating point: multiply-accumulate and INT32 sums, requantization (multiplier and shift), BatchNorm folding, and packing and SIMD.

After this section, you can follow one conv or linear layer on the device as integer math, down to the bit widths.

## Pages

13. [Integer inference](13-integer-inference.md)
14. [Requantization](14-requantization.md)
15. [BatchNorm folding](15-bn-folding.md)
16. [Packing and SIMD](16-packing-simd.md)

Next section: [Quantized layers](../04-quantized-layers/README.md)

[Back to the index](../README.md)
