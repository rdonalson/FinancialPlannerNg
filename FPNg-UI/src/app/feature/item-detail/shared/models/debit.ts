import { IPeriod } from './period';

export interface IDebit {
  pkDebit: number;
  userId: string;
  name: string;
  amount: number;
  fkPeriod: number;
  dateRangeReq?: boolean;
  beginDate?: Date;
  endDate?: Date;
  weeklyDow?: number;
  everOtherWeekDow?: number;
  biMonthlyDay1?: number;
  biMonthlyDay2?: number;
  monthlyDom?: number;
  quarterly1Month?: number;
  quarterly1Day?: number;
  quarterly2Month?: number;
  quarterly2Day?: number;
  quarterly3Month?: number;
  quarterly3Day?: number;
  quarterly4Month?: number;
  quarterly4Day?: number;
  semiAnnual1Month?: number;
  semiAnnual1Day?: number;
  semiAnnual2Month?: number;
  semiAnnual2Day?: number;
  annualMoy?: number;
  annualDom?: number;
  period?: IPeriod;
}
