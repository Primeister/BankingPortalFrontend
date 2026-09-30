import { TestBed } from '@angular/core/testing';
import { RecurringPayment } from './recurring-payment';

describe('RecurringPayment', () => {
  let service: RecurringPayment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurringPayment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
