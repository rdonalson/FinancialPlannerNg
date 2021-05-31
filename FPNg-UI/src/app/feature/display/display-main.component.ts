/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
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
   * @param {GlobalErrorHandlerService} err
   * @param {DisplayService} displayService
   */
  constructor(
    private claimsUtilService: GeneralUtilService,
    private err: GlobalErrorHandlerService,
    private displayService: DisplayService,
  ) { }

  /**
   * Initialize the page
   */
  ngOnInit(): void {
    this.userId = this.claimsUtilService.getUserOid();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    this.ledgerParams = {
      timeFrameBegin: startDate,
      timeFrameEnd: endDate,
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


  /**
   * Transform the Base Ledger dataset which consists of linear data where there the single day
   * values repeat for Debit and Credit data into the LedgerList.
   * In the LedgerList The Day values are distinct and the Debit and Credit items are grouped
   * into an items array for that day.
   */
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

  /**
   * A click event that generates a new Ledger dataset when the User click the "Generate" button
   */
  calculate(): void { this.createLedger(this.ledgerParams); }


}
