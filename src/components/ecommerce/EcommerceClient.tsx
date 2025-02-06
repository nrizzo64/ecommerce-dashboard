'use client';

import FunnelDetails from './FunnelDetailsSection';
import OrderSummariesSection from './OrderSummariesSection';
import RecentOrdersSection from './RecentOrdersSection';

export default function EcommerceClient(): React.ReactNode {
  return (
    <div style={{ width: '900px' }}>
      <OrderSummariesSection />
      <FunnelDetails />
      <RecentOrdersSection />
    </div>
  );
}
