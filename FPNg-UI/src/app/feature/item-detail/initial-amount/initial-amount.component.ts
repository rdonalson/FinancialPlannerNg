import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import {InputNumberModule} from 'primeng/inputnumber';

import { InitialAmount } from '../shared/models/initial-amount';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';

@Component({
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {
  pageTitle: string = 'Initial Amount';

  constructor(
    private messageService: MessageService,
    private err: GlobalErrorHandlerService,
    private intialAmountservice: InitialAmountService
  ) { }

  userId: string = '';
  initialAmount: InitialAmount = {
    pkInitialAmount: 0,
    userId: '',
    amount: 0,
    beginDate: ''
  };
  initialAmount2: InitialAmount = {
    pkInitialAmount: 10,
    userId: '',
    amount: 400.34,
    beginDate: '2021-04-15'
  };

  ngOnInit(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;
    this.initialAmount2.userId = this.userId;
    this.getInitialAmount(this.userId);
  }

  getInitialAmount(userId: string): any {
    return this.intialAmountservice.getInitialAmount(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: InitialAmount): void => {
          this.initialAmount = data;
          console.log(JSON.stringify(this.initialAmount));
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  saveInitialAmount(): void {
    if (this.initialAmount.pkInitialAmount === 0) {
      this.intialAmountservice.createInitialAmount(this.initialAmount2)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`The new Initial Amount was saved`),
          error: catchError((err: any) => {
            this.onError(`The new Initial Amount was not saved`);
            return this.err.handleError(err);
          })
        });
    } else {
      this.intialAmountservice.updateInitialAmount(this.initialAmount)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`The updated Initial Amount was saved`),
          error: catchError((err: any) => {
            this.onError(`The updated Initial Amount was not saved`);
            return this.err.handleError(err);
          })
        });
    }
  }

  onSaveComplete(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
    // Navigate back to the product list
    // this.router.navigate(['/destination']);
  }

  onError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
  }
}
