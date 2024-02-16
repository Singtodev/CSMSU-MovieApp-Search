import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchStorageService } from '../../services/search-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() onClickSearch: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private st: SearchStorageService) {}

  public searchTerm = '';
  public searchType = 'title';

  public onSearch() {
    // go to home page
    this.router.navigate(['']);

    // set search storage
    this.st.setSearch({
      searchText: this.searchTerm,
      searchType: this.searchType,
    });

    this.onClickSearch.emit();
  }

  public onGoHome() {
    if (this.router.url == '/') {
      window.location.reload();
    } else {
      this.router.navigate(['']);
      this.st.setSearch({
        searchText: '',
        searchType: '',
      });
    }
  }
}
