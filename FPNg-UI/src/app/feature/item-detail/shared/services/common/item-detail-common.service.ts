import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ItemDetailCommonService {

  private messages: { [key: string]: { [key: string]: string; }; };

  /**
   * Messages used in the field tooltips
   */
  public get Messages(): { [key: string]: { [key: string]: string; }; } {
    return this.messages;
  }

  /**
   * Base Constructor
   */
  constructor() {
    // Defines all of the validation messages for the Credit & Debit forms.
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
  }

  //#region Common Functions
  /**
   * Initialized the CRUD Form
   * @param {FormBuilder} fb Form Builder input from CRUD forms
   * @returns Initialized Form
   */
  generateForm(fb: FormBuilder): FormGroup {
    return fb.group({
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
  }
  //#endregion Common Functions

  //#region Validation Helpers
  /**
   * Calls all of the update validation functions which turns validation on/off
   * for various field combination in the "creditForm" formbuild
   * based on user's Period selection
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The Period Key Value
   */
  setPeriodFields(form: FormGroup, period?: number): void {
    this.updateWeeklyValidation(form, period);
    this.updateWeeklyValidation(form, period);
    this.updateEveryTwoWeeksAndOneTimeValidation(form, period);
    this.updateBiMonthlyValidation(form, period);
    this.updateMonthlyValidation(form, period);
    this.updateQuarterlyValidation(form, period);
    this.updateSemiAnnualValidation(form, period);
    this.updateAnnualValidation(form, period);
  }

  /**
   * Handles Validation for the "Weekly" Fields:
   * "WeeklyDow" Weekday Radio Button Array, determines weekday of occurrence
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  updateWeeklyValidation(form: FormGroup, period?: number): void {
    if (period === 3) {
      form.controls['WeeklyDow'].setValidators([Validators.required]);
    } else {
      form.controls['WeeklyDow'].clearValidators();
      form.controls['WeeklyDow'].setValue(null);
    }
    form.controls['WeeklyDow'].updateValueAndValidity();
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
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateEveryTwoWeeksAndOneTimeValidation(form: FormGroup, period?: number): void {
    if (period === 4 || period === 1) {
      form.controls['InitializationDate'].setValidators([Validators.required]);
    } else {
      form.controls['InitializationDate'].clearValidators();
      form.controls['InitializationDate'].setValue(null);
    }
    form.controls['InitializationDate'].updateValueAndValidity();

    if (period === 1) {
      form.controls['DateRangeReq'].setValue(false);
      form.controls['EndDate'].clearValidators();
      form.controls['EndDate'].setValue(null);
    }

    if (period === 4) {
      form.controls['EverOtherWeekDow'].setValidators([Validators.required]);
    } else {
      form.controls['EverOtherWeekDow'].clearValidators();
      form.controls['EverOtherWeekDow'].setValue(null);
    }
    form.controls['EverOtherWeekDow'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Bi-Monthly" Fields:
   * "BiMonthlyDay1" Dropdown Selector with days in the month, 1-28, select the first day of occurrence in the month
   * "BiMonthlyDay2" Similar to first selector, intended for the second day of occurrence in the month
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateBiMonthlyValidation(form: FormGroup, period?: number): void {
    if (period === 5) {
      form.controls['BiMonthlyDay1'].setValidators([Validators.required]);
      form.controls['BiMonthlyDay2'].setValidators([Validators.required]);
    } else {
      form.controls['BiMonthlyDay1'].clearValidators();
      form.controls['BiMonthlyDay1'].setValue(null);
      form.controls['BiMonthlyDay2'].clearValidators();
      form.controls['BiMonthlyDay2'].setValue(null);
    }
    form.controls['BiMonthlyDay1'].updateValueAndValidity();
    form.controls['BiMonthlyDay2'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Monthly" Fields:
   * "MonthlyDom" Dropdown Selector with days in the month, 1-28, select the day of occurrence in the month
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateMonthlyValidation(form: FormGroup, period?: number): void {
    if (period === 6) {
      form.controls['MonthlyDom'].setValidators([Validators.required]);
    } else {
      form.controls['MonthlyDom'].clearValidators();
      form.controls['MonthlyDom'].setValue(null);
    }
    form.controls['MonthlyDom'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Quarterly" Fields:
   * "Quarterly[1-4]Month" Dropdown Selectors with months in the year, January-December, select the month of occurrence in the year
   * "Quarterly[1-4]Day" Dropdown Selectors with days in the month, 1-28, select the day of occurrence in the month
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateQuarterlyValidation(form: FormGroup, period?: number): void {
    if (period === 7) {
      // First Quarter
      form.controls['Quarterly1Month'].setValidators([Validators.required]);
      form.controls['Quarterly1Day'].setValidators([Validators.required]);
      // Second Quarter
      form.controls['Quarterly2Month'].setValidators([Validators.required]);
      form.controls['Quarterly2Day'].setValidators([Validators.required]);
      // Third Quarter
      form.controls['Quarterly3Month'].setValidators([Validators.required]);
      form.controls['Quarterly3Day'].setValidators([Validators.required]);
      // Fourth Quarter
      form.controls['Quarterly4Month'].setValidators([Validators.required]);
      form.controls['Quarterly4Day'].setValidators([Validators.required]);
    } else {
      // First Quarter
      form.controls['Quarterly1Month'].clearValidators();
      form.controls['Quarterly1Month'].setValue(null);
      form.controls['Quarterly1Day'].clearValidators();
      form.controls['Quarterly1Day'].setValue(null);
      // Second Quarter
      form.controls['Quarterly2Month'].clearValidators();
      form.controls['Quarterly2Month'].setValue(null);
      form.controls['Quarterly2Day'].clearValidators();
      form.controls['Quarterly2Day'].setValue(null);
      // Third Quarter
      form.controls['Quarterly3Month'].clearValidators();
      form.controls['Quarterly3Month'].setValue(null);
      form.controls['Quarterly3Day'].clearValidators();
      form.controls['Quarterly3Day'].setValue(null);
      // Fourth Quarter
      form.controls['Quarterly4Month'].clearValidators();
      form.controls['Quarterly4Month'].setValue(null);
      form.controls['Quarterly4Day'].clearValidators();
      form.controls['Quarterly4Day'].setValue(null);
    }
    // First Quarter
    form.controls['Quarterly1Month'].updateValueAndValidity();
    form.controls['Quarterly1Day'].updateValueAndValidity();
    // Second Quarter
    form.controls['Quarterly2Month'].updateValueAndValidity();
    form.controls['Quarterly2Day'].updateValueAndValidity();
    // Third Quarter
    form.controls['Quarterly3Month'].updateValueAndValidity();
    form.controls['Quarterly3Day'].updateValueAndValidity();
    // Fourth Quarter
    form.controls['Quarterly4Month'].updateValueAndValidity();
    form.controls['Quarterly4Day'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Semi-Annual" Fields:
   * "SemiAnnual[1-2]Month" Dropdown Selectors with months in the year, January-December, select the month of occurrence in the year
   * "SemiAnnual[1-2]Day" Dropdown Selectors with days in the month, 1-28, select the day of occurrence in the month
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateSemiAnnualValidation(form: FormGroup, period?: number): void {
    if (period === 8) {
      // First Annum
      form.controls['SemiAnnual1Month'].setValidators([Validators.required]);
      form.controls['SemiAnnual1Day'].setValidators([Validators.required]);
      // Second Annum
      form.controls['SemiAnnual2Month'].setValidators([Validators.required]);
      form.controls['SemiAnnual2Day'].setValidators([Validators.required]);
    } else {
      // First Annum
      form.controls['SemiAnnual1Month'].clearValidators();
      form.controls['SemiAnnual1Month'].setValue(null);
      form.controls['SemiAnnual1Day'].clearValidators();
      form.controls['SemiAnnual1Day'].setValue(null);
      // Second Annum
      form.controls['SemiAnnual2Month'].clearValidators();
      form.controls['SemiAnnual2Month'].setValue(null);
      form.controls['SemiAnnual2Day'].clearValidators();
      form.controls['SemiAnnual2Day'].setValue(null);
    }
    // First Annum
    form.controls['SemiAnnual1Month'].updateValueAndValidity();
    form.controls['SemiAnnual1Day'].updateValueAndValidity();
    // Second Annum
    form.controls['SemiAnnual2Month'].updateValueAndValidity();
    form.controls['SemiAnnual2Day'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Annual" Fields:
   * "AnnualMoy" Dropdown Selector with months in the year, January-December, select the month of occurrence in the year
   * "MonthlyDom" Dropdown Selector with days in the month, 1-28, select the day of occurrence in the month
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  private updateAnnualValidation(form: FormGroup, period?: number): void {
    if (period === 9) {
      form.controls['AnnualMoy'].setValidators([Validators.required]);
      form.controls['AnnualDom'].setValidators([Validators.required]);
    } else {
      form.controls['AnnualMoy'].clearValidators();
      form.controls['AnnualMoy'].setValue(null);
      form.controls['AnnualDom'].clearValidators();
      form.controls['AnnualDom'].setValue(null);
    }
    form.controls['AnnualMoy'].updateValueAndValidity();
    form.controls['AnnualDom'].updateValueAndValidity();
  }

  /**
   * Handles Validation for the "Annual" Fields:
   * "BeginDate" Calendar Selector, allows the user to set a Start Date for a particular Credit
   * "EndDate" Calendar Selector, allows the user to set a Stop Date for a particular Credit
   * @param {FormGroup} form The Form Group from the CRUD Form
   * @param {number} period The user's period selection
   */
  updateDateRangeValidation(form: FormGroup, toggle?: boolean, period?: number): void {
    if (toggle) {
      if (period !== 4 && period !== 1) {
        form.controls['BeginDate'].setValidators([Validators.required]);
        form.controls['EndDate'].setValidators([Validators.required]);
      } else {
        form.controls['EndDate'].setValidators([Validators.required]);
      }
    } else {
      form.controls['BeginDate'].clearValidators();
      form.controls['BeginDate'].setValue(null);
      form.controls['EndDate'].clearValidators();
      form.controls['EndDate'].setValue(null);
    }
    form.controls['BeginDate'].updateValueAndValidity();
    form.controls['EndDate'].updateValueAndValidity();
  }
  //#endregion Validation Helpers
}
