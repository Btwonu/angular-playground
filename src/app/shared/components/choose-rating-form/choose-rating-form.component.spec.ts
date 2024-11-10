import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRatingFormComponent } from './choose-rating-form.component';

describe('ChooseRatingFormComponent', () => {
  let component: ChooseRatingFormComponent;
  let fixture: ComponentFixture<ChooseRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ChooseRatingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
