import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSectionComponent } from './movies-section.component';

describe('MoviesSectionComponent', () => {
  let component: MoviesSectionComponent;
  let fixture: ComponentFixture<MoviesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
