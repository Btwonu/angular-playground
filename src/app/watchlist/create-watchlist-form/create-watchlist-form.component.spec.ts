import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWatchlistFormComponent } from './create-watchlist-form.component';

describe('CreateWatchlistFormComponent', () => {
  let component: CreateWatchlistFormComponent;
  let fixture: ComponentFixture<CreateWatchlistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWatchlistFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWatchlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
