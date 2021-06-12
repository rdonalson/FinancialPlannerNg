/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ILedgerParams } from './shared/models/ledger-params';
import { DisplayService } from './shared/services/display/display.service';
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
  ledgerList: ILedgerVM[] = [];

  /** Chart data items */
  labels: string[] = [];
  rTotals: string[] = [];
  credits: string[] = [];
  debits: string[] = [];

  data: any;
  messages: { [key: string]: { [key: string]: string; }; };

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
  ) {
    // Criterial field messages.
    this.messages = {
      groupingTransform: { informational: 'Select if you want the output to be summarized by week, month & year' },
      timeFrameBegin: { informational: 'Select a Start Date.' },
      timeFrameEnd: { informational: 'Select an End Date.' },
    };
  }

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
      groupingTransform: true
    };
    this.createLedger(this.ledgerParams);
  }

  /**
   * A click event that generates a new Ledger dataset when the User click the "Generate" button
   */
   calculate(): void { this.createLedger(this.ledgerParams); }

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
        next: (data: ILedgerVM[]): void => {
          this.ledgerList = data;
          // console.log(`Display createLedger: ${JSON.stringify(this.ledgerList)}`);
          this.getChartData();
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }

  /**
   * Generates the Complete dataset for the Chart
   */
  getChartData(): void {
    this.activeIndex = 1; // Default tab -> Chart
    this.getLabels();
    this.getRunningTotals();
    this.getCredits();
    this.getDebits();
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Credits',
          data: this.credits,
          fill: true,
          borderColor: 'Green',
          backgroundColor: 'LightGreen'
        },
        {
          label: 'Debits',
          data: this.debits,
          fill: true,
          borderColor: 'Red',
          backgroundColor: 'rgba(255,99,132,0.2)'
        },
        {
          label: 'Running Total',
          data: this.rTotals,
          fill: false,
          borderDash: [5, 5],
          borderColor: '#FFA726'
        }
      ]
    };
  }

  /**
   * Parses the labels for the chart
   */
  getLabels(): void {
    this.labels = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      const date: Date = new Date(ledger.wDate.toString());
      const result = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      this.labels.push(result);
    });
  }

  /**
   * Parses the Running Totals
   */
  getRunningTotals(): void {
    this.rTotals = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.rTotals.push(ledger.runningTotal.toString());
    });
  }

  /**
   * Parses the Credits
   */
  getCredits(): void {
    this.credits = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.credits.push(ledger.creditSummary.toString());
    });
  }

  /**
   * Parses the Debits
   */
  getDebits(): void {
    this.debits = [];
    this.ledgerList.forEach((ledger: ILedgerVM) => {
      this.debits.push(ledger.debitSummary.toString());
    });
  }
}

