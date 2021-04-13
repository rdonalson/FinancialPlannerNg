import { TestBed } from '@angular/core/testing';

import { ArrayUtilService } from './array-util.service';

describe('ArrayUtilService', () => {
  let service: ArrayUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
