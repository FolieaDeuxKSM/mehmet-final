import { TestBed } from '@angular/core/testing';

import { FbservisService } from './fbservis.service';

describe('FbservisService', () => {
  let service: FbservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
