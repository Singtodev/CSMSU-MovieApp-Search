import { MoviesSectionComponent } from './../../components/views/movies-section/movies-section.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchStorageService } from '../../services/search-storage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, MoviesSectionComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(private st: SearchStorageService) {}
  ngOnInit(): void {
    if(this.st.isValidSearch()){
      console.log("Go Calling api!");
    }
  }
}
