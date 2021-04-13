import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EnumUtilService {
  months: any;
  constructor() {
    this.months = this.getNamesAndValues(Months);
  }

  private getNamesAndValues(e: any): any {
    return this.getNames(e).map((n: string | number) => ({ name: n, value: e[n] as string | number }));
  }

  private getNames(e: any): any {
    return Object.keys(e).filter(k =>
      typeof e[k] === 'number'
      || e[k] === k
      || e[e[k]]?.toString() !== k
    );
  }
}

enum Months {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12
}




