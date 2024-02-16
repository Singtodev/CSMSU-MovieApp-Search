import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchStorageService } from '../../services/search-storage.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router ,private st: SearchStorageService){

  }

  public searchTerm = "";
  public searchType = "";

  public optionsSearch(){
    return [""]
  }
  
  public onSearch(){
    // go to home page
    this.router.navigate(['']);
    
    // set search storage
    this.st.setSearch({
      searchText: this.searchTerm,
      searchType: this.searchType
    })
  }
}
