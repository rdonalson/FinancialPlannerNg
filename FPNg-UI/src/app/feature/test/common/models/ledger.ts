export interface ILedgerVM {
  rollupKey: number;
  year?: number;
  wDate?: Date;
  creditSummary?: number;
  debitSummary?: number;
  net?: number;
  runningTotal?: number;
  itemCount?: number;
  items?: IItemVM[];
}
export interface IItemVM {
  itemKey: number;
  occurrenceDate?: Date;
  itemType?: number;
  periodName?: string;
  name?: string;
  amount?: number;
}

export interface ILedger {
  rollupKey: number;
  year?: number;
  wDate?: Date;
  creditSummary?: number;
  debitSummary?: number;
  net?: number;
  runningTotal?: number;
  occurrenceDate?: Date;
  itemType?: number;
  periodName?: string;
  name?: string;
  amount?: number;
}

