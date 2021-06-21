/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';


import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwCredit } from '../../shared/models/vwcredit';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { CreditService } from '../../shared/services/credit/credit.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  pageTitle: string = 'Manage Credits';
  progressSpinner: boolean = false;

  creditList: IVwCredit[] = [];
  selectedCredits: IVwCredit[] = [];
  userId: string = '';

  /**
   * Base Constructor
   * @param {GeneralUtilService} generalUtilService
   * @param {MessageUtilService} messageUtilService
   * @param {GlobalErrorHandlerService} err
   * @param {ConfirmationService} confirmationService
   * @param {CreditService} creditService
   */
  constructor(
    private generalUtilService: GeneralUtilService,
    private messageUtilService: MessageUtilService,
    private route: ActivatedRoute,
    private router: Router,
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
   * Get the User's List of Credits
   * @param {string} userId User's OID
   * @returns {any}
   */
  getCredits(userId: string): any {
    this.progressSpinner = true;
    return this.creditService.getCredits(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: IVwCredit[]): void => {
          this.creditList = data;
          // console.log(JSON.stringify(this.creditList));
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
   * Delete a specific Credit
   * Prompt User before committing
   * @param {number} id The id of the Credit
   */
  deleteCredit(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('Credit not Found');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.progressSpinner = true;
          this.creditService.deleteCredit(id)
            .subscribe({
              next: () => this.messageUtilService.onComplete(`Credit Deleted`),
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Credit Delete Failed`);
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


