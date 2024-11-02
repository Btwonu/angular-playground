import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NouisliderModule],
})
export class RangeSliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
