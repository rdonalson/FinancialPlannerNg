import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { Credit } from '../../shared/models/credit';
import { Period } from '../../shared/models/period';
import { UtilitiesService } from '../../shared/services/common/utilities.service';
import { CreditService } from '../../shared/services/credit/credit.service';
import { PeriodService } from '../../shared/services/period/period.service';

@Component({
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.scss']
})
export class CreditEditComponent implements OnInit {

  userId: string = '';
  periods!: Period[];
  credit!: Credit;
  creditForm!: FormGroup;
  private sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private util: UtilitiesService,
    private err: GlobalErrorHandlerService,
    private creditService: CreditService,
    private periodService: PeriodService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.getPeriods();
    this.creditForm = this.formBuilder.group({

    });
    // Read the product Id from the route parameter
    // tslint:disable-next-line: deprecation
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params.id;
        this.getCredit(id);
      }
    );
  }

  getCredit(id: number): any {
    return this.creditService.getCredit(id)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: Credit): void => {
          this.credit = data;
          console.log(`Credit Edit getCredit: ${JSON.stringify(this.credit)}`);
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  saveCredit(): void {
    if (this.credit.pkCredit === 0) {
      this.creditService.createCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => {
            console.log(`Credit Edit saveCredit/createCredit: ${JSON.stringify(this.credit)}`);
            this.util.onSaveComplete(`Record Created`);
          },
          error: catchError((err: any) => {
            this.util.onError(`Record Creation Failed`);
            return this.err.handleError(err);
          })
        });
    } else {
      this.creditService.updateCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.util.onSaveComplete(`Record Updated`),
          error: catchError((err: any) => {
            this.util.onError(`Record Update Failed`);
            return this.err.handleError(err);
          })
        });
    }
  }

  getPeriods(): any {
    return this.periodService.getPeriods()
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: Period[]): void => {
          this.periods = data;
          console.log(`Credit Edit getPriods: ${JSON.stringify(this.periods)}`);
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
