/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IItemVM, ILedger, ILedgerVM } from '../common/models/ledger';
import { ILedgerParams } from '../common/models/ledger-params';
import { DisplayService } from '../common/services/display/display.service';

@Component({
  selector: 'app-data-transformation',
  templateUrl: './data-transformation.component.html',
  styleUrls: ['./data-transformation.component.scss']
})
export class DataTransformationComponent implements OnInit {

  ledgerItems: ILedgerVM[] = [];

  pageTitle = 'Display';
  private userId = '';
  activeIndex = 0;
  ledgerParams!: ILedgerParams;
  ledger!: ILedger[];

  /**
   * Base Constructor
   * @param {GeneralUtilService} claimsUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {DisplayService} displayService
   */
  constructor(
    private claimsUtilService: GeneralUtilService,
    private err: GlobalErrorHandlerService,
    private displayService: DisplayService,
  ) {}

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

  transformLedger(): void {
    let items: IItemVM[] = [];
    let cntr: number = 1;
    let IdHold: number = 0;

    this.ledger.forEach((ledger: ILedger) => {
      console.log(`Transform -> ledger: ${JSON.stringify(ledger)}`);
      if (IdHold !== ledger.rollupKey)
      {
        if (items.length > 0) {
          this.ledgerItems[IdHold - 1].items = items;
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
        this.ledgerItems.push(vm);
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
      this.ledgerItems[IdHold - 1].items = items;
      items = [];
    }
    console.log(`Transform -> ledgerItems: ${JSON.stringify(this.ledgerItems)}`);
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


}
