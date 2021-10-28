import { TestBed } from '@angular/core/testing';

import { PaymeDatePickerService } from './payme-date-picker.service';

describe('PaymeDatePickerService', () => {
  let service: PaymeDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymeDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
