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
  private userId: string = '';
  private credit!: ICredit;
  private sub!: Subscription;
  private errorMessage!: string;
  // Use with the generic validation message class
  private displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  pageTitle: string = 'Edit Credit';
  periods!: IPeriod[];
  months!: IKeyValue[];
  daysInMonth!: IKeyValue[];
  weekDays!: IKeyValue[];
  creditForm!: FormGroup;
  periodSwitch: number | undefined;
  dateRangeToggle: boolean | undefined;

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

  //#region Events

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
      // Date Range
      DateRangeReq: [false],
      BeginDate: [''],
      EndDate: [''],
      // Weekly
      WeeklyDow: [''],
      // Every Two Weeks (Every other week)
      EverOtherWeekDow: [''],
      InitializationDate: [''],
      // Bi-Monthly (Twice a month)
      BiMonthlyDay1: [''],
      BiMonthlyDay2: [''],
      // Monthly
      MonthlyDom: [''],
      // Quarterly
      Quarterly1Month: [''],
      Quarterly1Day: [''],
      Quarterly2Month: [''],
      Quarterly2Day: [''],
      Quarterly3Month: [''],
      Quarterly3Day: [''],
      Quarterly4Month: [''],
      Quarterly4Day: [''],
      // Semi-Annual (Twice a year)
      SemiAnnual1Month: [''],
      SemiAnnual1Day: [''],
      SemiAnnual2Month: [''],
      SemiAnnual2Day: [''],
      // Annual
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

  /**
   * Runs last and gathers all the field changes
   */
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

  /**
   * Gets the user's Period Selection
   * @param {any} e The selected value from the Period Drowdown Selector in UI
   */
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.setPeriodFields(this.periodSwitch);
  }

  /**
   * Allows the user to select a Date Range
   * @param {any} e Checked: True/False show Date Range Calendar Selectors
   */
  showHideDateRange(e: any): void {
    this.dateRangeToggle = e.checked;
    this.updateDateRangeValidation(this.dateRangeToggle);
  }

  /**
   * Removes the "sub" observable for Prameter retrieval
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //#endregion Events

  //#region Utilities
  /**
   * Called on Form Init; gets users OID from Claims object in localstorage
   * Also initializes a new ICredit class
   */
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
   * Calls all of the update validation functions which turns validation on/off
   * for various field combination in the "creditForm" formbuild
   * based on user's Period selection
   * @param {number} period The Period Key Value
   */
  setPeriodFields(period?: number): void {
    this.updateWeeklyValidation(period);
    this.updateEveryTwoWeeksAndOneTimeValidation(period);
    this.updateBiMonthlyValidation(period);
    this.updateMonthlyValidation(period);
    this.updateQuarterlyValidation(period);
    this.updateSemiAnnualValidation(period);
    this.updateAnnualValidation(period);
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
      // Common Fields
      Name: this.credit.name,
      Amount: this.credit.amount,
      Period: this.credit.fkPeriod,
      // Date Range
      DateRangeReq: this.credit.dateRangeReq,
      BeginDate: (
        (this.credit.beginDate !== null && this.credit.beginDate !== undefined
          && (this.periodSwitch !== 4 && this.periodSwitch !== 1))
          ? formatDate(this.credit.beginDate, 'MM/dd/yyyy', 'en')
          : ''),
      EndDate: (this.credit.endDate !== null && this.credit.endDate !== undefined
        ? formatDate(this.credit.endDate, 'MM/dd/yyyy', 'en')
        : ''),
      // "InitializationDate" is used With "One Time Occurrence" and with
      // "Every Other Week", with the latter it is used in the place of "BeginDate"
      InitializationDate: (
        (this.credit.beginDate !== null && this.credit.beginDate !== undefined
          && (this.periodSwitch === 4 || this.periodSwitch === 1))
          ? formatDate(this.credit.beginDate, 'MM/dd/yyyy', 'en')
          : ''),

      // Weekly
      WeeklyDow: this.credit.weeklyDow,
      // Every Other Week (Every Two Weeks)
      EverOtherWeekDow: this.credit.everOtherWeekDow,
      // Bi-Monthly
      BiMonthlyDay1: this.credit.biMonthlyDay1,
      BiMonthlyDay2: this.credit.biMonthlyDay2,
      // Monthly
      MonthlyDom: this.credit.monthlyDom,
      // Quarterly
      Quarterly1Month: this.credit.quarterly1Month,
      Quarterly1Day: this.credit.quarterly1Day,
      Quarterly2Month: this.credit.quarterly2Month,
      Quarterly2Day: this.credit.quarterly2Day,
      Quarterly3Month: this.credit.quarterly3Month,
      Quarterly3Day: this.credit.quarterly3Day,
      Quarterly4Month: this.credit.quarterly4Month,
      Quarterly4Day: this.credit.quarterly4Day,
      // Semi-Annual
      SemiAnnual1Month: this.credit.semiAnnual1Month,
      SemiAnnual1Day: this.credit.semiAnnual1Day,
      SemiAnnual2Month: this.credit.semiAnnual2Month,
      SemiAnnual2Day: this.credit.semiAnnual2Day,
      // Annual
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
  //#endregion Utilities

  //#region Validation Helpers
  /**
   * Handles Validation for the "Weekly" Fields:
   *  "WeeklyDow" Weekday Radio Button Array, determines weekday of occurrence
   * @param {number} period The user's period selection
   */
  private updateWeeklyValidation(period?: number): void {
    if (period === 3) {
      this.creditForm.controls['WeeklyDow'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['WeeklyDow'].clearValidators();
      this.creditForm.controls['WeeklyDow'].setValue(null);
    }
    this.creditForm.controls['WeeklyDow'].updateValueAndValidity();
  }

  /**
   * Handles Validation for "Every Two Weeks" and "One Time Occurrence" Fields:
   * "Every Two Weeks" ->
   *    "InitializationDate" Calendar Selector, which represents the Period's first occurrence.
   *      Note: This value from this formbuild field reuses the "beginDate" field in credit (ICredit)
   *            Also if a "Date Range" selected for this period it doesn't need the "BeginDate" because that value is handled
   *            by "InitializationDate".  So part of the Date Range "EndDate" Validation is must be handled here.
   *    "EverOtherWeekDow" Weekday Radio Button Array determines the weekday of occurrence.
   * "One Time Occurrence" ->
   *    "InitializationDate" is required for this period's day of occurrence
   *      Note: There will never be a Date Range for this Period
   * @param {number} period The user's period selection
   */
  private updateEveryTwoWeeksAndOneTimeValidation(period?: number): void {
    if (period === 4 || period === 1) {
      this.creditForm.controls['InitializationDate'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['InitializationDate'].clearValidators();
      this.creditForm.controls['InitializationDate'].setValue(null);
    }
    this.creditForm.controls['InitializationDate'].updateValueAndValidity();

    if (period === 1) {
      this.creditForm.controls['DateRangeReq'].setValue(false);
      this.creditForm.controls['EndDate'].clearValidators();
      this.creditForm.controls['EndDate'].setValue(null);
    }

    if (period === 4) {
      this.creditForm.controls['EverOtherWeekDow'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['EverOtherWeekDow'].clearValidators();
      this.creditForm.controls['EverOtherWeekDow'].setValue(null);
    }
    this.creditForm.controls['EverOtherWeekDow'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Bi-Monthly" Fields:
   * "BiMonthlyDay1" Dropdown Selector with days in the month, 1-28, select the first day of occurrence in the month
   * "BiMonthlyDay2" Similar to first selector, intended for the second day of occurrence in the month
   * @param {number} period The user's period selection
   */
  private updateBiMonthlyValidation(period?: number): void {
    if (period === 5) {
      this.creditForm.controls['BiMonthlyDay1'].setValidators([Validators.required]);
      this.creditForm.controls['BiMonthlyDay2'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['BiMonthlyDay1'].clearValidators();
      this.creditForm.controls['BiMonthlyDay1'].setValue(null);
      this.creditForm.controls['BiMonthlyDay2'].clearValidators();
      this.creditForm.controls['BiMonthlyDay2'].setValue(null);
    }
    this.creditForm.controls['BiMonthlyDay1'].updateValueAndValidity();
    this.creditForm.controls['BiMonthlyDay2'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Monthly" Fields:
   * "MonthlyDom" Dropdown Selector with days in the month, 1-28, select the day of occurrence in the month
   * @param {number} period The user's period selection
   */
  private updateMonthlyValidation(period?: number): void {
    if (period === 6) {
      this.creditForm.controls['MonthlyDom'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['MonthlyDom'].clearValidators();
      this.creditForm.controls['MonthlyDom'].setValue(null);
    }
    this.creditForm.controls['MonthlyDom'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Quarterly" Fields:
   * "Quarterly[1-4]Month" Dropdown Selectors with months in the year, January-December, select the month of occurrence in the year
   * "Quarterly[1-4]Day" Dropdown Selectors with days in the month, 1-28, select the day of occurrence in the month
   * @param {number} period The user's period selection
   */
  private updateQuarterlyValidation(period?: number): void {
    if (period === 7) {
      // First Quarter
      this.creditForm.controls['Quarterly1Month'].setValidators([Validators.required]);
      this.creditForm.controls['Quarterly1Day'].setValidators([Validators.required]);
      // Second Quarter
      this.creditForm.controls['Quarterly2Month'].setValidators([Validators.required]);
      this.creditForm.controls['Quarterly2Day'].setValidators([Validators.required]);
      // Third Quarter
      this.creditForm.controls['Quarterly3Month'].setValidators([Validators.required]);
      this.creditForm.controls['Quarterly3Day'].setValidators([Validators.required]);
      // Fourth Quarter
      this.creditForm.controls['Quarterly4Month'].setValidators([Validators.required]);
      this.creditForm.controls['Quarterly4Day'].setValidators([Validators.required]);
    } else {
      // First Quarter
      this.creditForm.controls['Quarterly1Month'].clearValidators();
      this.creditForm.controls['Quarterly1Month'].setValue(null);
      this.creditForm.controls['Quarterly1Day'].clearValidators();
      this.creditForm.controls['Quarterly1Day'].setValue(null);
      // Second Quarter
      this.creditForm.controls['Quarterly2Month'].clearValidators();
      this.creditForm.controls['Quarterly2Month'].setValue(null);
      this.creditForm.controls['Quarterly2Day'].clearValidators();
      this.creditForm.controls['Quarterly2Day'].setValue(null);
      // Third Quarter
      this.creditForm.controls['Quarterly3Month'].clearValidators();
      this.creditForm.controls['Quarterly3Month'].setValue(null);
      this.creditForm.controls['Quarterly3Day'].clearValidators();
      this.creditForm.controls['Quarterly3Day'].setValue(null);
      // Fourth Quarter
      this.creditForm.controls['Quarterly4Month'].clearValidators();
      this.creditForm.controls['Quarterly4Month'].setValue(null);
      this.creditForm.controls['Quarterly4Day'].clearValidators();
      this.creditForm.controls['Quarterly4Day'].setValue(null);
    }
    // First Quarter
    this.creditForm.controls['Quarterly1Month'].updateValueAndValidity();
    this.creditForm.controls['Quarterly1Day'].updateValueAndValidity();
    // Second Quarter
    this.creditForm.controls['Quarterly2Month'].updateValueAndValidity();
    this.creditForm.controls['Quarterly2Day'].updateValueAndValidity();
    // Third Quarter
    this.creditForm.controls['Quarterly3Month'].updateValueAndValidity();
    this.creditForm.controls['Quarterly3Day'].updateValueAndValidity();
    // Fourth Quarter
    this.creditForm.controls['Quarterly4Month'].updateValueAndValidity();
    this.creditForm.controls['Quarterly4Day'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Semi-Annual" Fields:
   * "SemiAnnual[1-2]Month" Dropdown Selectors with months in the year, January-December, select the month of occurrence in the year
   * "SemiAnnual[1-2]Day" Dropdown Selectors with days in the month, 1-28, select the day of occurrence in the month
   * @param {number} period The user's period selection
   */
  private updateSemiAnnualValidation(period?: number): void {
    if (period === 8) {
      // First Annum
      this.creditForm.controls['SemiAnnual1Month'].setValidators([Validators.required]);
      this.creditForm.controls['SemiAnnual1Day'].setValidators([Validators.required]);
      // Second Annum
      this.creditForm.controls['SemiAnnual2Month'].setValidators([Validators.required]);
      this.creditForm.controls['SemiAnnual2Day'].setValidators([Validators.required]);
    } else {
      // First Annum
      this.creditForm.controls['SemiAnnual1Month'].clearValidators();
      this.creditForm.controls['SemiAnnual1Month'].setValue(null);
      this.creditForm.controls['SemiAnnual1Day'].clearValidators();
      this.creditForm.controls['SemiAnnual1Day'].setValue(null);
      // Second Annum
      this.creditForm.controls['SemiAnnual2Month'].clearValidators();
      this.creditForm.controls['SemiAnnual2Month'].setValue(null);
      this.creditForm.controls['SemiAnnual2Day'].clearValidators();
      this.creditForm.controls['SemiAnnual2Day'].setValue(null);
    }
    // First Annum
    this.creditForm.controls['SemiAnnual1Month'].updateValueAndValidity();
    this.creditForm.controls['SemiAnnual1Day'].updateValueAndValidity();
    // Second Annum
    this.creditForm.controls['SemiAnnual2Month'].updateValueAndValidity();
    this.creditForm.controls['SemiAnnual2Day'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Annual" Fields:
   * "AnnualMoy" Dropdown Selector with months in the year, January-December, select the month of occurrence in the year
   * "MonthlyDom" Dropdown Selector with days in the month, 1-28, select the day of occurrence in the month
   * @param {number} period The user's period selection
   */
  private updateAnnualValidation(period?: number): void {
    if (period === 9) {
      this.creditForm.controls['AnnualMoy'].setValidators([Validators.required]);
      this.creditForm.controls['AnnualDom'].setValidators([Validators.required]);
    } else {
      this.creditForm.controls['AnnualMoy'].clearValidators();
      this.creditForm.controls['AnnualMoy'].setValue(null);
      this.creditForm.controls['AnnualDom'].clearValidators();
      this.creditForm.controls['AnnualDom'].setValue(null);
    }
    this.creditForm.controls['AnnualMoy'].updateValueAndValidity();
    this.creditForm.controls['AnnualDom'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Annual" Fields:
   * "BeginDate" Calendar Selector, allows the user to set a Start Date for a particular Credit
   * "EndDate" Calendar Selector, allows the user to set a Stop Date for a particular Credit
   * @param {number} period The user's period selection
   */
  private updateDateRangeValidation(toggle?: boolean): void {
    if (toggle) {
      if (this.periodSwitch !== 4 && this.periodSwitch !== 1) {
        this.creditForm.controls['BeginDate'].setValidators([Validators.required]);
        this.creditForm.controls['EndDate'].setValidators([Validators.required]);
      } else {
        this.creditForm.controls['EndDate'].setValidators([Validators.required]);
      }
    } else {
      this.creditForm.controls['BeginDate'].clearValidators();
      this.creditForm.controls['BeginDate'].setValue(null);
      this.creditForm.controls['EndDate'].clearValidators();
      this.creditForm.controls['EndDate'].setValue(null);
    }
    this.creditForm.controls['BeginDate'].updateValueAndValidity();
    this.creditForm.controls['EndDate'].updateValueAndValidity();
  }
  //#endregion Validation Helpers

  //#region Data Functions
  //#region Reads
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
  //#endregion Reads
  //#region Writes
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
  //#endregion Writes
  //#endregion Data Functions
}
