import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateType, getDate } from './utils';
import * as moment from 'moment';

export interface IUpdate {
  date: number;
  timeSelected?: boolean;
}

@Component({
  selector: 'payme-date-picker',
  templateUrl: './payme-date-picker.component.html',
  styleUrls: ['./payme-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymeDatePickerComponent {
  @Input() isTimer = false;
  @Input() control: FormControl;
  @Input() controlLabel: string;
  @Input() rangeControl: FormControl;
  @Input() rangeControlLabel: string;

  minDate: number;
  isSameDate: boolean;

  ngOnInit() {
    this.checkSameDate();
    this.updateOptions();
  }

  onClear(period: string): void {
    const component: any = this;
    component[period].reset();
    this.checkSameDate();
    this.updateOptions();
  }

  updateControl({ date, timeSelected = false }: IUpdate): void {
    if (timeSelected) {
      this.onUpdateTimeControl(date);
    } else {
      this.onUpdateDateControl(date);
    }
  }

  onUpdateTimeControl(selectedTime: number): void {
    const { value: firstPickerTime } = this.control;
    const secondPickerTime = this.rangeControl?.value;

    let selectedDate: Date = new Date(selectedTime);
    selectedTime = selectedDate.setSeconds(0, 0);

    if (secondPickerTime && secondPickerTime < selectedTime) {
      let diff: number;

      if (!firstPickerTime) {
        const secondPickerDate = new Date(secondPickerTime);
        const { hours, minutes, seconds, milliseconds }: any = getDate(
          selectedTime,
          [
            DateType.HOURS,
            DateType.MINUTES,
            DateType.SECONDS,
            DateType.MILLISECONDS,
          ]
        );
        selectedTime = new Date(secondPickerTime).setHours(
          hours,
          minutes,
          seconds,
          milliseconds
        );
        diff =
          secondPickerDate.getTime() - secondPickerDate.setHours(0, 0, 0, 0);
      } else {
        diff = secondPickerTime - firstPickerTime;
      }

      if (diff > 0) {
        this.updateRangeControl({ date: diff + selectedTime });
      }
    }
    return this.onSelected('control', selectedTime);
  }

  onUpdateDateControl(selectedDate: number): void {
    const { value: firstPickerTime } = this.control;
    const secondPickerTime = this.rangeControl?.value;

    let newDate: Date = new Date(selectedDate);
    selectedDate = firstPickerTime
      ? newDate.setSeconds(0, 0)
      : newDate.setHours(0, 0, 0, 0);

    if (secondPickerTime && secondPickerTime < selectedDate) {
      if (firstPickerTime) {
        const diff = selectedDate - firstPickerTime;
        if (diff > 0) {
          this.updateRangeControl({ date: secondPickerTime + diff });
        }
      } else {
        this.updateRangeControl({ date: selectedDate });
      }
    }
    this.onSelected('control', selectedDate);
  }

  updateRangeControl({ date, timeSelected = false }: IUpdate): void {
    let selectedDate: Date | number = new Date(date);
    const { value: controlValue } = this.control;
    const { value: rangeControlValue } = this.rangeControl;
    selectedDate =
      rangeControlValue || timeSelected
        ? selectedDate.setSeconds(0, 0)
        : selectedDate.setHours(23, 59, 59, 999);

    if (controlValue > selectedDate) {
      const { hours, minutes }: any = getDate(selectedDate, [
        DateType.HOURS,
        DateType.MINUTES,
      ]);
      const controlDate = new Date(controlValue);
      selectedDate = Math.max(
        controlDate.setSeconds(0, 0),
        controlDate.setHours(hours, minutes, 0, 0)
      );
    }
    this.onSelected('rangeControl', selectedDate as number);
  }

  onSelected(period: string, timestamp: number): void {
    const component: any = this;
    component[period].setValue(timestamp);
    this.checkSameDate();
    this.updateOptions();
  }

  checkSameDate(): void {
    if (this.rangeControl) {
      const from = this.control.value;
      const to = this.rangeControl.value;
      this.isSameDate = moment(to).isSame(from, 'day');
    }
  }

  updateOptions(): void {
    this.minDate = this.control.value;
  }
}
