import { TestBed } from '@angular/core/testing';

import { GetInformationService } from './get-information.service';

describe('GetInformationService', () => {
  let service: GetInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
