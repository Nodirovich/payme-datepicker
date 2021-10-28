import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymeDatePickerComponent } from './payme-date-picker.component';

describe('PaymeDatePickerComponent', () => {
  let component: PaymeDatePickerComponent;
  let fixture: ComponentFixture<PaymeDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymeDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymeDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
