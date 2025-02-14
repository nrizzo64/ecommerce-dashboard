import styles from '@/components/ecommerce/FunnelDetailsSection.module.css';
import { FunnelData } from '@/types/ecommerce/funnel/IFunnelData';
import { FunnelStep } from '@/types/ecommerce/funnel/IFunnelStep';
import useFetchOnce from '@/utils/client/useFetchOnce';
import { Alert, Card } from 'antd';
import { FunnelDetail } from './FunnelDetail';

const FUNNEL_DETAILS_URL = '/api/ecommerce/funnel-details';
export const FUNNEL_COLORS = {
  sessions: '#1890ff',
  productViews: '#40a9ff',
  checkouts: '#69c0ff',
  purchases: '#91d5ff',
} as const;

export default function FunnelDetailsSection(): React.ReactNode {
  const { isLoading, data, error } =
    useFetchOnce<FunnelData>(FUNNEL_DETAILS_URL);
  if (error) {
    return (
      <section style={{ marginBottom: 48, padding: 16 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
        <Alert message='Unable to load data' type='error' showIcon />
      </section>
    );
  }
  if (isLoading) {
    return (
      <section style={{ marginBottom: 48, padding: 16 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
        <Card loading={isLoading} />
      </section>
    );
  }

  const {
    num_sessions = 0,
    num_product_views = 0,
    num_checkouts = 0,
    num_purchases = 0,
  } = data ?? {};

  const maxCount = data
    ? Math.max(
        ...Object.values(data).filter(
          (val): val is number => typeof val === 'number'
        )
      )
    : 0;

  const calculateNetPercentage = (count: number, total: number) =>
    ((count / total) * 100).toFixed(1);

  const funnelSteps: FunnelStep[] = [
    {
      label: 'Sessions',
      count: num_sessions,
      color: FUNNEL_COLORS.sessions,
      maxCount: maxCount,
    },
    {
      label: 'Product Views',
      count: num_product_views,
      previousCount: num_sessions,
      color: FUNNEL_COLORS.productViews,
      maxCount: maxCount,
    },
    {
      label: 'Checkouts',
      count: num_checkouts,
      previousCount: num_product_views,
      color: FUNNEL_COLORS.checkouts,
      maxCount: maxCount,
    },
    {
      label: 'Purchases',
      count: num_purchases,
      previousCount: num_checkouts,
      color: FUNNEL_COLORS.purchases,
      netConversion: calculateNetPercentage(num_purchases, num_sessions),
      maxCount: maxCount,
    },
  ];

  return (
    <section style={{ marginBottom: 48, padding: 16 }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>

      <div className={styles.funnelWrapper}>
        {funnelSteps.map((step) => (
          <FunnelDetail key={step.label} step={step} />
        ))}
      </div>
    </section>
  );
}
