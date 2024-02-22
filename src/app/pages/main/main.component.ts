import {
  OmdbapiService,
  Search,
  SearchResponse,
} from './../../services/api/omdbapi.service';
import { MoviesSectionComponent } from './../../components/views/movies-section/movies-section.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  SearchStorageService,
  Search as SearchInput,
} from '../../services/search-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    MoviesSectionComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public searchAll: Search[] = [];
  public searchResponse: boolean = true;
  public currentPage = 1;
  constructor(private st: SearchStorageService, private os: OmdbapiService) {}

  ngOnInit(): void {
    if (this.st.isValidSearch()) {
      this.searchMovie();
    } else {
      this.getMovies();
    }
  }

  getMovies(): void {
    this.currentPage = 1;
    this.os.getAllMovies().subscribe(
      (movies: Search[]) => {
        this.searchAll = movies;
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  async searchMovie() {
    this.currentPage = 1;
    let search: SearchInput = this.st.getSearch();
    if (search.searchText == '') {
      this.getMovies();
    } else {
      this.searchResponse = false;

      if (search.searchType == 't' || search.searchType == 'i') {
        this.os.searchMovies(search).subscribe((data: Search[]) => {
          // Handle the data here
          console.log(data);
          this.searchAll = data;
          setTimeout(() => {
            this.searchResponse = true;
          }, 1000);
        });
      } else {
        this.searchAll = await this.os.getSearchPartial(search);
        this.searchResponse = true;
      }
    }
  }
}
