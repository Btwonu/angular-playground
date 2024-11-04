import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWatchlistFormComponent } from './choose-watchlist-form.component';

describe('ChooseWatchlistFormComponent', () => {
  let component: ChooseWatchlistFormComponent;
  let fixture: ComponentFixture<ChooseWatchlistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseWatchlistFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseWatchlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
