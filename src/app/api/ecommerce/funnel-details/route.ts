import EntityCommerceUserEventService from '@/services/ecommerce/EntityCommerceUserEventService';
import { NextResponse } from 'next/server';

const commerceUserEventService = new EntityCommerceUserEventService();

export async function GET(): Promise<NextResponse> {
  try {
    const [numSessions, numProductViews, numCheckouts, numPurchases] =
      await Promise.all([
        commerceUserEventService.genNumRecentEventByType('session'),
        commerceUserEventService.genNumRecentEventByType('product_view'),
        commerceUserEventService.genNumRecentEventByType('checkout'),
        commerceUserEventService.genNumRecentEventByType('purchase'),
      ]);

    return NextResponse.json({
      num_sessions: numSessions,
      num_product_views: numProductViews,
      num_checkouts: numCheckouts,
      num_purchases: numPurchases,
    });
  } catch (error) {
    console.error('Error fetching commerce events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event data' },
      { status: 500 }
    );
  }
}
