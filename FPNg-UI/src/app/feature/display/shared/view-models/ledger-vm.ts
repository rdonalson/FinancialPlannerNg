import { IItemVM } from './item-vm';

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
