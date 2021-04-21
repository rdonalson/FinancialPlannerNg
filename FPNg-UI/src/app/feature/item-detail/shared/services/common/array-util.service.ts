/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { IKeyValue } from '../../models/key-value';

@Injectable()
export class ArrayUtilService {
  private months!: IKeyValue[];
  private weekDays!: IKeyValue[];
  private daysInTheMonth!: IKeyValue[];

  /**
   * Months array: for use in Dropdown Selectors
   */
  public get Months(): IKeyValue[] {
    return this.months;
  }
  /**
   * Weekdays array: for use in Radio Button Selector Groups
   */
  public get WeekDays(): IKeyValue[] {
    return this.weekDays;
  }
  /**
   * Days in the Month array: for use in Dropdown Selectors
   */
  public get DaysInTheMonth(): IKeyValue[] {
    return this.daysInTheMonth;
  }

  /**
   * Base Constructor
   */
  constructor() {
    this.daysInTheMonth = [
      { key: ' 1', value: 1 },
      { key: ' 2', value: 2 },
      { key: ' 3', value: 3 },
      { key: ' 4', value: 4 },
      { key: ' 5', value: 5 },
      { key: ' 6', value: 6 },
      { key: ' 7', value: 7 },
      { key: ' 8', value: 8 },
      { key: ' 9', value: 9 },
      { key: '10', value: 10 },
      { key: '11', value: 11 },
      { key: '12', value: 12 },
      { key: '13', value: 13 },
      { key: '14', value: 14 },
      { key: '15', value: 15 },
      { key: '16', value: 16 },
      { key: '17', value: 17 },
      { key: '18', value: 18 },
      { key: '19', value: 19 },
      { key: '20', value: 20 },
      { key: '21', value: 21 },
      { key: '22', value: 22 },
      { key: '23', value: 23 },
      { key: '24', value: 24 },
      { key: '25', value: 25 },
      { key: '26', value: 26 },
      { key: '27', value: 27 },
      { key: '28', value: 28 }
    ];
    this.months = [
      { key: 'January', value: 1 },
      { key: 'Febrary', value: 2 },
      { key: 'March', value: 3 },
      { key: 'April', value: 4 },
      { key: 'May', value: 5 },
      { key: 'June', value: 6 },
      { key: 'July', value: 7 },
      { key: 'August', value: 8 },
      { key: 'September', value: 9 },
      { key: 'October', value: 10 },
      { key: 'November', value: 11 },
      { key: 'December', value: 12 }
    ];
    this.weekDays = [
      { key: 'Sun', value: 1 },
      { key: 'Mon', value: 2 },
      { key: 'Tue', value: 3 },
      { key: 'Wed', value: 4 },
      { key: 'Thu', value: 5 },
      { key: 'Fri', value: 6 },
      { key: 'Sat', value: 7 }
    ];
  }
}
