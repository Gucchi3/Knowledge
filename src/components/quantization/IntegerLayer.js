// 1つの層を整数だけで計算する手順の図。手順を押すと、その中身を下に出す。

import React, {useState} from 'react';
import clsx from 'clsx';
import useLocaleText from '../useLocaleText';
import styles from './styles.module.css';

/**
 * 整数推論の手順を描く。
 *
 * @returns {JSX.Element} 図
 */
export default function IntegerLayer() {
  const t = useLocaleText();
  const [active, setActive] = useState(1);

  const steps = [
    {
      name: t('入力と重み', 'Input and weights'),
      width: 'INT8 × INT8',
      detail: t(
        '入力のコード q_x と重みのコード q_w。スケール S_x、S_w は計算の外に出しておき、最後にまとめて扱う。',
        'Input codes q_x and weight codes q_w. The scales S_x and S_w stay outside the math, and are handled once at the end.',
      ),
    },
    {
      name: t('積和', 'Multiply-add'),
      width: 'INT32',
      detail: t(
        '積を広いアキュムレータに足し込む。8ビット同士の積は16ビットで、足す数が2倍になるごとに1ビット増えるので、32ビットあればほぼすべての層に足りる。和のスケールは S_w·S_x になる。',
        'Add the products in a wide accumulator. An 8-bit product needs 16 bits, and each doubling of the count adds about 1 bit, so 32 bits cover almost every layer. The sum has the scale S_w·S_x.',
      ),
    },
    {
      name: t('バイアス', 'Bias'),
      width: 'INT32',
      detail: t(
        'バイアスは前もって和と同じスケールの整数 round(b / (S_w·S_x)) にしておくので、そのまま足せる。',
        'The bias is stored ahead of time as an integer with the scale of the sum, round(b / (S_w·S_x)), so it adds directly.',
      ),
    },
    {
      name: 'ReLU',
      width: 'INT32',
      detail: t(
        '丸める前の和に max(acc, 0) を取る。和は正確なので結果も正確で、次の再量子化のクランプに含めればほぼ無償になる。',
        'Take max(acc, 0) on the sum before rounding. The sum is exact, so this is exact too, and it can merge into the clamp of the requantization.',
      ),
    },
    {
      name: t('再量子化', 'Requantize'),
      width: 'INT32 → INT8',
      detail: t(
        'M = S_w·S_x / S_y を M_0 / 2^n で近似し、(acc·M_0 + 2^(n-1)) >> n にゼロ点 Z_y を足して、出力の範囲にクランプする。浮動小数点数は使わない。',
        'Approximate M = S_w·S_x / S_y by M_0 / 2^n, compute (acc·M_0 + 2^(n-1)) >> n, add the zero point Z_y, and clamp to the output range. No floats.',
      ),
    },
    {
      name: t('次の層へ', 'To the next layer'),
      width: 'INT8',
      detail: t(
        '出力のコード q_y は、次の層の入力になる。最後の層だけは再量子化せず、INT32の和をそのままロジットとして使うことが多い。',
        'The output codes q_y feed the next layer. The last layer often skips requantization and uses its INT32 sums as the logits.',
      ),
    },
  ];

  return (
    <div className={styles.figure}>
      <div className={styles.pipe}>
        {steps.map((step, i) => (
          <React.Fragment key={step.name}>
            {i > 0 && <span className={styles.flowArrow} aria-hidden="true">→</span>}
            <button type="button" onClick={() => setActive(i)} aria-pressed={active === i}
              className={clsx(styles.pipeStep, active === i && styles.pipeStepOn)}>
              {step.name}
              <span className={styles.pipeWidth}>{step.width}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.pipeDetail}>{steps[active].detail}</div>
      <div className={styles.caption}>
        {t('各手順を押すと、その中身を表示する。', 'Click a step to see what it does.')}
      </div>
    </div>
  );
}
