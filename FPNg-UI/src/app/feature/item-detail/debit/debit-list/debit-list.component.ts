/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';


import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwDebit } from '../../shared/models/vwdebit';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { DebitService } from '../../shared/services/debit/debit.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.scss']
})
export class DebitListComponent implements OnInit {
  pageTitle = 'Manage Debits';
  debitList: IVwDebit[] = [];
  selectedDebits: IVwDebit[] = [];
  userId = '';

  /**
   * Base Constructor
   *
   * @param {GeneralUtilService} generalUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {ConfirmationService} confirmationService
   * @param {DebitService} debitService
   */
  constructor(
    private generalUtilService: GeneralUtilService,
    private messageUtilService: MessageUtilService,
    private route: ActivatedRoute,
    private router: Router,
    private err: GlobalErrorHandlerService,
    private confirmationService: ConfirmationService,
    private debitService: DebitService
  ) { }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.userId = this.generalUtilService.getUserOid();
    this.getDebits(this.userId);
  }

  //#region Data Functions
  //#region Reads
  /**
   * Get the User's List of Debits
   * @param {string} userId User's OID
   * @returns {any}
   */
  getDebits(userId: string): any {
    return this.debitService.getDebits(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: IVwDebit[]): void => {
          this.debitList = data;
          // console.log(JSON.stringify(this.debitList));
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          // console.log('getDebits complete');
        }
      });
  }
  //#endregion Reads
  //#region Writes
  /**
   * Delete a specific Debit
   * Prompt User before committing
   * @param {number} id The id of the Debit
   */
  deleteDebit(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('Debit not Found');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.debitService.deleteDebit(id)
          // tslint:disable-next-line: deprecation
          .subscribe({
          next: () => this.messageUtilService.onComplete(`Debit Deleted`),
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Debit Delete Failed`);
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


