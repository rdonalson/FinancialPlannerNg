import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { InitialAmount } from '../shared/models/initial-amount';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';
import { UtilitiesService } from '../shared/services/common/utilities.service';

/**
 * Class and Page that manage the initial starting amount that the User has in their
 * account.  This amount is used as the starting point for forcasted ledger calculations
 */
@Component({
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {
  pageTitle: string = 'Initial Amount';
  userId: string = '';
  initialAmount!: InitialAmount;

  /**
   * Base Constructor
   * @param {UtilitiesService} util A common utilities service
   * @param {GlobalErrorHandlerService} err Error Handler
   * @param {InitialAmountService} intialAmountService Initial Amount Service
   */
  constructor(
    private util: UtilitiesService,
    private err: GlobalErrorHandlerService,
    private intialAmountService: InitialAmountService
  ) { }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.initialize();
    this.getInitialAmount(this.userId);
  }

  /**
   * Gets the user's Initial Amount Record if there is one if not then
   * it calls the "saveInitialAmount" function which create a default one
   * with 0 amount.
   * @param {string} userId User's OID from Login
   * @returns {any} returns nothing unless there's an error
   */
  getInitialAmount(userId: string): any {
    return this.intialAmountService.getInitialAmount(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: InitialAmount): void => {
          if (!data) {
            this.saveInitialAmount();
          } else {
            this.initialAmount = data;
            // console.log(`Record Retrieved: ${JSON.stringify(this.initialAmount)}`);
          }
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  /**
   * This upsert function will look at whether an Initial Amount record exists and needs to
   * be updated or doesn't exist and needs to be created with a default amount of zero
   */
  saveInitialAmount(): void {
    if (this.initialAmount.pkInitialAmount === 0) {
      // Create a new record
      this.intialAmountService.createInitialAmount(this.initialAmount)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: (data: InitialAmount): void => {
            this.initialAmount = data;
            // console.log(`Record Created: ${JSON.stringify(this.initialAmount)}`);
            this.util.onSaveComplete('Default Record Created');
          },
          error: catchError((err: any) => {
            this.util.onError('Record Creation Failed');
            return this.err.handleError(err);
          })
        });
    } else {
      // Update the existing record
      this.intialAmountService.updateInitialAmount(this.initialAmount)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: (data: InitialAmount) => {
            this.initialAmount = data;
            // console.log(`Record Updated: ${JSON.stringify(this.initialAmount)}`);
          },
          error: catchError((err: any) => {
            this.util.onError('Record Update Failed');
            return this.err.handleError(err);
          }),
          complete: () => {
            this.util.onSaveComplete('Record Updated');
          }
        });
    }
  }

  /**
   * Prepares the form and "initialAmount" for use
   */
  private initialize(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;
    this.initialAmount = {
      pkInitialAmount: 0,
      userId: this.userId,
      amount: 0,
      beginDate: new Date()
    };
  }
}
