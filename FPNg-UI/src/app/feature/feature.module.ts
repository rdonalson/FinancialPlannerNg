import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FeatureRoutingModule } from './feature-routing.module';
import { TestFeatureComponent } from './test/test-feature/test-feature.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoViewComponent } from './test/todo-view/todo-view.component';
import { TodoEditComponent } from './test/todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    TestFeatureComponent,
    DashboardComponent,
    TodoViewComponent,
    TodoEditComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FeatureRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  exports: []
})
export class FeatureModule { }
