import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NouisliderModule],
})
export class RangeSliderComponent implements OnInit {
  @Input() label = '';
  @Input() labelMin = '';
  @Input() labelMax = '';
  @Input() idMin = '';
  @Input() idMax = '';
  @Input() min = 0;
  @Input() max = 0;
  @Input() control!: FormControl<any>;

  constructor() {}

  ngOnInit(): void {}

  onMinChange(event: any) {
    const { value } = event.target;

    this.control?.setValue([parseInt(value), this.control?.value[1]]);
  }

  onMaxChange(event: any) {
    const { value } = event.target;

    this.control?.setValue([this.control?.value[0], parseInt(value)]);
  }
}
