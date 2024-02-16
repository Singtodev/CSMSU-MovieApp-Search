import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  finalize,
  forkJoin,
  map,
  of,
} from 'rxjs';
import { config } from '../../config/config';
import {
  SearchStorageService,
  Search as SearchInput,
} from '../search-storage.service';

export interface SearchResponse {
  Search?: Search[];
  totalResults?: string;
  Response?: string;
}

export interface Search {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Type?: Type;
  Poster?: string;
}

export enum Type {
  Episode = 'episode',
  Movie = 'movie',
  Series = 'series',
}

@Injectable({
  providedIn: 'root',
})
export class OmdbapiService {
  constructor(private http: HttpClient) {}

  public searchedMoviesResult: Search[] = [];

  public cache: Map<string, Search[]> = new Map();

  getCache(){
    return this.cache;
  }

  searchMovies(search: SearchInput): Observable<any[]> {
    // Check if the search text is empty or undefined
    if (!search.searchText) {
      return of([]); // Return an empty observable if there's no search text
    }

    const cacheKey = search.searchText.toLowerCase(); // Normalize the search text for consistency

    // Check if the results for the search text are already cached
    if (this.cache.has(cacheKey)) {
      console.log('Using cached results for:', search.searchText);
      return of(this.cache.get(cacheKey)!); // Return the cached results as an observable
    }

    // If the results are not cached, fetch them from the API
    return this.fetchResults(search.searchText).pipe(
      map((data: any) => {
        const results = data.Search || []; // Extract the 'Search' array from the API response
        this.cache.set(cacheKey, results); // Cache the results for future use
        return results; // Return the results
      }),
      catchError((error) => {
        console.error('Error fetching search results:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  private fetchResults(searchText: string): Observable<any> {
    const url = `${config.API_PATH}/?s=${searchText}&apikey=${config.API_KEY}`;
    return this.http.get(url);
  }


  public getAllMovies(): Observable<Search[]> {
    let listSearch: string[] = [
      'Spider-Man',
      'Disney',
      'Superman',
      'TheFlash',
      'Thor',
      'Marvel',
      'Hero',
      'Love',
      'Thor: Love and Thunder',
      'Black Adam',
      'Top Gun: Maverick',
      'The Batman',
      'Encanto',
      'Brahmastra: Part One – Shiva',
      'Jurassic World Dominion',
      'K.G.F: Chapter 2',
      'Uncharted',
    ];

    const requests: Observable<Search[]>[] = listSearch.map((searchText) => {
      if (this.cache.has(searchText)) {
        // If data is cached, return it as an observable
        return of(this.cache.get(searchText)!);
      } else {
        // Otherwise, fetch data from the API
        const url = `${config.API_PATH}?s=${searchText}&apikey=${config.API_KEY}`;
        return this.http.get<SearchResponse>(url).pipe(
          catchError((error) => {
            console.error(`Error fetching movies for ${searchText}:`, error);
            // Return an empty array in case of an error
            return of([]);
          }),
          map((response: any) => response.Search || []), // Extract the 'Search' array from the response
          // Cache the response
          map((searchResults) => {
            this.cache.set(searchText, searchResults);
            return searchResults;
          }),
          finalize(() => console.log('Searching => ' + searchText))
        );
      }
    });

    // Combine all observables into a single observable and concatenate their results
    return forkJoin(requests).pipe(
      map((results: any) => [].concat(...results)) // Flatten the array of arrays into a single array
    );
  }
}
