import { TestBed } from '@angular/core/testing';

import { OmdbapiService } from './omdbapi.service';

describe('OmdbapiService', () => {
  let service: OmdbapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdbapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
