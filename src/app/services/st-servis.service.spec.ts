import { TestBed } from '@angular/core/testing';

import { StServisService } from './st-servis.service';

describe('StServisService', () => {
  let service: StServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
