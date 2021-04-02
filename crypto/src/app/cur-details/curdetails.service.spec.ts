import { TestBed } from '@angular/core/testing';

import { CurdetailsService } from './curdetails.service';

describe('CurdetailsService', () => {
  let service: CurdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
