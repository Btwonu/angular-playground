import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';

const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
    children: [
      {
        path: 'child-a',
        component: ChildAComponent,
        title: 'Child A',
      },
      {
        path: 'child-b',
        component: ChildBComponent,
      },
    ],
  },
  {
    path: 'second',
    component: SecondComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
