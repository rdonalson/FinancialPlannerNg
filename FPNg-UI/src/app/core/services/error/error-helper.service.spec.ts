import { TestBed } from '@angular/core/testing';

import { ErrorHelperService } from './error-helper.service';

describe('HelperService', () => {
  let service: ErrorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
