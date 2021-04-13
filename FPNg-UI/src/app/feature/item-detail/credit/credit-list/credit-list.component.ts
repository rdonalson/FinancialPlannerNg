import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';


import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwCredit } from '../../shared/models/vwcredit';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { CreditService } from '../../shared/services/credit/credit.service';

@Component({
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  pageTitle: string = 'Manage Credits';
  creditList: IVwCredit[] = [];
  selectedCredits: IVwCredit[] = [];
  userId: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private util: MessageUtilService,
    private err: GlobalErrorHandlerService,
    private creditService: CreditService
  ) { }

  ngOnInit(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;
    this.getCredits(this.userId);
  }

  getCredits(userId: string): any {
    return this.creditService.getCredits(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: IVwCredit[]): void => {
          this.creditList = data;
          // console.log(JSON.stringify(this.creditList));
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  deleteCredit(id: number): void {
    if (id === 0) {
      // Don't delete, it was never saved.
      this.util.onSaveComplete('Credit not Found');
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
            this.util.onSaveComplete(`Credit Deleted`);
          },
          error: catchError((err: any) => {
            this.util.onError(`Credit Delete Failed`);
            return this.err.handleError(err);
          }),
          complete: () => location.reload()
          });
        }
      });
    }
  }
}


