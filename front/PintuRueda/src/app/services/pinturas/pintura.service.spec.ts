import { TestBed } from '@angular/core/testing';

import { PinturaService } from '../pinturas/pintura.service';

describe('PinturaService', () => {
  let service: PinturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
