/* eslint-disable @typescript-eslint/no-inferrable-types */
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

/**
 * The Debits List
 */
@Component({
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.scss']
})
export class DebitListComponent implements OnInit {
  pageTitle: string = 'Manage Debits';
  progressSpinner: boolean = false;
  debitList: IVwDebit[] = [];
  selectedDebits: IVwDebit[] = [];
  userId: string = '';

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
    this.progressSpinner = true;
    return this.debitService.getDebits(userId)
      .subscribe({
        next: (data: IVwDebit[]): void => {
          this.debitList = data;
          // console.log(JSON.stringify(this.debitList));
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
          this.progressSpinner = true;
          this.debitService.deleteDebit(id)
            .subscribe({
              next: () => this.messageUtilService.onComplete(`Debit Deleted`),
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Debit Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => {
                this.progressSpinner = false;
                location.reload();
              }
            });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}


