import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchStorageService } from '../../services/search-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() onClickSearch: EventEmitter<any> = new EventEmitter();
  @Output() onGetAllMovies: EventEmitter<any> = new EventEmitter();

  public searchTerm = '';
  public searchType = 's';

  constructor(private router: Router, private st: SearchStorageService) {}

  ngOnInit() {
    this.initSearch();
  }

  async initSearch(){
    let search = await this.st.getSearch();
    this.searchType = search.searchType || '';
    this.searchTerm = search.searchText || '';
    console.log(search);
  }

  public getOptions = [
    {
      name: "title",
      value: "t"
    },
    {
      name: "ImdbId",
      value: "i",
    },
    {
      name: "Partial Title",
      value: "s"
    }
  ];


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

  public onInputChange(element: HTMLInputElement){
    this.searchTerm = element.value;
    this.updateSearch();
  }

  public updateSearchType(element: HTMLSelectElement){
    this.searchType = element.value;
    this.updateSearch();
  }

  public updateSearch(){
    this.st.setSearch({
      searchText: this.searchTerm,
      searchType: this.searchType,
    });
  }

  public onGoHome() {
    this.searchTerm = "";
    this.st.setSearch({
      searchText: '',
      searchType: this.searchType
    });
    this.onGetAllMovies.emit();
    this.onSearch();
    this.router.navigate(['/']);
  }
}
