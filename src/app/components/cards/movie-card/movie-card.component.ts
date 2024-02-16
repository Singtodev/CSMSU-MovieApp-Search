import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  constructor(private router: Router , private domSanitizer: DomSanitizer) {}

  @Input() movieTitle: string = '';
  @Input() moviePicture: string = '';
  @Input() tags: any[] = [];
  @Input() imdbId: string = '1';

  public goToDetail() {
    this.router.navigate(['detail'], { queryParams: { id: this.imdbId } });
  }

  public getImage(){
    if(this.moviePicture == "N/A"){
      return "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
    }
    return this.moviePicture;
  }

  public ByPassImage(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
