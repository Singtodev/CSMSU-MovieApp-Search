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

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    MoviesSectionComponent,
    FooterComponent,
    HttpClientModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public searchAll: Search[] = [];
  public searchResponse: boolean = false;

  constructor(private st: SearchStorageService, private os: OmdbapiService) {}

  ngOnInit(): void {
    if (this.st.isValidSearch()) {
      console.log('Go Calling api!');
    } else {
      this.getMovies();
    }
  }

  getMovies(): void {
    this.os.getAllMovies().subscribe(
      (movies: Search[]) => {
        this.searchAll = movies;
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  searchMovie() {
    console.log(this.os.getCache())
    let search: SearchInput = this.st.getSearch();
    if (search.searchText == '') {
      this.getMovies();
    } else {
      this.os.searchMovies(search).subscribe((data: Search[]) => {
        this.searchAll = data;
      });
    }
  }
}
