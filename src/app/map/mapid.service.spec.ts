import { TestBed } from '@angular/core/testing';

import { MapidService } from './mapid.service';

describe('MapidService', () => {
  let service: MapidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
