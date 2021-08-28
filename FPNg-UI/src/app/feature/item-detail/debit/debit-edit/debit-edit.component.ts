/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IDebit } from '../../shared/models/debit';
import { IKeyValue } from '../../shared/models/key-value';
import { IPeriod } from '../../shared/models/period';
import { ArrayUtilService } from '../../shared/services/common/array-util.service';
import { MessageUtilService } from '../../shared/services/common/message-util.service';
import { DebitService } from '../../shared/services/debit/debit.service';
import { PeriodService } from '../../shared/services/period/period.service';
import { GeneralUtilService } from 'src/app/core/services/common/general-util.service';
import { ItemDetailCommonService } from '../../shared/services/common/item-detail-common.service';

@Component({
  templateUrl: './debit-edit.component.html',
  styleUrls: ['./debit-edit.component.scss']
})
export class DebitEditComponent implements OnInit, OnDestroy {
  private debit!: IDebit;
  private sub!: Subscription;
  private userId: string = '';
  recordId!: number;
  pageTitle: string = 'Edit Debit';
  defaultPath: string = '../../';
  progressSpinner: boolean = false;
  messages: { [key: string]: { [key: string]: string; }; };
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  periods!: IPeriod[];
  months!: IKeyValue[];
  daysInMonth!: IKeyValue[];
  weekDays!: IKeyValue[];
  debitForm!: FormGroup;
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
   * @param {DebitService} debitService
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
    private debitService: DebitService,
    private periodService: PeriodService
  ) {
    this.messages = this.itemDetailCommonService.Messages;
    this.months = array.Months;
    this.daysInMonth = array.DaysInTheMonth;
    this.weekDays = array.WeekDays;
  }

  //#region Events
  /**
   * Initialize the Debit Interface, gets the Period list and initizes the FormBuilder
   */
  ngOnInit(): void {
    this.initializeRecord();
    this.getPeriods();
    this.debitForm = this.itemDetailCommonService.generateForm(this.fb);
    this.getRouteParams();
  }

  /**
   * Get Primary Key from Route Paramters
   */
  private getRouteParams(): void {
    this.sub = this.route.params
      .subscribe((params: any) => {
        this.recordId = +params.id;
        this.setTitleText();
        this.getDebit(this.recordId);
      });
  }

  /**
   * Gets the user's Period Selection
   * @param {any} e The selected value from the Period Drowdown Selector in UI
   */
  getPeriod(e: any): void {
    this.periodSwitch = e.value;
    this.itemDetailCommonService.setPeriodFields(this.debitForm, this.periodSwitch);
  }

  /**
   * Allows the user to select a Date Range by showing the Date Range fields
   * @param {any} e Checked: True/False show Date Range Calendar Selectors
   */
  showHideDateRange(e: any): void {
    this.dateRangeToggle = e.checked;
    this.itemDetailCommonService.updateDateRangeValidation(
      this.debitForm,
      this.dateRangeToggle,
      this.periodSwitch
    );
  }

  /**
   * Add New Record
   */
  addNew(): void {
    this.initializeRecord();
    this.onDebitRetrieved(this.debit);
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
   * Sets the page title value
   */
  private setTitleText(): void {
    if (this.recordId === 0) {
      this.pageTitle = 'New Debit';
    } else {
      this.pageTitle = 'Edit Debit';
    }
  }
  /**
   * Called on Form Init; gets users OID from Claims object in localstorage
   * Also initializes a new IDebit class
   */
  private initializeRecord(): void {
    this.recordId = 0;
    this.setTitleText();
    this.userId = this.claimsUtilService.getUserOid();
    this.debit = {
      pkDebit: this.recordId,
      userId: this.userId,
      name: '',
      amount: 0,
      fkPeriod: 0,
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
   * Populates the "debitForm" fields with the retrieved Debit record
   * Initializes varibles necessary for operation
   * @param {IDebit} debit The retrieved Debit record
   */
  onDebitRetrieved(debit: IDebit): void {
    if (this.debitForm) {
      this.debitForm.reset();
    }
    this.debit = debit;
    this.periodSwitch = this.debit.fkPeriod;
    this.dateRangeToggle = this.debit.dateRangeReq;
    // Update the data on the form
    this.debitForm.patchValue({
      // Common Fields
      Name: this.debit.name,
      Amount: this.debit.amount,
      Period: this.debit.fkPeriod,
      // Date Range
      DateRangeReq: this.debit.dateRangeReq,
      BeginDate: (
        (this.debit.beginDate !== null && this.debit.beginDate !== undefined
          && (this.periodSwitch !== 4 && this.periodSwitch !== 1))
          ? formatDate(this.debit.beginDate, 'MM/dd/yyyy', 'en')
          : ''),
      EndDate: (this.debit.endDate !== null && this.debit.endDate !== undefined
        ? formatDate(this.debit.endDate, 'MM/dd/yyyy', 'en')
        : ''),
      // "InitializationDate" is used With "One Time Occurrence" and with
      // "Every Other Week", with the latter it is used in the place of "BeginDate"
      InitializationDate: (
        (this.debit.beginDate !== null && this.debit.beginDate !== undefined
          && (this.periodSwitch === 4 || this.periodSwitch === 1))
          ? formatDate(this.debit.beginDate, 'MM/dd/yyyy', 'en')
          : ''),

      // Weekly
      WeeklyDow: this.debit.weeklyDow,
      // Every Other Week (Every Two Weeks)
      EverOtherWeekDow: this.debit.everOtherWeekDow,
      // Bi-Monthly
      BiMonthlyDay1: this.debit.biMonthlyDay1,
      BiMonthlyDay2: this.debit.biMonthlyDay2,
      // Monthly
      MonthlyDom: this.debit.monthlyDom,
      // Quarterly
      Quarterly1Month: this.debit.quarterly1Month,
      Quarterly1Day: this.debit.quarterly1Day,
      Quarterly2Month: this.debit.quarterly2Month,
      Quarterly2Day: this.debit.quarterly2Day,
      Quarterly3Month: this.debit.quarterly3Month,
      Quarterly3Day: this.debit.quarterly3Day,
      Quarterly4Month: this.debit.quarterly4Month,
      Quarterly4Day: this.debit.quarterly4Day,
      // Semi-Annual
      SemiAnnual1Month: this.debit.semiAnnual1Month,
      SemiAnnual1Day: this.debit.semiAnnual1Day,
      SemiAnnual2Month: this.debit.semiAnnual2Month,
      SemiAnnual2Day: this.debit.semiAnnual2Day,
      // Annual
      AnnualMoy: this.debit.annualMoy,
      AnnualDom: this.debit.annualDom,
    });
    this.itemDetailCommonService.setPeriodFields(this.debitForm, this.periodSwitch);
  }

  /**
   * Updates the "debit" fields with the values from the "debitForm" fields
   * before being sent back to the APIs by "saveDebit" for updating the
   * database debit record
   */
  patchFormValuesBackToObject(): void {
    // Common Fields
    this.debit.name = this.debitForm.value.Name;
    this.debit.amount = this.debitForm.value.Amount;
    this.debit.fkPeriod = this.debitForm.value.Period;
    // Date Range Switch
    this.debit.dateRangeReq = this.debitForm.value.DateRangeReq;
    // Start Date for Date Range / Initialization Date for Periods: Single Occurrence & Every Two Weeks
    this.debit.beginDate = (
      this.debitForm.value.InitializationDate !== null && (this.periodSwitch === 4 || this.periodSwitch === 1)
        ? new Date(this.debitForm.value.InitializationDate)
        : (
          ((this.debitForm.value.BeginDate !== null)
            ? new Date(this.debitForm.value.BeginDate)
            : undefined)
        )
    );
    // End Date for Date Range
    this.debit.endDate = (this.debitForm.value.EndDate !== null)
      ? new Date(this.debitForm.value.EndDate)
      : undefined;
    // Every Two Weeks (Every Other Week)
    this.debit.weeklyDow = this.debitForm.value.WeeklyDow;
    this.debit.everOtherWeekDow = this.debitForm.value.EverOtherWeekDow;
    // Monthly
    this.debit.biMonthlyDay1 = this.debitForm.value.BiMonthlyDay1;
    this.debit.biMonthlyDay2 = this.debitForm.value.BiMonthlyDay2;
    // Monthly
    this.debit.monthlyDom = this.debitForm.value.MonthlyDom;
    // Quarterly
    this.debit.quarterly1Month = this.debitForm.value.Quarterly1Month;
    this.debit.quarterly1Day = this.debitForm.value.Quarterly1Day;
    this.debit.quarterly2Month = this.debitForm.value.Quarterly2Month;
    this.debit.quarterly2Day = this.debitForm.value.Quarterly2Day;
    this.debit.quarterly3Month = this.debitForm.value.Quarterly3Month;
    this.debit.quarterly3Day = this.debitForm.value.Quarterly3Day;
    this.debit.quarterly4Month = this.debitForm.value.Quarterly4Month;
    this.debit.quarterly4Day = this.debitForm.value.Quarterly4Day;
    // Semi-Annual
    this.debit.semiAnnual1Month = this.debitForm.value.SemiAnnual1Month;
    this.debit.semiAnnual1Day = this.debitForm.value.SemiAnnual1Day;
    this.debit.semiAnnual2Month = this.debitForm.value.SemiAnnual2Month;
    this.debit.semiAnnual2Day = this.debitForm.value.SemiAnnual2Day;
    // Annual
    this.debit.annualMoy = this.debitForm.value.AnnualMoy;
    this.debit.annualDom = this.debitForm.value.AnnualDom;
  }
  //#endregion Utilities

  //#region Data Functions
  //#region Reads
  /**
   * Gets the complete list of Periods
   * @returns {any} result
   */
  getPeriods(): any {
    this.progressSpinner = true;
    return this.periodService.getPeriods()
      .subscribe({
        next: (data: IPeriod[]): void => {
          this.periods = data;
          // console.log(`Debit-Edit getPriods: ${JSON.stringify(this.periods)}`);
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
        }
      });
  }

  /**
   * Get a specific Debit
   * @param {number} id The id of the Debit
   * @returns {any} result
   */
  getDebit(id: number): any {
    if (id === 0) {
      return undefined;
    }
    this.progressSpinner = true;
    return this.debitService.getDebit(id)
      .subscribe({
        next: (data: IDebit): void => {
          this.onDebitRetrieved(data);
          // console.log(`Debit-Edit patchValue: ${JSON.stringify(this.debitForm.value)}`);
          // console.log(`Debit-Edit getDebit: ${JSON.stringify(data)}`);
        },
        error: catchError((err: any) => this.err.handleError(err)),
        complete: () => {
          this.progressSpinner = false;
        }
      });
  }
  //#endregion Reads
  //#region Writes
  /**
   * Upserts the database debit record by either calling the
   * "createDebit" or "updateDebit" API calls based on
   * whether the primary key "pkDebit" is zero or not
   */
  saveDebit(): any {
    if (this.debitForm.invalid) {
      Object.keys(this.debitForm.controls).forEach(key => {
        this.debitForm.controls[key].markAsDirty();
      });
      return null;
    }
    this.progressSpinner = true;
    this.patchFormValuesBackToObject();
    if (this.debit.pkDebit === 0) {
      this.debitService.createDebit(this.debit)
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Debit Creation Failed`);
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onCompleteNav('Debit Created', this.defaultPath, this.route);
          }
        });
    } else {
      this.debitService.updateDebit(this.debit)
        .subscribe({
          next: () => { },
          error: catchError((err: any) => {
            this.messageUtilService.onError(`Debit Update Failed`);
            return this.err.handleError(err);
          }),
          complete: () => {
            this.progressSpinner = false;
            this.messageUtilService.onCompleteNav('Debit Updated', this.defaultPath, this.route);
          }
        });
    }
  }

  /**
   * Delete specific debit record:
   * If it is a new entry then field values will be discarded
   * If it is an existing record then call a confirmation popup
   * and prompt user for yes/no.
   * If yes then delete record by calling the "deleteDebit" API.
   * If no then do nothing.
   */
  deleteDebit(): void {
    if (this.debit.pkDebit === 0) {
      // Don't delete, it was never saved.
      this.messageUtilService.onComplete('New Debit entries discarded');
    } else {
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.progressSpinner = true;
          this.debitService.deleteDebit(this.debit.pkDebit)
            .subscribe({
              next: () => { },
              error: catchError((err: any) => {
                this.messageUtilService.onError(`Debit Delete Failed`);
                return this.err.handleError(err);
              }),
              complete: () => {
                this.progressSpinner = false;
                this.messageUtilService.onCompleteNav('Debit Deleted', this.defaultPath, this.route);
              }
            });
        }
      });
    }
  }
  //#endregion Writes
  //#endregion Data Functions
}
