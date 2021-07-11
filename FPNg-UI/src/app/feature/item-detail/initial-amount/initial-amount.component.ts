/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { IInitialAmount } from '../shared/models/initial-amount';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';
import { MessageUtilService } from '../shared/services/common/message-util.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';

/**
 * Class and Page that manage the initial starting amount that the User has in their
 * account.  This amount is used as the starting point for forcasted ledger calculations
 * If the user doesn't add a value then it is defaulted to Zero.
 * There is only one entry and no deletions
 * One entered only updating is possible.
 */
@Component({
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {
  pageTitle: string = 'Initial Amount';
  progressSpinner: boolean = false;
  userId: string = '';
  initialAmount!: IInitialAmount;

  /**
   * Base Constructor
   * @param {GeneralUtilService} generalUtilService A common utilities service
   * @param {MessageUtilService} messageUtilService A common utilities service
   * @param {GlobalErrorHandlerService} err Error Handler
   * @param {InitialAmountService} intialAmountService Initial Amount Service
   */
  constructor(
    private generalUtilService: GeneralUtilService,
    private messageUtilService: MessageUtilService,
    private err: GlobalErrorHandlerService,
    private intialAmountService: InitialAmountService
  ) { }

  //#region Events
  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.initialize();
    this.getInitialAmount(this.userId);
  }
  //#endregion Events

  //#region Data Functions
  //#region Reads
  /**
   * Gets the user's Initial Amount Record if there is one if not then
   * it calls the "saveInitialAmount" function which create a default one
   * with 0 amount.
   * @param {string} userId User's OID from Login
   * @returns {any} returns nothing unless there's an error
   */
  getInitialAmount(userId: string): any {
    this.progressSpinner = true;
    return this.intialAmountService.getInitialAmount(userId)
      .subscribe({
        next: (data: IInitialAmount): void => {
          if (!data) {
            this.saveInitialAmount();
          } else {
            this.initialAmount = data;
            // console.log(`Record Retrieved: ${JSON.stringify(this.initialAmount)}`);
          }
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
        }
      });
  }
  //#endregion Reads
  //#region Writes
  /**
   * This upsert function will look at whether an Initial Amount record exists and needs to
   * be updated or doesn't exist and needs to be created with a default amount of zero
   */
  saveInitialAmount(): void {
    this.progressSpinner = true;
    if (this.initialAmount.pkInitialAmount === 0) {
      // Create a new record
      this.intialAmountService.createInitialAmount(this.initialAmount)
        .subscribe({
          next: (data: IInitialAmount): void => {
            this.initialAmount = data;
            // console.log(`Record Created: ${JSON.stringify(this.initialAmount)}`);
          },
          error: catchError((err: any) => {
            this.messageUtilService.onError('Record Creation Failed');
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onComplete('Default Initial Amount Created');
          }
        });
    } else {
      // Update the existing record
      this.intialAmountService.updateInitialAmount(this.initialAmount)
        .subscribe({
          next: (data: IInitialAmount) => {
            this.initialAmount = data;
            // console.log(`Record Updated: ${JSON.stringify(this.initialAmount)}`);
          },
          error: catchError((err: any) => {
            this.messageUtilService.onError('Record Update Failed');
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onComplete('Initial Amount Updated');
          }
        });
    }
  }
  //#endregion Writes
  //#endregion Data Functions

  //#region Utils
  /**
   * Prepares the form and "initialAmount" for use
   */
  private initialize(): void {
    this.userId = this.generalUtilService.getUserOid();
    this.initialAmount = {
      pkInitialAmount: 0,
      userId: this.userId,
      amount: 0,
      beginDate: new Date()
    };
  }
  //#endregion Utils
}
