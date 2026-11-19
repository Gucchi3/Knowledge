// スケールとゼロ点で決まる目盛りに、データの値がどう丸められるかを見る図。
// INT4（コード-8〜7）で、対称・非対称・手動の3つの置き方を切り替えられる。

import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import useLocaleText from '../useLocaleText';
import styles from './styles.module.css';

const Q_MIN = -8;
const Q_MAX = 7;

// 0より右に偏ったデータ。最後の値は外れ値
const BASE_DATA = [-0.62, -0.35, -0.2, -0.05, 0.1, 0.22, 0.35, 0.48, 0.6, 0.71, 0.85, 1.0, 1.12, 1.3, 1.45, 1.7, 1.95, 2.3, 2.6];
const OUTLIER = 5.2;

// 図の横軸に描く実数の範囲
const X_MIN = -3;
const X_MAX = 6;
const W = 560;
const PAD = 20;

/**
 * 実数を図の横位置に変換する。
 *
 * @param {number} r 実数
 * @returns {number} SVGのx座標
 */
const toX = (r) => PAD + ((r - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);

/**
 * 実数を量子化してコードにする。0.5ちょうどは0から遠い方へ丸める。
 *
 * @param {number} r 実数
 * @param {number} s スケール
 * @param {number} z ゼロ点
 * @returns {{q: number, clipped: boolean}} コードと、クリップされたかどうか
 */
function quantize(r, s, z) {
  const v = r / s;
  const rounded = Math.sign(v) * Math.round(Math.abs(v)) + z;
  const q = Math.min(Q_MAX, Math.max(Q_MIN, rounded));
  return {q, clipped: q !== rounded};
}

/**
 * 目盛りの図を描く。
 *
 * @param {{initialMode?: 'sym' | 'asym' | 'manual'}} props 最初に選ぶ置き方
 * @returns {JSX.Element} 図
 */
export default function QuantRuler({initialMode = 'sym'}) {
  const t = useLocaleText();
  const [mode, setMode] = useState(initialMode);
  const [withOutlier, setWithOutlier] = useState(false);
  const [manualS, setManualS] = useState(0.3);
  const [manualZ, setManualZ] = useState(0);

  const data = withOutlier ? [...BASE_DATA, OUTLIER] : BASE_DATA;
  const rMin = Math.min(...data);
  const rMax = Math.max(...data);

  // 置き方ごとのスケールとゼロ点
  let s;
  let z;
  if (mode === 'sym') {
    s = Math.max(Math.abs(rMin), Math.abs(rMax)) / Q_MAX;
    z = 0;
  } else if (mode === 'asym') {
    s = (rMax - rMin) / (Q_MAX - Q_MIN);
    z = Math.round(Q_MIN - rMin / s);
  } else {
    s = manualS;
    z = manualZ;
  }

  const points = useMemo(
    () => data.map((r) => {
      const {q, clipped} = quantize(r, s, z);
      const back = s * (q - z);
      return {r, q, back, err: Math.abs(back - r), clipped};
    }),
    [data, s, z],
  );
  const used = new Set(points.map((p) => p.q)).size;
  const meanErr = points.reduce((a, p) => a + p.err, 0) / points.length;
  const maxErr = Math.max(...points.map((p) => p.err));
  const clippedCount = points.filter((p) => p.clipped).length;

  const marks = [];
  for (let q = Q_MIN; q <= Q_MAX; q++) marks.push({q, r: s * (q - z)});
  const lo = toX(Math.max(X_MIN, s * (Q_MIN - z)));
  const hi = toX(Math.min(X_MAX, s * (Q_MAX - z)));

  const modes = [
    ['sym', t('対称', 'Symmetric')],
    ['asym', t('非対称', 'Asymmetric')],
    ['manual', t('手動', 'Manual')],
  ];

  return (
    <div className={styles.figure}>
      <div className={styles.controls}>
        <div className={styles.presets} style={{margin: 0}}>
          {modes.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)}
              className={clsx(styles.presetButton, mode === id && styles.presetButtonActive)}>
              {label}
            </button>
          ))}
        </div>
        <label>
          <input type="checkbox" checked={withOutlier} onChange={(e) => setWithOutlier(e.target.checked)} />
          {t('外れ値（5.2）を足す', 'Add an outlier (5.2)')}
        </label>
        {mode === 'manual' && (
          <>
            <label>
              S = {manualS.toFixed(2)}
              <input type="range" min="0.05" max="0.8" step="0.01" value={manualS}
                onChange={(e) => setManualS(Number(e.target.value))} />
            </label>
            <label>
              Z = {manualZ}
              <input type="range" min={Q_MIN} max={Q_MAX} step="1" value={manualZ}
                onChange={(e) => setManualZ(Number(e.target.value))} />
            </label>
          </>
        )}
      </div>

      <svg className={styles.ruler} viewBox={`0 0 ${W} 170`} role="img"
        aria-label={t('データの値と、量子化した後の値', 'Data values and their quantized values')}>
        <text x={PAD} y="14" fontSize="13" fill="currentColor">{t('元の値 r', 'Real value r')}</text>
        <text x={PAD} y="164" fontSize="13" fill="currentColor">{t('目盛り（INT4のコード）', 'Marks (INT4 codes)')}</text>
        {/* 量子化の範囲 */}
        <rect x={lo} y="96" width={Math.max(0, hi - lo)} height="24" fill="var(--ifm-color-primary)" fillOpacity="0.12" />
        <line x1={PAD} y1="108" x2={W - PAD} y2="108" stroke="currentColor" strokeOpacity="0.4" />
        {/* 実数0の位置 */}
        <line x1={toX(0)} y1="24" x2={toX(0)} y2="140" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.5" />
        <text x={toX(0) + 3} y="36" fontSize="12" fill="currentColor">0</text>
        {marks.map(({q, r}) => (r >= X_MIN && r <= X_MAX) && (
          <g key={q}>
            <line x1={toX(r)} y1="98" x2={toX(r)} y2="118" stroke="currentColor" strokeWidth="1.5" />
            <text x={toX(r)} y="136" fontSize="12" textAnchor="middle" fill="currentColor">{q}</text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={i}>
            <line x1={toX(p.r)} y1="54" x2={toX(Math.min(X_MAX, Math.max(X_MIN, p.back)))} y2="104"
              stroke={p.clipped ? 'var(--ifm-color-danger)' : 'var(--ifm-color-primary)'} strokeOpacity="0.7" />
            <circle cx={toX(p.r)} cy="50" r="4"
              fill={p.clipped ? 'var(--ifm-color-danger)' : 'var(--ifm-color-primary)'} />
          </g>
        ))}
      </svg>

      <div className={styles.stats}>
        <span>S = {s.toFixed(3)}</span>
        <span>Z = {z}</span>
        <span>{t('使ったコード', 'Codes used')}: {used} / 16</span>
        <span>{t('平均誤差', 'Mean error')}: {meanErr.toFixed(3)}</span>
        <span>{t('最大誤差', 'Max error')}: {maxErr.toFixed(3)}</span>
        <span>{t('クリップ', 'Clipped')}: {clippedCount}</span>
      </div>
      <div className={styles.caption}>
        {t(
          '上の点が元の値、線の先が丸めた後の目盛りである。色の付いた帯が表せる範囲で、赤い点はクリップされた値。対称では負の側の目盛りが余り、非対称ではすべての目盛りがデータの範囲に入る。外れ値を足すと範囲が広がり、刻みが粗くなる。',
          'Dots are the real values; each line ends at the mark it rounds to. The shaded band is the range, and red dots are clipped. Symmetric leaves marks unused on the negative side; asymmetric puts every mark inside the data. An outlier stretches the range and makes the steps coarser.',
        )}
      </div>
    </div>
  );
}
