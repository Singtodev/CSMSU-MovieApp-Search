import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  constructor(private router: Router) {}

  @Input() movieTitle: string = '';
  @Input() moviePicture: string = '';
  @Input() tags: any[] = [];
  @Input() imdbId: string = '1';

  public goToDetail() {
    this.router.navigate(['/detail'], { queryParams: { id: this.imdbId } });
  }
}
