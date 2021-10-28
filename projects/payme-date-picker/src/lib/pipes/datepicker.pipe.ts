import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({ name: 'datepicker', pure: false })
export class DatepickerPipe implements PipeTransform {
  transform(value: number, isNgb = false): NgbDateStruct | any {
    if (!value) return '';

    const dateVal = new Date(value);
    const day = dateVal.getDate(),
      month = dateVal.getMonth() + 1,
      year = dateVal.getFullYear();

    if (isNgb) {
      return {
        day,
        month,
        year,
      };
    }
    return `${this.prepare(day)}.${this.prepare(month)}.${year}`;
  }

  prepare(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
