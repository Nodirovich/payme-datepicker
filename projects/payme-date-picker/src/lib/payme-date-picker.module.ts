import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { PaymeDatePickerComponent } from './payme-date-picker.component';
import { ControlErrosPipe, DatepickerPipe } from './pipes';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    PaymeDatePickerComponent,
    DatetimePickerComponent,
    TimePickerComponent,
    DatePickerComponent,
    DatepickerPipe,
    ControlErrosPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [PaymeDatePickerComponent],
})
export class PaymeDatePickerModule {}
