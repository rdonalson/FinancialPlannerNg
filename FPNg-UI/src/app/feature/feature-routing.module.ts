import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestFeatureComponent } from './test/test-feature/test-feature.component';
import { TodoEditComponent } from './test/todo-edit/todo-edit.component';
import { TodoViewComponent } from './test/todo-view/todo-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Dashboard', component: DashboardComponent
      },
      {
        path: 'test/Todo', // component: TodoViewComponent,
        children: [
          { path: 'view', component: TodoViewComponent },
          { path: 'edit/:id', component: TodoEditComponent }

        ]
      },
      {
        path: 'test/Feature-A', component: TestFeatureComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
