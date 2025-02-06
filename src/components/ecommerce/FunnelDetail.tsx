import styles from '@/components/ecommerce/FunnelDetail.module.css';
import { FunnelStep } from '@/types/ecommerce/funnel/IFunnelStep';

interface FunnelDetailProps {
  step: FunnelStep;
  isLoading?: boolean;
}

export function FunnelDetail({ step, isLoading = false }: FunnelDetailProps) {
  const { label, count, previousCount, totalCount, color, netConversion } =
    step;
  const effectivePreviousCount = previousCount ?? count;

  const calculateFunnelPoints = () => {
    const tl = (100 - (effectivePreviousCount / totalCount) * 100) / 2;
    const tr = (100 - (count / totalCount) * 100) / 2;
    const bl = 100 - tl;
    const br = 100 - tr;

    return { tl, tr, bl, br };
  };

  const { tl, tr, bl, br } = calculateFunnelPoints();

  const funnelPath: React.CSSProperties = {
    width: '100%',
    minHeight: '5rem',
    clipPath: `polygon(0 ${tl}%, 100% ${tr}%, 100% ${br}%, 0 ${bl}%)`,
    background: color,
  };

  const calculateConversionRate = () => {
    if (count === effectivePreviousCount) return null;
    return `(${((count / effectivePreviousCount) * 100).toFixed(1)}%)`;
  };

  return (
    <div className={styles.card}>
      <dl className={styles.textInfo}>
        <dt>{label}</dt>
        <dd style={{ color: color }}>{count.toLocaleString()}</dd>
        <dd style={{ color: color }}>
          {count === effectivePreviousCount ? null : calculateConversionRate()}
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
