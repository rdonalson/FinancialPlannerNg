import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ICredit } from '../../shared/models/credit';
import { IKeyValue } from '../../shared/models/key-value';
import { IPeriod } from '../../shared/models/period';
import { ArrayUtilService } from '../../shared/services/common/array-util.service';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
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
  periods!: IPeriod[];
  months!: IKeyValue[];
  daysInMonth!: IKeyValue[];
  weekDays!: IKeyValue[];
  credit!: ICredit;
  creditForm!: FormGroup;
  dateRangeForm!: FormGroup;
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
   * @param {MessageUtilService} util
   * @param {ArrayUtilService} array
   * @param {GlobalErrorHandlerService} err
   * @param {CreditService} creditService
   * @param {PeriodService} periodService
   */
  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private util: MessageUtilService,
    array: ArrayUtilService,
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
      BeginDate: { required: 'Start Date is required.' },
      EndDate: { required: 'End Date is required.' },
      WeeklyDow: { required: 'Day of the Week is required.' },
      AnnualMoy: { required: 'Month of Occurence is required.' },
      AnnualDom: { required: 'Day within the Month of Occurence is required.' },

    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.months = array.Months;
    this.daysInMonth = array.DaysInTheMonth;
    this.weekDays = array.WeekDays;
  }

  periodSwitch: number | undefined;
  annualToggle: boolean | undefined;
  dateRangeToggle: boolean | undefined;

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
      DateRangeReq: [false],
      BeginDate: [''],
      EndDate: [''],

      WeeklyDow: [''],
      EverOtherWeekDow: [''],
      InitializationDate: [''],

      BiMonthlyDay1: [''],
      BiMonthlyDay2: [''],
      MonthlyDom: [''],

      Quarterly1Month: [''],
      Quarterly1Day: [''],
      Quarterly2Month: [''],
      Quarterly2Day: [''],
      Quarterly3Month: [''],
      Quarterly3Day: [''],
      Quarterly4Month: [''],
      Quarterly4Day: [''],

      SemiAnnual1Month: [''],
      SemiAnnual1Day: [''],
      SemiAnnual2Month: [''],
      SemiAnnual2Day: [''],

      AnnualMoy: [''],
      AnnualDom: [''],
    });
    // Read the product Id from the route parameter
    this.sub = this.route.params
      // tslint:disable-next-line: deprecation
      .subscribe((params: any) => {
        const id = +params.id;
        this.getCredit(id);
      });
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
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.setPeriodFields(this.periodSwitch);
  }
  setPeriodFields(period?: number): void {
    this.updateWeeklyValidation(period);
    this.updateEveryTwoWeeksAndOneTimeValidation(period);
    this.updateBiMonthlyValidation(period);
    this.updateMonthlyValidation(period);
    this.updateAnnualValidation(period);
  }
  private updateWeeklyValidation(period?: number): void {
    if (period === 3) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['WeeklyDow'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['WeeklyDow'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['WeeklyDow'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['WeeklyDow'].updateValueAndValidity();
  }

  private updateEveryTwoWeeksAndOneTimeValidation(period?: number): void {
    if (period === 4 || period === 1) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['InitializationDate'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['InitializationDate'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['InitializationDate'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['InitializationDate'].updateValueAndValidity();

    if (period === 1) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['DateRangeReq'].setValue(false);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EndDate'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EndDate'].setValue(null);
    }

    if (period === 4) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EverOtherWeekDow'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EverOtherWeekDow'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EverOtherWeekDow'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['EverOtherWeekDow'].updateValueAndValidity();
  }

  private updateBiMonthlyValidation(period?: number): void {
    if (period === 5) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay1'].setValidators([Validators.required]);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay2'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay1'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay1'].setValue(null);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay2'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BiMonthlyDay2'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['BiMonthlyDay1'].updateValueAndValidity();
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['BiMonthlyDay2'].updateValueAndValidity();  }

  private updateMonthlyValidation(period?: number): void {
    if (period === 6) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['MonthlyDom'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['MonthlyDom'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['MonthlyDom'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['MonthlyDom'].updateValueAndValidity();
  }

  private updateAnnualValidation(period?: number): void {
    if (period === 9) {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualMoy'].setValidators([Validators.required]);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualDom'].setValidators([Validators.required]);
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualMoy'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualMoy'].setValue(null);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualDom'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['AnnualDom'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['AnnualMoy'].updateValueAndValidity();
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['AnnualDom'].updateValueAndValidity();
  }

  showHideDateRange(e: any): void {
    this.dateRangeToggle = e.checked;
    this.updateDateRangeValidation(this.dateRangeToggle);
  }

  private updateDateRangeValidation(toggle?: boolean): void {
    if (toggle) {
      if (this.periodSwitch !== 4 && this.periodSwitch !== 1) {
        // tslint:disable-next-line: no-string-literal
        this.creditForm.controls['BeginDate'].setValidators([Validators.required]);
        // tslint:disable-next-line: no-string-literal
        this.creditForm.controls['EndDate'].setValidators([Validators.required]);
      } else {
        // tslint:disable-next-line: no-string-literal
        this.creditForm.controls['EndDate'].setValidators([Validators.required]);
      }
    } else {
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BeginDate'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['BeginDate'].setValue(null);
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EndDate'].clearValidators();
      // tslint:disable-next-line: no-string-literal
      this.creditForm.controls['EndDate'].setValue(null);
    }
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['BeginDate'].updateValueAndValidity();
    // tslint:disable-next-line: no-string-literal
    this.creditForm.controls['EndDate'].updateValueAndValidity();
  }

  /**
   * Get a specific Credit
   * @param {number} id The id of the Credit
   * @returns {any} result
   */
  getCredit(id: number): any {
    return this.creditService.getCredit(id)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: ICredit): void => {
          this.onCreditRetrieved(data);
          console.log(`Credit-Edit patchValue: ${JSON.stringify(this.creditForm.value)}`);
          console.log(`Credit-Edit getCredit: ${JSON.stringify(data)}`);
        },
        error: catchError((err: any) => this.err.handleError(err))
      });
  }

  /**
   * Populates the "creditForm" fields with the retrieved Credit record
   * Initializes varibles necessary for operation
   * @param {ICredit} credit The retrieved Credit record
   */
  onCreditRetrieved(credit: ICredit): void {
    if (this.creditForm) {
      this.creditForm.reset();
    }
    this.credit = credit;
    this.periodSwitch = this.credit.fkPeriod;
    this.dateRangeToggle = this.credit.dateRangeReq;
    // Update the data on the form
    this.creditForm.patchValue({
      Name: this.credit.name,
      Amount: this.credit.amount,
      Period: this.credit.fkPeriod,
      DateRangeReq: this.credit.dateRangeReq,
      BeginDate: (
        (this.credit.beginDate !== null && this.credit.beginDate !== undefined
        && (this.periodSwitch !== 4 && this.periodSwitch !== 1))
        ? formatDate(this.credit.beginDate, 'MM/dd/yyyy', 'en')
        : ''),
      EndDate: (this.credit.endDate !== null && this.credit.endDate !== undefined
        ? formatDate(this.credit.endDate, 'MM/dd/yyyy', 'en')
        : ''),
      WeeklyDow: this.credit.weeklyDow,
      EverOtherWeekDow: this.credit.everOtherWeekDow,
      InitializationDate: (
        (this.credit.beginDate !== null && this.credit.beginDate !== undefined
            && (this.periodSwitch === 4 || this.periodSwitch === 1))
        ? formatDate(this.credit.beginDate, 'MM/dd/yyyy', 'en')
        : ''),
      // InitializationDate: (
      //   (this.credit.beginDate !== null && this.credit.beginDate !== undefined)
      //   ? formatDate(this.credit.beginDate, 'MM/dd/yyyy', 'en')
      //   : ''),
      BiMonthlyDay1: this.credit.biMonthlyDay1,
      BiMonthlyDay2: this.credit.biMonthlyDay2,
      MonthlyDom: this.credit.monthlyDom,
      Quarterly1Month: this.credit.quarterly1Month,
      Quarterly1Day: this.credit.quarterly1Day,
      Quarterly2Month: this.credit.quarterly2Month,
      Quarterly2Day: this.credit.quarterly2Day,
      Quarterly3Month: this.credit.quarterly3Month,
      Quarterly3Day: this.credit.quarterly3Day,
      Quarterly4Month: this.credit.quarterly4Month,
      Quarterly4Day: this.credit.quarterly4Day,
      SemiAnnual1Month: this.credit.semiAnnual1Month,
      SemiAnnual1Day: this.credit.semiAnnual1Day,
      SemiAnnual2Month: this.credit.semiAnnual2Month,
      SemiAnnual2Day: this.credit.semiAnnual2Day,
      AnnualMoy: this.credit.annualMoy,
      AnnualDom: this.credit.annualDom,
    });
    this.setPeriodFields(this.periodSwitch);
  }

  /**
   * Updates the "credit" fields with the values from the "creditForm" fields
   * before being sent back to the APIs by "saveCredit" for updating the
   * database credit record
   */
  patchFormValuesBackToObject(): void {
    // Common Fields
    this.credit.name = this.creditForm.value.Name;
    this.credit.amount = this.creditForm.value.Amount;
    this.credit.fkPeriod = this.creditForm.value.Period;
    // Date Range Switch
    this.credit.dateRangeReq = this.creditForm.value.DateRangeReq;
    // Start Date for Date Range / Initialization Date for Periods: Single Occurrence & Every Two Weeks
    this.credit.beginDate = (
      this.creditForm.value.InitializationDate !== null && (this.periodSwitch === 4 || this.periodSwitch === 1)
        ? new Date(this.creditForm.value.InitializationDate)
        : (
            ((this.creditForm.value.BeginDate !== null)
              ? new Date(this.creditForm.value.BeginDate)
              : undefined)
        )
      );
    // End Date for Date Range
    this.credit.endDate = (this.creditForm.value.EndDate !== null) ? new Date(this.creditForm.value.EndDate) : undefined;
    // Every Two Weeks (Every Other Week)
    this.credit.weeklyDow = this.creditForm.value.WeeklyDow;
    this.credit.everOtherWeekDow = this.creditForm.value.EverOtherWeekDow;
    // Monthly
    this.credit.biMonthlyDay1 = this.creditForm.value.BiMonthlyDay1;
    this.credit.biMonthlyDay2 = this.creditForm.value.BiMonthlyDay2;
    // Monthly
    this.credit.monthlyDom = this.creditForm.value.MonthlyDom;
    // Quarterly
    this.credit.quarterly1Month = this.creditForm.value.Quarterly1Month;
    this.credit.quarterly1Day = this.creditForm.value.Quarterly1Day;
    this.credit.quarterly2Month = this.creditForm.value.Quarterly2Month;
    this.credit.quarterly2Day = this.creditForm.value.Quarterly2Day;
    this.credit.quarterly3Month = this.creditForm.value.Quarterly3Month;
    this.credit.quarterly3Day = this.creditForm.value.Quarterly3Day;
    this.credit.quarterly4Month = this.creditForm.value.Quarterly4Month;
    this.credit.quarterly4Day = this.creditForm.value.Quarterly4Day;
    // Semi-Annual
    this.credit.semiAnnual1Month = this.creditForm.value.SemiAnnual1Month;
    this.credit.semiAnnual1Day = this.creditForm.value.SemiAnnual1Day;
    this.credit.semiAnnual2Month = this.creditForm.value.SemiAnnual2Month;
    this.credit.semiAnnual2Day = this.creditForm.value.SemiAnnual2Day;
    // Annual
    this.credit.annualMoy = this.creditForm.value.AnnualMoy;
    this.credit.annualDom = this.creditForm.value.AnnualDom;
  }

  /**
   * Upserts the database credit record by either calling the
   * "createCredit" or "updateCredit" API calls based on
   * whether the primary key "pkCredit" is zero or not
   */
  saveCredit(): void {
    this.patchFormValuesBackToObject();
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

  /**
   * Delete specific credit record:
   * If it is a new entry then field values will be discarded
   * If it is an existing record then call a confirmation popup
   * and prompt user for yes/no.
   * If yes then delete record by calling the "deleteCredit" API.
   * If no then do nothing.
   */
  deleteCredit(): void {
    if (this.credit.pkCredit === 0) {
      // Don't delete, it was never saved.
      this.util.onSaveComplete('New Credit entries discarded');
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

  /**
   * Gets the complete list of Periods
   * @returns {any} result
   */
  getPeriods(): any {
    return this.periodService.getPeriods()
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: IPeriod[]): void => {
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

  /**
   * Removes the "sub" observable for Prameter retrieval
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
