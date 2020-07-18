export interface Billing {
  Balance: number;
  ThisMonthCharges: number;
  BillingRecords: unknown[];
  MonthlyChargesStorage: number;
  MonthlyChargesEUTraffic: number;
  MonthlyChargesUSTraffic: number;
  MonthlyChargesASIATraffic: number;
  MonthlyChargesSATraffic: number;
}
