import { OccuranceByDate } from './occurance-by-date';

export class Statistics {
  TotalBandwidthUsed: number = -1;
  TotalRequestsServed: number = -1;
  CacheHitRate: number = -1;
  BandwidthUsedChart?: OccuranceByDate;
  BandwidthCachedChart?: OccuranceByDate;
  CacheHitRateChart?: OccuranceByDate;
  RequestsServedChart?: OccuranceByDate;
  PullRequestsPulledChart?: OccuranceByDate;
  OriginShieldBandwidthUsedChart?: OccuranceByDate;
  OriginShieldInternalBandwidthUsedChart?: OccuranceByDate;
  UserBalanceHistoryChart?: OccuranceByDate;
  GeoTrafficDistribution?: Record<string, unknown>;
  Error3xxChart?: OccuranceByDate;
  Error4xxChart?: OccuranceByDate;
  Error5xxChart?: OccuranceByDate;
}
