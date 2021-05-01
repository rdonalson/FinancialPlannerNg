/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { ICredit } from '../../shared/models/credit';
import { IKeyValue } from '../../shared/models/key-value';
import { IPeriod } from '../../shared/models/period';
import { ArrayUtilService } from '../../shared/services/common/array-util.service';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { CreditService } from '../../shared/services/credit/credit.service';
import { PeriodService } from '../../shared/services/period/period.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { ItemDetailCommonService } from '../../shared/services/common/item-detail-common.service';

@Component({
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.scss']
})
export class CreditEditComponent implements OnInit, OnDestroy {
  private userId = '';
  defaultPath = '../../';
  private credit!: ICredit;
  private sub!: Subscription;
  messages: { [key: string]: { [key: string]: string } };

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  pageTitle = 'Edit Credit';
  periods!: IPeriod[];
  months!: IKeyValue[];
  daysInMonth!: IKeyValue[];
  weekDays!: IKeyValue[];
  creditForm!: FormGroup;
  periodSwitch: number | undefined;
  dateRangeToggle: boolean | undefined;

  /**
   * Base Constructor
   * @param {GeneralUtilService} claimsUtilService
   * @param {ConfirmationService} confirmationService
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} route
   * @param {MessageUtilService} messageUtilService
   * @param {ArrayUtilService} array
   * @param {GlobalErrorHandlerService} err
   * @param {CreditService} creditService
   * @param {PeriodService} periodService
   */
  constructor(
    private claimsUtilService: GeneralUtilService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageUtilService: MessageUtilService,
    private itemDetailCommonService: ItemDetailCommonService,
    array: ArrayUtilService,
    private err: GlobalErrorHandlerService,
    private creditService: CreditService,
    private periodService: PeriodService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.messages = {
      // Common Fields
      Name: { required: 'Required:  Enter a descriptive Name' },
      Amount: { required: 'Required:  Enter an Amount' },
      Period: { required: 'Required:  Select a Period' },
      // Date Range
      DateRangeReq: { optional: 'Optional:  Only select if this Period is going to be for a limited period of time' },
      BeginDate: { required: 'Required:  Select a Start Date' },
      EndDate: { required: 'Required:  Select an End Date' },
      // Weekly & Every Other Week (Every Two Weeks)
      WeeklyDow: { required: 'Required:  Select a Day of the Week.' },
      // One time Occurrence & Every Other Week (Every Two Weeks)
      InitDateOTO: { required: 'Required:  Select the date of occurrence' },
      InitDateEOW: { required: 'Required:  Select a date on or before the day you want this Period to Start' },
      // Monthly & Bi-Monthly
      MonthlyDay: { required: 'Required:  Select the Day of occurrence' },
      BiMonthlyDay1: { required: 'Required:  Select the First Day of occurrence' },
      BiMonthlyDay2: { required: 'Required:  Select the Second Day of occurrence' },
      // Annual, Semi-Annual & Quarterly
      MonthOfOccurrence: { required: 'Required:  Select the Month of Occurence' },
      DayInMonthOfOccurrence: { required: 'Required:  Select the Day within that Month' }
    };
    this.months = array.Months;
    this.daysInMonth = array.DaysInTheMonth;
    this.weekDays = array.WeekDays;
  }

  //#region Events
  /**
   * Initialize the Credit Interface, gets the Period list and initizes the FormBuilder
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
   * Gets the user's Period Selection
   * @param {any} e The selected value from the Period Drowdown Selector in UI
   */
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.itemDetailCommonService.setPeriodFields(this.creditForm, this.periodSwitch);
  }

  /**
   * Allows the user to select a Date Range by showing the Date Range fields
   * @param {any} e Checked: True/False show Date Range Calendar Selectors
   */
  showHideDateRange(e: any): void {
    this.dateRangeToggle = e.checked;
    this.itemDetailCommonService.updateDateRangeValidation(
      this.creditForm,
      this.dateRangeToggle,
      this.periodSwitch
    );
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
    this.userId = this.claimsUtilService.getUserOid();
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
    this.itemDetailCommonService.setPeriodFields(this.creditForm, this.periodSwitch);
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
    this.credit.endDate = (this.creditForm.value.EndDate !== null)
      ? new Date(this.creditForm.value.EndDate)
      : undefined;
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
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }

  /**
   * Get a specific Credit
   * @param {number} id The id of the Credit
   * @returns {any} result
   */
  getCredit(id: number): any {
    if (id === 0) {
      return undefined;
    }
    return this.creditService.getCredit(id)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (data: ICredit): void => {
          this.onCreditRetrieved(data);
          // console.log(`Credit-Edit patchValue: ${JSON.stringify(this.creditForm.value)}`);
          // console.log(`Credit-Edit getCredit: ${JSON.stringify(data)}`);
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => { }
      });
  }
  //#endregion Reads
  //#region Writes
  /**
   * Upserts the database credit record by either calling the
   * "createCredit" or "updateCredit" API calls based on
   * whether the primary key "pkCredit" is zero or not
   */
  saveCredit(): any {
    if (this.creditForm.invalid) {
      Object.keys(this.creditForm.controls).forEach(key => {
        this.creditForm.controls[key].markAsDirty();
      });
      return null;
    }
    this.patchFormValuesBackToObject();
    if (this.credit.pkCredit === 0) {
      this.creditService.createCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Credit Creation Failed`);
            return this.err.handleError(err);
          }),
          complete: () => this.messageUtilService.onCompleteNav('Credit Created', this.defaultPath, this.route)
        });
    } else {
      this.creditService.updateCredit(this.credit)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Credit Update Failed`);
            return this.err.handleError(err);
          }),
          complete: () => this.messageUtilService.onCompleteNav('Credit Updated', this.defaultPath, this.route)
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
      this.messageUtilService.onComplete('New Credit entries discarded');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.creditService.deleteCredit(this.credit.pkCredit)
            // tslint:disable-next-line: deprecation
            .subscribe({
              next: () => { },
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Credit Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => this.messageUtilService.onCompleteNav('Credit Deleted', this.defaultPath, this.route)
            });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}
