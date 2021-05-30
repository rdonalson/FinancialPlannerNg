import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { TestHomeComponent } from './test-home.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoViewComponent } from './todo/todo-view/todo-view.component';
import { TestFeatureComponent } from './test-feature/test-feature.component';
import { TestRoutingModule } from './test-routing.module';
import { TableTestingComponent } from './table-testing/table-testing.component';
import { CreditOrDebitPipe } from './common/pipes/credit-or-debit.pipe';
import { ItemTypePipe } from './common/pipes/item-type.pipe';
import { DataTransformationComponent } from './data-transformation/data-transformation.component';
import { DataTransformationService } from './common/services/data-transform.service';
import { DisplayService } from './common/services/display/display.service';


@NgModule({
  declarations: [
    TestHomeComponent,
    DashboardComponent,
    TestFeatureComponent,
    TodoViewComponent,
    TodoEditComponent,
    TableTestingComponent,
    CreditOrDebitPipe,
    ItemTypePipe,
    DataTransformationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    ToastModule,
    TestRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MessageService,
    DisplayService,
    DataTransformationService
  ]
})
export class TestModule { }
