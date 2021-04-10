import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ICredit } from '../../shared/models/credit';
import { VwCredit } from '../../shared/models/vwcredit';
import { CreditService } from '../../shared/services/credit/credit.service';

@Component({
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  pageTitle: string = 'Manage Credits';
  creditList: VwCredit[] = [];
  selectedCredits: VwCredit[] = [];
  userId: string = '';

  constructor(
    private messageService: MessageService,
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
        next: (data: VwCredit[]): void => {
          this.creditList = data;
          // console.log(JSON.stringify(this.creditList));
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }



}
