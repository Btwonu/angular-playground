import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-pagination',
  templateUrl: './movie-pagination.component.html',
  styleUrls: ['./movie-pagination.component.scss']
})
export class MoviePaginationComponent implements OnInit {
  @Input() length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | null = null;

  constructor() { }

  ngOnInit(): void {
  }
}
