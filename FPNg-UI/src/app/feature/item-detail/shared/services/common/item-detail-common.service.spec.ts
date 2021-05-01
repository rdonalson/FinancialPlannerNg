import { TestBed } from '@angular/core/testing';

import { ItemDetailCommonService } from './item-detail-common.service';

describe('ItemDetailCommonService', () => {
  let service: ItemDetailCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemDetailCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
