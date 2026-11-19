// 量子化の全体像の図。上段は学習済みモデルからデバイスで動くまでの流れ、
// 下段は量子化で決める6つの選択肢と、よくある組み合わせの例。

import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useLocaleText from '../useLocaleText';
import styles from './styles.module.css';

const BASE = '/docs/quantization';

/**
 * 選択肢の中身を表す小さな図。
 *
 * @param {{kind: string}} props 図の種類
 * @returns {JSX.Element} SVGの図
 */
function Mini({kind}) {
  const stroke = 'currentColor';
  const line = <line x1="4" y1="24" x2="156" y2="24" stroke={stroke} strokeOpacity="0.4" />;
  const ticks = (xs) =>
    xs.map((x) => <line key={x} x1={x} y1="16" x2={x} y2="30" stroke={stroke} strokeWidth="1.5" />);
  switch (kind) {
    case 'int':
      return <svg className={styles.mini} viewBox="0 0 160 34">{line}{ticks([10, 30, 50, 70, 90, 110, 130, 150])}</svg>;
    case 'fp':
      return <svg className={styles.mini} viewBox="0 0 160 34">{line}{ticks([10, 40, 60, 70, 80, 90, 100, 120, 150])}</svg>;
    case 'sym':
    case 'asym': {
      // 灰色の山がデータの分布、枠が量子化の範囲
      const box = kind === 'sym' ? {x: 6, w: 148} : {x: 50, w: 104};
      return (
        <svg className={styles.mini} viewBox="0 0 160 34">
          <path d="M55 30 C70 30 80 6 100 6 C120 6 135 30 150 30 Z" fill={stroke} fillOpacity="0.25" />
          <rect x={box.x} y="3" width={box.w} height="28" fill="none" stroke={stroke} strokeWidth="1.5" rx="3" />
          <line x1="80" y1="0" x2="80" y2="34" stroke={stroke} strokeDasharray="2 2" />
          <text x={kind === 'sym' ? 82 : 82} y="12" fontSize="8" fill={stroke}>0</text>
        </svg>
      );
    }
    case 'stat':
    case 'learn':
      return (
        <svg className={styles.mini} viewBox="0 0 160 34">
          <path d="M10 30 C40 30 60 4 80 4 C100 4 120 30 150 30" fill="none" stroke={stroke} strokeOpacity="0.5" />
          <line x1="30" y1="2" x2="30" y2="32" stroke={stroke} strokeWidth="2" />
          <line x1="130" y1="2" x2="130" y2="32" stroke={stroke} strokeWidth="2" />
          {kind === 'learn' && <text x="58" y="31" fontSize="9" fill={stroke}>∂L/∂S</text>}
        </svg>
      );
    case 'tensor':
    case 'channel':
    case 'block': {
      // 4x8の格子。同じ色のマスが1つのスケールを共有する
      const cells = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 8; c++) {
          const group = kind === 'tensor' ? 0 : kind === 'channel' ? r : r * 2 + (c >> 2);
          cells.push(
            <rect key={`${r}-${c}`} x={22 + c * 15} y={1 + r * 8} width="14" height="7"
              fill={stroke} fillOpacity={0.15 + (group % 4) * 0.15} />,
          );
        }
      }
      return <svg className={styles.mini} viewBox="0 0 160 34">{cells}</svg>;
    }
    case 'static':
    case 'dynamic':
      return (
        <svg className={styles.mini} viewBox="0 0 160 34">
          {[0, 1, 2].map((i) => {
            const w = kind === 'static' ? 40 : [26, 40, 34][i];
            return <rect key={i} x={10 + i * 50 + (40 - w) / 2} y="6" width={w} height="22" rx="3" fill="none" stroke={stroke} strokeWidth="1.5" />;
          })}
        </svg>
      );
    case 'ptq':
    case 'qat':
      return (
        <svg className={styles.mini} viewBox="0 0 160 34">
          <rect x="6" y="8" width="40" height="18" rx="3" fill="none" stroke={stroke} />
          <text x="13" y="21" fontSize="9" fill={stroke}>FP32</text>
          <line x1="50" y1="17" x2="106" y2="17" stroke={stroke} />
          <text x="60" y="13" fontSize="8" fill={stroke}>{kind === 'ptq' ? 'calib' : 'train'}</text>
          <rect x="110" y="8" width="44" height="18" rx="3" fill="none" stroke={stroke} />
          <text x="118" y="21" fontSize="9" fill={stroke}>INT</text>
        </svg>
      );
    default:
      return null;
  }
}

/**
 * 量子化の全体像を描く。
 *
 * @returns {JSX.Element} 図
 */
export default function QuantOverview() {
  const t = useLocaleText();
  const [preset, setPreset] = useState('mcu');

  const axes = [
    {
      id: 'format',
      title: t('値の並び', 'Value grid'),
      question: t('どの値を表せるようにするか', 'Which values can a code stand for?'),
      options: [
        {id: 'int', name: 'INT', text: t('等間隔の目盛り。計算が単純', 'Evenly spaced marks. Simple math'), to: `${BASE}/basics/scale-zero-point`},
        {id: 'fp', name: 'FP', text: t('0の近くほど細かい。4ビットで強い', 'Finer near 0. Strong at 4 bits'), to: `${BASE}/basics/int-fp`},
      ],
    },
    {
      id: 'place',
      title: t('置き方', 'Placement'),
      question: t('範囲の中心をどこに置くか', 'Where does the range sit?'),
      options: [
        {id: 'sym', name: t('対称', 'Symmetric'), text: t('ゼロ点0。積に補正が要らない', 'Zero point 0. No correction in products'), to: `${BASE}/basics/symmetric`},
        {id: 'asym', name: t('非対称', 'Asymmetric'), text: t('ゼロ点でずらしてデータに合わせる', 'A zero point fits the range to the data'), to: `${BASE}/basics/asymmetric`},
      ],
    },
    {
      id: 'range',
      title: t('範囲の決め方', 'Range'),
      question: t('外れ値まで含めるか、切るか', 'Keep outliers, or clip them?'),
      options: [
        {id: 'stat', name: t('値から決める', 'From the values'), text: 'min-max, percentile, MSE', to: `${BASE}/basics/clipping-range`},
        {id: 'learn', name: t('学習で決める', 'Learned'), text: 'PACT, LSQ', to: `${BASE}/setting-scales/qat`},
      ],
    },
    {
      id: 'gran',
      title: t('粒度', 'Granularity'),
      question: t('何個の値で1つのスケールを共有するか', 'How many values share one scale?'),
      options: [
        {id: 'tensor', name: t('テンソルごと', 'Per tensor'), text: t('スケール1つ', 'One scale'), to: `${BASE}/basics/granularity`},
        {id: 'channel', name: t('チャネル/トークンごと', 'Per channel / token'), text: t('行ごとに1つ', 'One per row'), to: `${BASE}/basics/granularity`},
        {id: 'block', name: t('ブロックごと', 'Per block'), text: t('16個などの塊ごと', 'One per 16 values or so'), to: `${BASE}/basics/block-scales`},
      ],
    },
    {
      id: 'time',
      title: t('決める時期', 'Timing'),
      question: t('活性化のスケールをいつ決めるか', 'When are the activation scales set?'),
      options: [
        {id: 'static', name: t('静的', 'Static'), text: t('推論前に固定。実行時の処理なし', 'Fixed before inference. No run-time work'), to: `${BASE}/setting-scales/static-dynamic`},
        {id: 'dynamic', name: t('動的', 'Dynamic'), text: t('入力ごとに測る。入力の変化に強い', 'Measured per input. Follows the input'), to: `${BASE}/setting-scales/static-dynamic`},
      ],
    },
    {
      id: 'train',
      title: t('学習', 'Training'),
      question: t('量子化した状態で学習し直すか', 'Train again with quantization?'),
      options: [
        {id: 'ptq', name: 'PTQ', text: t('再学習なし。INT8ならたいてい十分', 'No training. Usually enough for INT8'), to: `${BASE}/setting-scales/ptq`},
        {id: 'qat', name: 'QAT', text: t('丸めを入れて学習。4ビット以下で必要', 'Train with rounding. Needed at 4 bits or less'), to: `${BASE}/setting-scales/qat`},
      ],
    },
  ];

  // よくある組み合わせ。各軸で選ばれる選択肢と、その軸についての補足
  const presets = {
    mcu: {
      label: t('マイコン向けINT8', 'INT8 on a microcontroller'),
      note: t(
        '組み込み機器の定番。整数演算だけで推論でき、実行時にスケールを計算しない。',
        'The usual choice for embedded devices. Integer math only, and no scale is computed at run time.',
      ),
      pick: {format: ['int'], place: ['sym', 'asym'], range: ['stat'], gran: ['tensor', 'channel'], time: ['static'], train: ['ptq']},
      sub: {
        place: t('重みは対称、活性化は非対称', 'Weights symmetric, activations asymmetric'),
        gran: t('重みはチャネルごと、活性化はテンソルごと', 'Weights per channel, activations per tensor'),
        train: t('精度が足りなければQAT', 'QAT if the accuracy is not enough'),
      },
    },
    nvfp4: {
      label: t('4ビット（NVFP4）', '4 bits (NVFP4)'),
      note: t(
        '4ビットではコードが16個しかないので、FP4と小さなブロックスケールで精度を保つ。',
        'With only 16 codes, FP4 elements and small block scales keep the accuracy.',
      ),
      pick: {format: ['fp'], place: ['sym'], range: ['stat', 'learn'], gran: ['block'], time: ['static', 'dynamic'], train: ['qat']},
      sub: {
        time: t('ブロックスケールは入力ごと、テンソルスケールは固定', 'Block scales per input, tensor scale fixed'),
      },
    },
    llm: {
      label: t('サーバのLLM（INT8）', 'LLM on a server (INT8)'),
      note: t(
        '入力ごとの値の変化が大きいので、活性化のスケールをトークンごとに実行時に測る。',
        'The activations change a lot, so their scales are measured for each token at run time.',
      ),
      pick: {format: ['int'], place: ['sym'], range: ['stat'], gran: ['channel'], time: ['dynamic'], train: ['ptq']},
      sub: {
        gran: t('重みはチャネルごと、活性化はトークンごと', 'Weights per channel, activations per token'),
      },
    },
  };
  const current = presets[preset];

  const flow = [
    {title: t('1. 学習済みモデル', '1. Trained model'), text: t('重みも活性化もFP32', 'Weights and activations in FP32'), to: `${BASE}/basics/what-is-quantization`},
    {title: t('2. 量子化の設計', '2. Design the quantization'), text: t('下の6つの選択肢を決める', 'Make the six choices below'), to: `${BASE}/basics/scale-zero-point`},
    {title: t('3. スケールを決める', '3. Set the scales'), text: t('PTQ（キャリブレーション）かQAT', 'PTQ (calibration) or QAT'), to: `${BASE}/setting-scales/static-dynamic`},
    {title: t('4. 整数で推論', '4. Integer inference'), text: t('積和、再量子化、クランプ', 'MAC, requantization, clamp'), to: `${BASE}/integer-math/integer-inference`},
  ];

  return (
    <div className={styles.figure}>
      <div className={styles.flow}>
        {flow.map((step, i) => (
          <React.Fragment key={step.title}>
            {i > 0 && <span className={styles.flowArrow} aria-hidden="true">→</span>}
            <Link className={styles.flowStep} to={step.to}>
              <strong>{step.title}</strong>
              {step.text}
            </Link>
          </React.Fragment>
        ))}
      </div>

      <h4 style={{marginTop: '1.25rem'}}>{t('量子化で決める6つのこと', 'Six choices in quantization')}</h4>
      <div className={styles.presets} role="group" aria-label={t('組み合わせの例', 'Example combinations')}>
        {Object.entries(presets).map(([id, p]) => (
          <button key={id} type="button" onClick={() => setPreset(id)}
            className={clsx(styles.presetButton, preset === id && styles.presetButtonActive)}
            aria-pressed={preset === id}>
            {p.label}
          </button>
        ))}
      </div>
      <p className={styles.presetNote}>{current.note}</p>

      {axes.map((axis) => (
        <div key={axis.id} className={styles.axis}>
          <div>
            <div className={styles.axisTitle}>{axis.title}</div>
            <div className={styles.axisQuestion}>{axis.question}</div>
          </div>
          <div className={styles.options}>
            {axis.options.map((o) => {
              const on = current.pick[axis.id].includes(o.id);
              return (
                <Link key={o.id} to={o.to}
                  className={clsx(styles.option, on ? styles.optionOn : styles.optionDim)}
                  style={{color: 'inherit', textDecoration: 'none'}}>
                  <div className={styles.optionName}>{o.name}</div>
                  <Mini kind={o.id} />
                  <div>{o.text}</div>
                  {on && current.sub[axis.id] && <span className={styles.optionTag}>{current.sub[axis.id]}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div className={styles.caption}>
        {t(
          'ボタンで組み合わせの例を切り替えると、その例で選ばれる選択肢が枠で示される。各カードを押すと説明のページに移る。',
          'Switch the example with the buttons; the choices it uses get a frame. Click a card to open its page.',
        )}
      </div>
    </div>
  );
}
