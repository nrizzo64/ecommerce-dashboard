import styles from '@/components/ecommerce/FunnelDetailsSection.module.css';
import useFetchOnce from '@/utils/client/useFetchOnce';
import { blue } from '@ant-design/colors';
import FunnelDetail from './FunnelDetail';

const FUNNEL_DETAILS_URL = '/api/ecommerce/funnel-details';

export default function FunnelDetailsSection(): React.ReactNode {
  const { isLoading, data } = useFetchOnce<{
    num_sessions: number;
    num_product_views: number;
    num_checkouts: number;
    num_purchases: number;
  }>(FUNNEL_DETAILS_URL);

  const {
    num_sessions = 0,
    num_product_views = 0,
    num_checkouts = 0,
    num_purchases = 0,
  } = data ?? {};

  return (
    <section style={{ marginBottom: 48, padding: 16 }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>

      <div className={styles.funnelWrapper}>
        <FunnelDetail
          color={blue[7]}
          eventLabel='Sessions'
          eventCount={num_sessions}
          eventCountTotal={num_sessions}
        />
        <FunnelDetail
          color={blue[5]}
          eventLabel='Product Views'
          eventCount={num_product_views}
          eventCountPrev={num_sessions}
          eventCountTotal={num_sessions}
        />
        <FunnelDetail
          color={blue[4]}
          eventLabel='Checkouts'
          eventCount={num_checkouts}
          eventCountPrev={num_product_views}
          eventCountTotal={num_sessions}
        />
        <FunnelDetail
          color={blue[3]}
          eventLabel='Purchases'
          eventCount={num_purchases}
          eventCountPrev={num_checkouts}
          eventCountTotal={num_sessions}
          net={((num_purchases / num_sessions) * 100).toFixed(1)}
        />
      </div>
    </section>
  );
}
