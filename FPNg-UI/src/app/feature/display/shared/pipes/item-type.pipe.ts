/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemType'
})
export class ItemTypePipe implements PipeTransform {

  transform(value: number): string {
    console.log(`value: ${value}`);
    if (value === 0) {
      return '-';
    }
    else if (value > 0) {
      return 'Up';
    }
    else if (value < 0) {
      return 'Down';
    }
    else {
      return '';
    }
  }

}
