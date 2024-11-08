import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { Movie } from 'src/app/types/movie';
import Datediff from 'src/app/shared/utils/Datediff';

@Component({
  selector: 'app-watchlist-detail',
  templateUrl: './watchlist-detail.component.html',
  styleUrls: ['./watchlist-detail.component.scss'],
})
export class WatchlistDetailComponent implements OnInit {
  id!: string;
  imageUrl = '';
  itemsCount = 0;
  createdAt!: Date;
  modifiedAt!: Date;
  movies: Movie[] = [];
  private!: boolean;
  title = '';
  displayedColumns: string[] = [
    'movie_id',
    'title',
    'rating',
    'start_year',
    'options',
  ];

  constructor(
    private router: ActivatedRoute,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const { id } = params;
      const watchlistId = parseInt(id);

      this.watchlistService.getOne(watchlistId).subscribe((res) => {
        this.id = res.data.id;
        this.imageUrl = res.data.imageUrl;
        this.itemsCount = res.data.itemsCount;
        this.createdAt = res.data.createdAt;
        this.modifiedAt = res.data.modifiedAt;
        this.movies = res.data.movies;
        this.private = res.data.private;
        this.title = res.data.title;
      });
    });
  }

  get createdSinceTime(): string {
    const dateDiff = new Datediff(new Date(this.createdAt), new Date());

    return dateDiff.getLargestFormattedDiff();
  }

  get modifiedSinceTime(): string {
    const dateDiff = new Datediff(new Date(this.modifiedAt), new Date());

    return dateDiff.getLargestFormattedDiff();
  }
}
