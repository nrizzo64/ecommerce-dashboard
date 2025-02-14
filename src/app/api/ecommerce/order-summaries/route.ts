import EntityCommerceUserEventService from '@/services/ecommerce/EntityCommerceUserEventService';
import { NextResponse } from 'next/server';

const commerceUserEventService = new EntityCommerceUserEventService();

export async function GET(): Promise<NextResponse> {
  try {
    const [numSessions, numPurchases, numDollarRevenue] = await Promise.all([
      commerceUserEventService.genNumRecentEventByType('session'),
      commerceUserEventService.genNumRecentEventByType('purchase'),
      commerceUserEventService.genNumRecentRevenue(),
    ]);

    return NextResponse.json({
      num_sessions: numSessions,
      num_purchases: numPurchases,
      num_dollar_revenue: numDollarRevenue,
    });
  } catch (error) {
    console.error('Error fetching recent commerce events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent event data' },
      { status: 500 }
    );
  }
}
