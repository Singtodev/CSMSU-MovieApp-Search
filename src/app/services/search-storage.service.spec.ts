import { TestBed } from '@angular/core/testing';

import { SearchStorageService } from './search-storage.service';

describe('SearchStorageService', () => {
  let service: SearchStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
