import { Component } from '@angular/core';
import { MovieCardComponent } from '../../cards/movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-movies-section',
  standalone: true,
  imports: [MovieCardComponent , NgxPaginationModule , CommonModule , FormsModule],
  templateUrl: './movies-section.component.html',
  styleUrl: './movies-section.component.scss'
})
export class MoviesSectionComponent {
  
  public tags = ["movie" , "2022"];
  totalMovies = 100;
  currentPage = 1;

  pageChanged(event: any): void {
    this.currentPage = event;
  }
}
