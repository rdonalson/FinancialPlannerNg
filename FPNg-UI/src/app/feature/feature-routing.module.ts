import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './test/dashboard/dashboard.component';
import { ItemDetailHomeComponent } from './item-detail/item-detail-home.component';
import { TestFeatureComponent } from './test/test-feature/test-feature.component';
import { TestHomeComponent } from './test/test-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item-detail', component: ItemDetailHomeComponent,
      },
      {
        path: 'test', component: TestHomeComponent,
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
