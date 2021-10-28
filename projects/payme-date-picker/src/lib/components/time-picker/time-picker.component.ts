import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateType, getDate } from '../../utils';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

interface ITime {
  title: string;
  value: number;
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnInit, OnChanges {
  @ViewChild('timeRef') timeRef: ElementRef;
  @ViewChild('inputRef') inputRef: ElementRef;
  @Output() changed = new EventEmitter<any>();
  @Input() timeControl = new FormControl();
  @Input() sameDate: boolean;
  @Input() minTime: number;

  maskControl = new FormControl();

  private TIMES: ITime[] = [];
  timeList: ITime[] = [];

  value$: Observable<string>;
  isClick = true;

  constructor() {}

  ngOnInit(): void {
    this.prepareList();
    this.updateTimerList();

    this.timeControl.valueChanges
      .pipe(startWith(this.timeControl.value))
      .subscribe((res) => {
        const date = this.subStrTimeStamp(res);
        this.maskControl.setValue(date);
      });
  }

  ngOnChanges(): void {
    this.updateTimerList();
  }

  subStrTimeStamp(date: number): string {
    return moment(date).format('HH:mm');
  }

  prepareList(): void {
    const controlValue = this.timeControl.value;
    this.TIMES = new Array(48).fill('').map((_, idx) => {
      const minute = idx % 2 ? '30' : '00';
      const hour = Math.floor(idx / 2);
      const hourString = hour < 10 ? `0${hour}` : hour;
      const title = hourString + ':' + minute;
      const date = controlValue ? new Date(controlValue) : new Date();
      const value = date.setHours(hour, +minute, 0);

      return {
        title,
        value,
      };
    });
  }

  onBlur({ value }: any): void {
    if (value && !this.isClick) {
      const [hours = 0, minutes = 0] = value.split(':');
      let dateTime = this.getDateTime(+hours, +minutes);
      if (dateTime < this.minTime) {
        dateTime = this.timeControl.value || this.minTime;
      }
      this.inputRef.nativeElement.value = this.subStrTimeStamp(dateTime);
      this.changed.emit(dateTime);
    }
    setTimeout(() => {
      this.hideTimeList();
    }, 180);
  }

  onKeyDown(): void {
    this.hideTimeList();
    this.isClick = false;
  }

  updateTimerList(): void {
    this.timeList = this.TIMES;
    if (this.sameDate) {
      const date = new Date(this.timeControl.value);
      const min = this.minTime || date.setHours(0, 0, 1);
      const minH = this.timeToNumber(min);

      this.timeList = this.timeList.filter(({ value }) => {
        const hours = this.timeToNumber(value);
        return hours >= minH;
      });
    }
  }

  selectedTime(value: number): void {
    const { hours, minutes }: any = getDate(value, [
      DateType.HOURS,
      DateType.MINUTES,
    ]);
    const dateTime = this.getDateTime(hours, minutes);
    this.isClick = true;
    this.changed.emit(dateTime);
  }

  timeToNumber(time: number): number {
    return +moment(time).format('HHmm');
  }

  getDateTime(hours: number, minutes: number): number {
    const curDate = this.timeControl.value || new Date().getTime();
    return new Date(curDate).setHours(hours, minutes);
  }

  showTimeList(): void {
    this.timeRef.nativeElement.classList.add('active');
  }

  hideTimeList(): void {
    const el = this.timeRef.nativeElement.classList;
    if (el.contains('active')) {
      el.remove('active');
    }
  }
}
