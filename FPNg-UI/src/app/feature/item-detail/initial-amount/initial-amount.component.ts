import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import * as delay from 'delay';

import { InitialAmount } from '../shared/models/initial-amount';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';

@Component({
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {
  pageTitle: string = 'Initial Amount';

  updateDisabled: boolean = false;

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
    beginDate: new Date()
  };

  ngOnInit(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;
    this.initialAmount.userId = this.userId;
    // this.initialAmount.beginDate = new Date(); // (new Date()).toLocaleDateString();
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
      this.intialAmountservice.createInitialAmount(this.initialAmount)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`Record Created`),
          error: catchError((err: any) => {
            this.onError(`Record Creation Failed`);
            return this.err.handleError(err);
          })
        });
    } else {
      this.intialAmountservice.updateInitialAmount(this.initialAmount)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`Record Updated`),
          error: catchError((err: any) => {
            this.onError(`Record Update Failed`);
            return this.err.handleError(err);
          })
        });
    }
  }

  onSaveComplete(message: string): void {
    this.messageService.add({ sticky: true, severity: 'success', summary: 'Success', detail: `${message}` });
    // Navigate back to the product list
    // this.router.navigate(['/destination']);
    this.timeOut(3000);
  }

  onError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${message}` });
    this.timeOut(3000);
  }

  private timeOut(seconds: number): void {
    setTimeout(() => {
      this.messageService.clear();
    }, seconds);
  }
}
