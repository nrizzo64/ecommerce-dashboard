import styles from '@/components/ecommerce/FunnelDetailsSection.module.css';
import { FunnelData } from '@/types/ecommerce/funnel/IFunnelData';
import { FunnelStep } from '@/types/ecommerce/funnel/IFunnelStep';
import useFetchOnce from '@/utils/client/useFetchOnce';
import { Card } from 'antd';
import { FunnelDetail } from './FunnelDetail';

const FUNNEL_DETAILS_URL = '/api/ecommerce/funnel-details';
export const FUNNEL_COLORS = {
  sessions: '#1890ff',
  productViews: '#40a9ff',
  checkouts: '#69c0ff',
  purchases: '#91d5ff',
} as const;

export default function FunnelDetailsSection(): React.ReactNode {
  const { isLoading, data } = useFetchOnce<FunnelData>(FUNNEL_DETAILS_URL);

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

  const calculateNetPercentage = (count: number, total: number) =>
    ((count / total) * 100).toFixed(1);

  const funnelSteps: FunnelStep[] = [
    {
      label: 'Sessions',
      count: num_sessions,
      totalCount: num_sessions,
      color: FUNNEL_COLORS.sessions,
    },
    {
      label: 'Product Views',
      count: num_product_views,
      previousCount: num_sessions,
      totalCount: num_sessions,
      color: FUNNEL_COLORS.productViews,
    },
    {
      label: 'Checkouts',
      count: num_checkouts,
      previousCount: num_product_views,
      totalCount: num_sessions,
      color: FUNNEL_COLORS.checkouts,
    },
    {
      label: 'Purchases',
      count: num_purchases,
      previousCount: num_checkouts,
      totalCount: num_sessions,
      color: FUNNEL_COLORS.purchases,
      netConversion: calculateNetPercentage(num_purchases, num_sessions),
    },
  ];

  return (
    <section style={{ marginBottom: 48, padding: 16 }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>

      <div className={styles.funnelWrapper}>
        {funnelSteps.map((step) => (
          <FunnelDetail key={step.label} step={step} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
