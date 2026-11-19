# Residual add

> How to add two quantized tensors with different scales, with integer math and one rounding.

A residual connection adds the input of a block to its output: $y = a + b$. The two tensors come from different layers, so they usually have different scales. Their codes cannot just be added.

## Bring both to the output scale

The sum is quantized with its own scale $S_y$. In real terms:

$$
q_y = \frac{S_a (q_a - Z_a) + S_b (q_b - Z_b)}{S_y} + Z_y
$$

Each input needs its own ratio, $S_a / S_y$ and $S_b / S_y$. On a device, each ratio becomes an integer multiplier and a shift, as in [requantization](15-requantization.md):

$$
\frac{S_a}{S_y} \approx \frac{M_a}{2^{n_a}}, \qquad \frac{S_b}{S_y} \approx \frac{M_b}{2^{n_b}}
$$

## Round once, not twice

One easy way is to requantize each input to the output scale, round each one, and then add the two codes. But then the result has two rounding errors.

A better way rounds only once:

1. Multiply each input by its multiplier: $(q_a - Z_a) \cdot M_a$ and $(q_b - Z_b) \cdot M_b$.
2. Bring both to the larger of the two shifts, by shifting the other one left (this is exact).
3. Add them.
4. Shift right once, with rounding, add $Z_y$, and clamp.

The sum is exact until the last step, so the error is at most half a step.

## A cheaper add with shared scales

If the two inputs and the output share one scale, all the ratios are 1, and the add is just $q_a + q_b$ with saturation. [Shared scales](13-shared-scales.md) shows how a transformer block uses this.
