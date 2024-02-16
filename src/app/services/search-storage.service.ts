import { Injectable } from '@angular/core';

export interface Search {
  searchText: string | null;
  searchType: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SearchStorageService {
  constructor() {}

  public search: Search = {
    searchText: null,
    searchType: null,
  };

  public setSearch(options: Search) {
    this.search = options;
  }

  public getSearch() : Search{
    return this.search;
  }

  public isValidSearch(): boolean {
    return this.search && typeof this.search.searchText === 'string' && this.search.searchText.trim() !== '' &&
           typeof this.search.searchType === 'string' && this.search.searchType.trim() !== '';
  }
}
