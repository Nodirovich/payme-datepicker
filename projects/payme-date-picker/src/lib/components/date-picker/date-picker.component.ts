import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nDefault,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { DateType, getDate } from '../../utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface IDatePicker {
  day: number;
  month: number;
  year: number;
}

@Injectable()
export class CustomDatepickerI18 extends NgbDatepickerI18nDefault {
  getMonthShortName(month: number): string {
    return this.getMonthFullName(month);
  }
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18 }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit, OnDestroy {
  @Output()
  clear = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Input() startDate: NgbDate;
  @Input() minDate: number;
  @Input() control = new FormControl();

  today = this.calendar.getToday();

  private destroy$ = new Subject();

  constructor(
    private calendar: NgbCalendar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  todayHandler(picker: NgbInputDatepicker): void {
    this.onSelect(this.today);
    picker.close();
  }

  onSelect(dateObj: NgbDate): void {
    const value = this.getTimestamp(dateObj);
    const { year, month, date }: any = getDate(value, [
      DateType.YEAR,
      DateType.MONTH,
      DateType.DATE,
    ]);
    const curDate = this.control.value || new Date().getTime();
    const res = new Date(curDate).setFullYear(year, month, date);
    this.selected.emit(res);
  }

  onClear(): void {
    this.control.reset();
    this.clear.emit(null);
  }

  getTimestamp(date: IDatePicker): number {
    const { month, day, year } = date;
    return new Date().setFullYear(year, month - 1, day);
  }
}
