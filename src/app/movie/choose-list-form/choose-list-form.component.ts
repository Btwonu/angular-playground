import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { ListService } from 'src/app/shared/services/list/list.service';
import { AddMovieRequest } from 'src/app/types/list';
import { range } from 'src/app/shared/utils/functions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-list-form',
  templateUrl: './choose-list-form.component.html',
  styleUrls: ['./choose-list-form.component.scss'],
})
export class ChooseListFormComponent implements OnInit {
  @ViewChild('chooseListForm') form!: NgForm;
  @ViewChild('status') status!: NgModel;
  @ViewChild('list') list!: NgModel;

  statuses: string[] = ['Plan to Watch', 'Watching', 'Watched'];
  ratings: number[] = range(1, 10);
  lists: { id: string; title: string }[] = [];
  currentList: string = '';
  currentStatus: string = '';
  currentRating: number | string = '';
  movieId = '';

  constructor(
    private listService: ListService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChooseListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieId: string }
  ) {
    this.movieId = data.movieId;
  }

  ngOnInit(): void {
    this.listService.getUserLists().subscribe((res) => {
      this.lists = res.data;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  addToList() {
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
        this.dialogRef.close();
      },
      error: (err: any) => {
        this.notificationService.showError(err.message);
      },
    };

    this.listService.addToList(data).subscribe(observer);
  }

  createNewList() {
    console.log('Create new list');
  }
}
