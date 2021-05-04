import { TestBed } from '@angular/core/testing';

import { DebitService } from './debit.service';

describe('DebitService', () => {
  let service: DebitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
