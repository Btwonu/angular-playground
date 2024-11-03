import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFiltersFormComponent } from './movie-filters-form.component';

describe('MovieFiltersFormComponent', () => {
  let component: MovieFiltersFormComponent;
  let fixture: ComponentFixture<MovieFiltersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFiltersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
