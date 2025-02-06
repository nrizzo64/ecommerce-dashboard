import styles from '@/components/ecommerce/FunnelDetail.module.css';

export interface FunnelDetailProps {
  color: string;
  eventLabel: string;
  eventCount: number;
  eventCountPrev?: number;
  eventCountTotal: number;
  net?: string;
}

export default function FunnelDetail({
  color,
  eventLabel,
  eventCount,
  eventCountPrev,
  eventCountTotal,
  net,
}: FunnelDetailProps): React.ReactNode {
  if (eventCountPrev == null) {
    eventCountPrev = eventCount;
  }
  const tl = (100 - (eventCountPrev / eventCountTotal) * 100) / 2;
  const tr = (100 - (eventCount / eventCountTotal) * 100) / 2;
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
        <dt>{eventLabel}</dt>
        <dd style={{ color: color }}>{eventCount.toLocaleString()}</dd>
        <dd style={{ color: color }}>
          {eventCount === eventCountPrev
            ? null
            : `(${((eventCount / eventCountPrev) * 100).toFixed(1)}%)`}
        </dd>
      </dl>
      <div>
        <div style={funnelPath}></div>
        <p className={styles.net}>{net != null ? `Net: ${net}%` : null}</p>
      </div>
    </div>
  );
}

{
  /* <Col span={boxWidth} style={{ borderInline: '1px solid #d9d9d9' }}> */
}
