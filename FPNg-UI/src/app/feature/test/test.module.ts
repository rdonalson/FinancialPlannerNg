import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestHomeComponent } from './test-home.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoViewComponent } from './todo/todo-view/todo-view.component';
import { TestFeatureComponent } from './test-feature/test-feature.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TestRoutingModule } from './test-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TestHomeComponent,
    DashboardComponent,
    TestFeatureComponent,
    TodoViewComponent,
    TodoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    TestRoutingModule

  ]
})
export class TestModule { }
