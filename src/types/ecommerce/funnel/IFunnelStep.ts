export interface FunnelStep {
  label: string;
  count: number;
  previousCount?: number;
  totalCount: number;
  color: string;
  netConversion?: string;
}
