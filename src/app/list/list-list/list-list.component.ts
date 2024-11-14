import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/shared/services/list/list.service';
import { List } from 'src/app/types/list';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.scss']
})
export class ListListComponent implements OnInit {
  lists: List[] = [];

  constructor(private listService: ListService) {
    this.listService.getUserLists().subscribe((res) => {
      this.lists = res.data;
    });
  }

  ngOnInit(): void {
  }
}
