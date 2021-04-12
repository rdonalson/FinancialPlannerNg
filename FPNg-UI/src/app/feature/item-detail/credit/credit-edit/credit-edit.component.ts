import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ICredit } from '../../shared/models/credit';
import { Period } from '../../shared/models/period';
import { UtilitiesService } from '../../shared/services/common/utilities.service';
import { CreditService } from '../../shared/services/credit/credit.service';
import { PeriodService } from '../../shared/services/period/period.service';
import { GenericValidator } from '../../shared/validators/generic-validator';

@Component({
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.scss']
})
export class CreditEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  pageTitle: string = 'Edit Credit';
  userId: string = '';
  periods: Period[] = [];
  credit!: ICredit;
  creditForm!: FormGroup;
  private sub!: Subscription;
  errorMessage!: string;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  /**
   * Base Constructor
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {UtilitiesService} util
   * @param {GlobalErrorHandlerService} err
   * @param {CreditService} creditService
   * @param {PeriodService} periodService
   */
  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilitiesService,
    private err: GlobalErrorHandlerService,
    private creditService: CreditService,
    private periodService: PeriodService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      Name: { required: 'Credit Name is required.' },
      Amount: { required: 'Amount is required.' },
      Period: { required: 'Period is required.' },
      AnnualMOY: { required: 'Month of Occurence is required.' },
      AnnualDOM: { required: 'Day within the Month of Occurence is required.' }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  /**
   * Initialize the form
   */
  ngOnInit(): void {
    this.initialize();
    this.getPeriods();
    this.creditForm = this.fb.group({
      Name: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      Period: ['', [Validators.required]],
      AnnualMOY: ['', [Validators.required]],
      AnnualDOM: ['', [Validators.required]],
      DateRangeReq: ['']
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

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.creditForm.valueChanges, ...controlBlurs).pipe(debounceTime(800))
      // tslint:disable-next-line: deprecation
      .subscribe((value: any) => {
        this.displayMessage = this.genericValidator.processMessages(this.creditForm);
      });
  }

  getCredit(id: number): any {
    return this.creditService.getCredit(id)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: ICredit): void => {
          this.onCreditRetrieved(data);
          // console.log(`Credit-Edit getCredit: ${JSON.stringify(data)}`);
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  onCreditRetrieved(credit: ICredit): void {
    if (this.creditForm) {
      this.creditForm.reset();
    }
    this.credit = credit;

    // Update the data on the form
    this.creditForm.patchValue({
      Name: this.credit.name,
      Amount: this.credit.amount,
      Period: this.credit.fkPeriod,
      AnnualMOY: this.credit.annualMoy,
      AnnualDOM: this.credit.annualDom,
      DateRangeReq: this.credit.dateRangeReq
    });
  }

  patchFormValuesBackToObject(periodId: number): void {
    switch (periodId) {
      case 1: {
        break;
      }
      case 9: {
        this.credit.name = this.creditForm.value.Name;
        this.credit.amount = this.creditForm.value.Amount;
        this.credit.fkPeriod = this.creditForm.value.Period;
        this.credit.annualMoy = this.creditForm.value.AnnualMOY;
        this.credit.annualDom = this.creditForm.value.AnnualDOM;
        this.credit.dateRangeReq = this.creditForm.value.DateRangeReq;
        break;
      }
      default: {
        break;
      }
    }
  }
  saveCredit(): void {
    // const p: ICredit = { ...this.credit, ...this.creditForm.value };
    this.patchFormValuesBackToObject(9);
    if (this.credit.pkCredit === 0) {
      this.creditService.createCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => {
            console.log(`Credit-Edit saveCredit/createCredit: ${JSON.stringify(this.credit)}`);
            this.util.onSaveComplete(`Credit Created`);
          },
          error: catchError((err: any) => {
            this.util.onError(`Credit Creation Failed`);
            return this.err.handleError(err);
          }),
          complete: () => this.router.navigate(['../../'], { relativeTo: this.route })
        });
    } else {
      this.creditService.updateCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: (data: any) => {
            console.log(`Credit-Edit updateCredit: ${JSON.stringify(data)}`);
            this.util.onSaveComplete(`Credit Updated`);
          },
          error: catchError((err: any) => {
            this.util.onError(`Credit Update Failed`);
            return this.err.handleError(err);
          }),
          complete: () => this.router.navigate(['../../'], { relativeTo: this.route })
        });
    }
  }

  deleteCredit(): void {
    if (this.credit.pkCredit === 0) {
      // Don't delete, it was never saved.
      this.util.onSaveComplete('Cannot Delete Credit not Saved');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.creditService.deleteCredit(this.credit.pkCredit)
            // tslint:disable-next-line: deprecation
            .subscribe({
              next: (data: any) => {
                console.log(`Credit-Edit deleteCredit: ${JSON.stringify(data)}`);
              },
              error: catchError((err: any) => {
                this.util.onError(`Credit Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => this.router.navigate(['../../'], { relativeTo: this.route })
            });
        }
      });
    }
  }

  getPeriods(): any {
    return this.periodService.getPeriods()
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: Period[]): void => {
          this.periods = data;
          // console.log(`Credit-Edit getPriods: ${JSON.stringify(this.periods)}`);
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
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
