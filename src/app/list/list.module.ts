import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListListComponent } from './list-list/list-list.component';
import { MatCardModule } from '@angular/material/card';
import { ListComponent } from './list/list.component';
import { HeroComponent } from './hero/hero.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateListFormComponent } from './create-list-form/create-list-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

console.log('lists module');

@NgModule({
  declarations: [
    ListListComponent,
    ListComponent,
    HeroComponent,
    CreateListFormComponent,
    ListDetailComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class ListModule {}
