import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistDashboardComponent } from './watchlist-dashboard.component';

describe('WatchlistDashboardComponent', () => {
  let component: WatchlistDashboardComponent;
  let fixture: ComponentFixture<WatchlistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
