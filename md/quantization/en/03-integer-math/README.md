# Integer math on the device

How a quantized model runs with integers only, with no floats: multiply-adds and INT32 sums, requantization with a multiplier and a shift, BatchNorm folding, and packing and SIMD.

After this section, you can follow one layer on a device as integer operations, down to the bit widths.

## Pages

14. [Integer inference](14-integer-inference.md)
15. [Requantization](15-requantization.md)
16. [BatchNorm folding](16-bn-folding.md)
17. [Packing and SIMD](17-packing-simd.md)

Next section: [Quantized layers](../04-quantized-layers/README.md)

[Back to the index](../README.md)
