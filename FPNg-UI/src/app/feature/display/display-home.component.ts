/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ICredit } from '../item-detail/shared/models/credit';
import { MessageUtilService } from '../item-detail/shared/services/common/message-util.service';
import { ILedger } from './shared/models/ledger';
import { ILedgerParams } from './shared/models/ledger-params';
import { DisplayService } from './shared/services/display/display.service';

@Component({
  templateUrl: './display-home.component.html',
  styleUrls: ['./display-home.component.scss']
})
export class DisplayHomeComponent implements OnInit {
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
    private messageUtilService: MessageUtilService,
    private err: GlobalErrorHandlerService,
    private displayService: DisplayService,
  ) {

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.userId = this.claimsUtilService.getUserOid();

    this.ledgerParams =  {
      timeFrameBegin: new Date('2021-01-01'),
      timeFrameEnd: new Date('2021-12-31'),
      userId: this.userId,
      groupingTranform: 1
    };
    this.createLedger(this.ledgerParams);
  }

  createLedger(ledgerParams: ILedgerParams): any {

    return this.displayService.createLedger(ledgerParams)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: ILedger[]): void => {
          console.log(`Display createLedger: ${JSON.stringify(data)}`);
          this.ledger = data;
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  calculate(): void { }

}
