import { OmdbapiService } from './../../services/api/omdbapi.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchStorageService } from '../../services/search-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NavbarComponent , CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  public id = '';
  public movie: any = {};
  public searchResponse: boolean = true;

  constructor(
    private os: OmdbapiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      this.id = query.params['id'];
      this.getMovie(this.id);
    });
  }

  back(){
    this.location.back();
  }

  getMovie(id: string) {
    this.searchResponse = false;
    this.os
      .searchMovies({
        searchText: id,
        searchType: 'i',
      })
      .subscribe((data) => {
        this.movie = data[0] || {};
        this.searchResponse = true;
        console.log(data);
      });
  }
}
