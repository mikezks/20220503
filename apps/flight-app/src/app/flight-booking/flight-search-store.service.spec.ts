import { TestBed } from '@angular/core/testing';

import { FlightSearchStoreService } from './flight-search-store.service';

describe('FlightSearchStoreService', () => {
  let service: FlightSearchStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSearchStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
