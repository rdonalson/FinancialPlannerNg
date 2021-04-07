import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { Credit } from '../../shared/models/credit';
import { UtilitiesService } from '../../shared/services/common/utilities.service';
import { CreditService } from '../../shared/services/credit/credit.service';

@Component({
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.scss']
})
export class CreditEditComponent implements OnInit {

  userId: string = '';
  credit!: Credit;

  constructor(
    private util: UtilitiesService,
    private err: GlobalErrorHandlerService,
    private creditService: CreditService
  ) { }

  ngOnInit(): void {
    this.initialize();
    // this.credit.amount = 500.23;
    // this.credit.name = 'Annual 1';
    // this.credit.fkPeriod = 9;
    // this.credit.annualMoy = 12;
    // this.credit.annualDom = 15;
    // this.saveCredit();
  }

  saveCredit(): void {
    if (this.credit.pkCredit === 0) {
      this.creditService.createCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.util.onSaveComplete(`Record Created`),
          error: catchError((err: any) => {
            this.util.onError(`Record Creation Failed`);
            return this.err.handleError(err);
          })
        });
    } else {
      // this.intialAmountService.updateInitialAmount(this.initialAmount)
      //   // tslint:disable-next-line: deprecation
      //   .subscribe({
      //     next: () => this.onSaveComplete(`Record Updated`),
      //     error: catchError((err: any) => {
      //       this.onError(`Record Update Failed`);
      //       return this.err.handleError(err);
      //     })
      //   });
    }
  }
  getCredit(id: number): any {
    return this.creditService.getCredit(id)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: Credit): void => {
          // this.Credit = data;
          // console.log(JSON.stringify(this.Credit));
          console.log(JSON.stringify(data));
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  private initialize(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;

    this.credit = {
      pkCredit: 0,
      userId: this.userId,
      name: '',
      amount: 0,
      fkPeriod: 1,
      dateRangeReq: false,
      beginDate: undefined,
      endDate: undefined,
      weeklyDow: undefined,
      everOtherWeekDow: undefined,
      biMonthlyDay1: undefined,
      biMonthlyDay2: undefined,
      monthlyDom: undefined,
      quarterly1Month: undefined,
      quarterly1Day: undefined,
      quarterly2Month: undefined,
      quarterly2Day: undefined,
      quarterly3Month: undefined,
      quarterly3Day: undefined,
      quarterly4Month: undefined,
      quarterly4Day: undefined,
      semiAnnual1Month: undefined,
      semiAnnual1Day: undefined,
      semiAnnual2Month: undefined,
      semiAnnual2Day: undefined,
      annualMoy: undefined,
      annualDom: undefined,
      period: undefined
    };
  }
}
