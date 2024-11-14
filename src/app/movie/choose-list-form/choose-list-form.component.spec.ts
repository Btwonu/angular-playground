import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseListFormComponent } from './choose-list-form.component';

describe('ChooseListFormComponent', () => {
  let component: ChooseListFormComponent;
  let fixture: ComponentFixture<ChooseListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseListFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
