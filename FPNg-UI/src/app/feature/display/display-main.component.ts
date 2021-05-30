/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { MessageUtilService } from '../item-detail/shared/services/common/message-util.service';
import { ILedger } from './shared/models/ledger';
import { ILedgerParams } from './shared/models/ledger-params';
import { DisplayService } from './shared/services/display/display.service';
import { IItemVM } from './shared/view-models/item-vm';
import { ILedgerVM } from './shared/view-models/ledger-vm';

@Component({
  templateUrl: './display-main.component.html',
  styleUrls: ['./display-main.component.scss']
})
export class DisplayMainComponent implements OnInit {
  pageTitle = 'Display';
  private userId = '';
  activeIndex = 0;
  ledgerParams!: ILedgerParams;
  ledger: ILedger[] = [];
  ledgerList: ILedgerVM[] = [];


  /**
   * Base Constructor
   * @param {GeneralUtilService} claimsUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {DisplayService} displayService
   */
  constructor(
    private claimsUtilService: GeneralUtilService,
    private messageUtilService: MessageUtilService,
    private err: GlobalErrorHandlerService,
    private displayService: DisplayService,
  ) { }

  /**
   * Initialize the page
   */
  ngOnInit(): void {
    this.userId = this.claimsUtilService.getUserOid();
    this.ledgerParams = {
      timeFrameBegin: new Date('2021-01-01'),
      timeFrameEnd: new Date('2021-12-31'),
      userId: this.userId,
      groupingTranform: 0
    };
    this.createLedger(this.ledgerParams);
  }

  /**
   * Calls the "Display" service which calls the "Create Ledger Readout" procedure that
   * generates the Ledger Output.
   * That output contains a forecasted Cronological list of credit/debit transactions with a running total
   * out to a future point in time.
   * The timeframe is set by the user
   * @param {ILedgerParams} ledgerParams A model that contains the variables for procedure call
   * @returns {any} result
   */
  createLedger(ledgerParams: ILedgerParams): any {
    return this.displayService.createLedger(ledgerParams)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: ILedger[]): void => {
          this.ledger = data;
          // console.log(`Display createLedger: ${JSON.stringify(this.ledger)}`);
          this.transformLedger();
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }


  transformLedger(): void {
    let items: IItemVM[] = [];
    let cntr: number = 1;
    let IdHold: number = 0;

    this.ledger.forEach((ledger: ILedger) => {
      // console.log(`Transform -> ledger: ${JSON.stringify(ledger)}`);
      if (IdHold !== ledger.rollupKey)
      {
        if (items.length > 0) {
          this.ledgerList[IdHold - 1].items = items;
          items = [];
        }
        const vm: ILedgerVM = {
          rollupKey: ledger.rollupKey,
          year: ledger.year,
          wDate: ledger.wDate,
          creditSummary: ledger.creditSummary,
          debitSummary: ledger.debitSummary,
          net: ledger.net,
          runningTotal: ledger.runningTotal,
          itemCount: 0,
          items: []
        };
        this.ledgerList.push(vm);
      }
      if (ledger.periodName !== '-') {
        if (IdHold !== ledger.rollupKey) { cntr = 1; }
        const itm: IItemVM = {
          itemKey: cntr,
          occurrenceDate: ledger.occurrenceDate,
          itemType: ledger.itemType,
          periodName: ledger.periodName,
          name: ledger.name,
          amount: ledger.amount
        };
        items.push(itm);
        cntr++;
      } else {
        cntr = 1;
      }
      IdHold = ledger.rollupKey;
    });
    if (items) {
      this.ledgerList[IdHold - 1].items = items;
      items = [];
    }
    // console.log(`Transform -> ledgerItems: ${JSON.stringify(this.ledgerList)}`);
  }


  calculate(): void { this.createLedger(this.ledgerParams); }


}
