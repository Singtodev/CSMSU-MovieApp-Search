import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../../cards/movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../../../services/api/omdbapi.service';
@Component({
  selector: 'app-movies-section',
  standalone: true,
  imports: [MovieCardComponent , NgxPaginationModule , CommonModule],
  templateUrl: './movies-section.component.html',
  styleUrl: './movies-section.component.scss'
})
export class MoviesSectionComponent {


  @Input() movies: Search[] = [];
  @Input() currentPage: number = 1;
  public totalMovies = this.movies.length;

  pageChanged(event: any): void {
    this.currentPage = event;
  }
}
