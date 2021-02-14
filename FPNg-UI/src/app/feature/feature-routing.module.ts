import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TestFeatureComponent } from './test/test-feature/test-feature.component';
import { TodoViewComponent } from './test/todo-view/todo-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Dashboard', component: DashboardComponent
      },
      {
        path: 'test/Todo-View', component: TodoViewComponent
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
