# PTQ

> Quantize a trained model without training it again, by calibrating the scales on sample data.

Post-training quantization (PTQ) takes a model that is already trained in float, and quantizes it without training it again. It is quick: it needs no labels and no training loop, only some sample inputs.

## Weights

The weights are known, so their scales can be computed directly from their values, usually one for each output channel.

## Activations: calibration

The activations depend on the input, so their ranges must be measured on real data. This is called calibration:

1. Pick a small set of inputs that look like the real inputs, for example a few hundred images.
2. Run them through the float model, and record the range (or a histogram) of each activation.
3. From these, choose each scale with a method from [Choosing the range](06-clipping-range.md): min-max, percentile, MSE, and so on.

> [!TIP]
> The data must represent the real inputs. If it does not, the ranges are off and the accuracy drops. A small set that covers the real cases is better than a large set that does not.

## When PTQ is enough

- **INT8** usually keeps the accuracy of the float model with PTQ alone.
- **4 bits or less** often lose too much accuracy with PTQ. Then the model must be trained with the rounding in the loop: that is [QAT](12-qat.md).

Calibrated scales are also a good starting point for QAT.
