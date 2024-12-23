import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ListService } from '../../services/list/list.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { AddMovieRequest } from 'src/app/types/list';

const range = (start: any, end: any) => {
  return [...Array(end).keys()].map((i: any) => i + start);
};

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('addToListForm') form!: NgForm;
  @ViewChild('status') status!: NgModel;
  @ViewChild('list') list!: NgModel;
  @Input('movieId') movieId: string | undefined;

  statuses: string[] = ['Plan to Watch', 'Watching', 'Watched'];
  ratings: number[] = range(1, 10);
  lists: { id: string; title: string }[] = [];
  currentList: string = '';
  currentStatus: string = '';
  currentRating: number | string = '';

  constructor(
    private listService: ListService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listService.getUserLists().subscribe((res) => {
      this.lists = res.data;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onSubmit() {
    console.log('Submit');

    if (this.form.invalid) {
      this.notificationService.showError(
        'Please fill out the required form fields'
      );
      return;
    }

    if (!this.movieId) {
      this.notificationService.showError('Movie id missing');
    }

    const data = {
      movieId: this.movieId,
      listId: this.form.value.list,
      status: this.form.value.status,
      rating: this.form.value.rating,
    } as AddMovieRequest;

    console.log(`Valid: ${this.form.valid}`);
    console.log(this.form.value);

    const observer = {
      next: (res: any) => {
        this.notificationService.showSuccess('Movie added to list');
      },
      error: (err: any) => {
        this.notificationService.showError(err.message);
      },
    };

    this.listService.addToList(data).subscribe(observer);
  }
}
