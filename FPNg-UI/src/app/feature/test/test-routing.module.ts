import { NgModule } from '@angular/core';
import { TestHomeComponent } from './test-home.component';
import { Routes, RouterModule } from '@angular/router';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoViewComponent } from './todo/todo-view/todo-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestFeatureComponent } from './test-feature/test-feature.component';
import { TableTestingComponent } from './table-testing/table-testing.component';
import { DataTransformationComponent } from './data-transformation/data-transformation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
          children: [
            { path: '', component: TestHomeComponent },
            { path: 'dashboard', component: DashboardComponent },
            {
              path: 'test-feature', component: TestFeatureComponent
            },
            {
              path: 'table-testing', component: TableTestingComponent
            },
            { path: 'todo',
              children: [
                { path: '', component: TodoViewComponent },
                { path: 'edit/:id', component: TodoEditComponent }
              ]
            },
            {
              path: 'data-transformation', component: DataTransformationComponent
            },
          ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
