import { TestBed } from '@angular/core/testing';

import { InitialAmountService } from './initial-amount.service';

describe('InitialAmountService', () => {
  let service: InitialAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
