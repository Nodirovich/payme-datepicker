import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatetimePickerComponent {
  @Output() changeDateTime = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Input() label: string;
  @Input() isTimer = false;
  @Input() control: FormControl = new FormControl();
  @Input() minDate: number;
  @Input() isSameDate: boolean;

  selectedDate(date: number): void {
    this.changeDateTime.emit({ date });
  }

  selectedTime(date: number): void {
    this.changeDateTime.emit({ date, timeSelected: true });
  }

  onClear(): void {
    this.clear.emit();
  }
}
