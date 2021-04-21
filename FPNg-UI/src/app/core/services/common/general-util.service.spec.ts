import { TestBed } from '@angular/core/testing';

import { GeneralUtilService } from './general-util.service';

describe('ClaimsUtilService', () => {
  let service: GeneralUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
