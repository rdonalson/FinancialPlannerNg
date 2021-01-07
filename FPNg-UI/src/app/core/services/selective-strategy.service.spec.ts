import { TestBed } from '@angular/core/testing';

import { SelectiveStrategyService } from './selective-strategy.service';

describe('SelectiveStrategyService', () => {
  let service: SelectiveStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectiveStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
