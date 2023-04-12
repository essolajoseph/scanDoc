import { TestBed } from '@angular/core/testing';

import { TextDectionService } from './text-dection.service';

describe('TextDectionService', () => {
  let service: TextDectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextDectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
