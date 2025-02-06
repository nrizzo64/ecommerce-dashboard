import styles from '@/components/ecommerce/FunnelDetail.module.css';
import { FunnelStep } from '@/types/ecommerce/funnel/IFunnelStep';

interface FunnelDetailProps {
  step: FunnelStep;
}

export function FunnelDetail({ step }: FunnelDetailProps) {
  let { label, count, previousCount, totalCount, color, netConversion } = step;

  if (previousCount == null) {
    previousCount = count;
  }
  const tl = (100 - (previousCount / totalCount) * 100) / 2;
  const tr = (100 - (count / totalCount) * 100) / 2;
  const bl = 100 - tl;
  const br = 100 - tr;

  const funnelPath = {
    width: '100%',
    'min-block-size': '5rem',
    '--tl': `${tl}` /* top-left vertical position */,
    '--tr': `${tr}` /* top-right vertical position */,
    '--br': `${br}` /* bottom-right vertical position */,
    '--bl': `${bl}` /* bottom-left vertical position */,
    clipPath: `polygon(0 ${tl}%, 100% ${tr}%, 100% ${br}%, 0 ${bl}%)`,
    background: `${color}`,
  } as React.CSSProperties;

  return (
    <div className={styles.card}>
      <dl className={styles.textInfo}>
        <dt>{label}</dt>
        <dd style={{ color: color }}>{count.toLocaleString()}</dd>
        <dd style={{ color: color }}>
          {count === previousCount
            ? null
            : `(${((count / previousCount) * 100).toFixed(1)}%)`}
        </dd>
      </dl>
      <div>
        <div style={funnelPath}></div>
        <p className={styles.net}>
          {netConversion != null ? `Net: ${netConversion}%` : null}
        </p>
      </div>
    </div>
  );
}
