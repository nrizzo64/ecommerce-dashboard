import styles from '@/components/ecommerce/FunnelDetail.module.css';
import { FunnelStep } from '@/types/ecommerce/funnel/IFunnelStep';

interface FunnelDetailProps {
  step: FunnelStep;
}

export function FunnelDetail({ step }: FunnelDetailProps) {
  const { label, count, previousCount, color, netConversion, maxCount } = step;
  const effectivePreviousCount = previousCount ?? count;

  const calculateFunnelPoints = () => {
    // (left) previous funnel value
    const topLeft = (100 - (effectivePreviousCount / maxCount) * 100) / 2;
    const botLeft = 100 - topLeft;
    // (right) current funnel value
    const topRight = (100 - (count / maxCount) * 100) / 2;
    const botRight = 100 - topRight;

    return { topLeft, topRight, botLeft, botRight };
  };

  const { topLeft, topRight, botLeft, botRight } = calculateFunnelPoints();

  const funnelPath: React.CSSProperties = {
    width: '100%',
    minHeight: '5rem',
    clipPath: `polygon(0 ${topLeft}%, 100% ${topRight}%, 100% ${botRight}%, 0 ${botLeft}%)`,
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
