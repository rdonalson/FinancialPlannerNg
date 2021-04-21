/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';


import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwCredit } from '../../shared/models/vwcredit';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { CreditService } from '../../shared/services/credit/credit.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';

@Component({
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  pageTitle = 'Manage Credits';
  creditList: IVwCredit[] = [];
  selectedCredits: IVwCredit[] = [];
  userId = '';

  /**
   * Base Constructor
   *
   * @param {GeneralUtilService} generalUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {ConfirmationService} confirmationService
   * @param {CreditService} creditService
   */
  constructor(
    private generalUtilService: GeneralUtilService,
    private messageUtilService: MessageUtilService,
    private err: GlobalErrorHandlerService,
    private confirmationService: ConfirmationService,
    private creditService: CreditService
  ) { }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.userId = this.generalUtilService.getUserOid();
    this.getCredits(this.userId);
  }

  //#region Data Functions
  //#region Reads
  /**
   *
   * @param {string} userId User's OID
   * @returns {any}
   */
  getCredits(userId: string): any {
    return this.creditService.getCredits(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: IVwCredit[]): void => {
          this.creditList = data;
          // console.log(JSON.stringify(this.creditList));
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          // console.log('getCredits complete');
        }
      });
  }
  //#endregion Reads
  //#region Writes
  /**
   * Delete a specific Credit
   * Prompt User before committing
   * @param {number} id The id of the Credit
   */
  deleteCredit(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onSaveComplete('Credit not Found');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.creditService.deleteCredit(id)
          // tslint:disable-next-line: deprecation
          .subscribe({
          next: (data: any) => {
            console.log(`Credit-Edit deleteCredit: ${JSON.stringify(data)}`);
            this.messageUtilService.onSaveComplete(`Credit Deleted`);
          },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Credit Delete Failed`);
            return this.err.handleError(err);
          }),
          complete: () => location.reload()
          });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}


