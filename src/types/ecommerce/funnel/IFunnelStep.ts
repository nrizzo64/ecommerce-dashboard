export interface FunnelStep {
  label: string;
  count: number;
  previousCount?: number;
  color: string;
  netConversion?: string;
  maxCount: number;
}
