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
  tap,
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
  getCache() {
    return this.cache;
  }

  searchMovies(search: SearchInput): Observable<any[]> {
    // fetch api 3 case
    // by title  , imdbid , partial title

    let url = `${config.API_PATH}/?${search.searchType}=${search.searchText}&apikey=${config.API_KEY}`;

    if (!search.searchText || !search.searchType) {
      return of([]);
    }

    return this.http.get(url).pipe(
      map((data: any) => {

        let results: any = [];

        if(data.Response == "False"){
          alert(data.Error);
          return [];
        }
        
        if (search.searchType == 't' || search.searchType == 'i') {
          results = [data];
        } else {
          results = data.Search || [];
        }

        return results;
      }),
      catchError((error) => {
        console.log(error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  async getSearchPartial(search: SearchInput): Promise<Search[]> {
    let page = 1;
    let pagination = 0;
    let results: any[] = [];
    if (!search.searchText || !search.searchType) {
      return [];
    }
    let url = `${config.API_PATH}/?${search.searchType}=${search.searchText}&apikey=${config.API_KEY}&page=${page}`;
    try {
      const initialResponse: any = await this.http.get(url).toPromise();
      if (initialResponse.Response === "True") {
        console.log(initialResponse);
        pagination = Math.floor(initialResponse.totalResults / 10) - 1;
        console.log(pagination);
        results = [...initialResponse.Search];
        while (pagination > 0) {
          page++;
          pagination--;
          let nextUrl = `${config.API_PATH}/?${search.searchType}=${search.searchText}&apikey=${config.API_KEY}&page=${page}`;
          const nextPageResponse: any = await this.http.get(nextUrl).toPromise();
          results = [...results ,...nextPageResponse.Search]
        }
      }else{
        alert(initialResponse.Error);
      }
      return results || [];
    } catch (error) {
      return [];
    }
  }
  
  public getAllMovies(): Observable<Search[]> {
    let listSearch: string[] = [
      'The Matrix',
      'Disney',
      'Superman',
      'TheFlash',
      'Thor',
      'Marvel',
      'Hero',
      'Love',
      'Thor: Love and Thunder',
      'Black Adam',
      'Spider-Man',
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
        return of(this.cache.get(searchText)!);
      } else {
        const url = `${config.API_PATH}?s=${searchText}&apikey=${config.API_KEY}`;
        return this.http.get<SearchResponse>(url).pipe(
          catchError((error) => {
            console.error(`Error fetching movies for ${searchText}:`, error);
            return of([]);
          }),
          map((response: any) => response.Search || []),
          // Cache the response
          map((searchResults) => {
            this.cache.set(searchText, searchResults);
            return searchResults;
          }),
          finalize(() => console.log('Searching => ' + searchText))
        );
      }
    });
    return forkJoin(requests).pipe(
      map((results: any) => [].concat(...results))
    );
  }
  
}
