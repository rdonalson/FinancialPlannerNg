import { TestBed } from '@angular/core/testing';

import { MessageUtilService } from './message-util.service';

describe('UtilitiesService', () => {
  let service: MessageUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
