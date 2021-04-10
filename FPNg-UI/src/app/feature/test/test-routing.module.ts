import { NgModule } from '@angular/core';
import { TestHomeComponent } from './test-home.component';
import { Routes, RouterModule } from '@angular/router';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoViewComponent } from './todo/todo-view/todo-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestFeatureComponent } from './test-feature/test-feature.component';

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
            { path: 'todo',
              children: [
                { path: '', component: TodoViewComponent },
                { path: 'edit/:id', component: TodoEditComponent }
              ]
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
