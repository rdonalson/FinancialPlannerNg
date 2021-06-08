/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditOrDebit'
})
export class CreditOrDebitPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Credit';
      case 2:
        return 'Debit';
      default:
        return '';
    }
  }
}
