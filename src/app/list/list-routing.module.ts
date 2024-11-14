import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListListComponent } from './list-list/list-list.component';
import { ListDetailComponent } from './list-detail/list-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListListComponent,
  },
  {
    path: ':id',
    component: ListDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
