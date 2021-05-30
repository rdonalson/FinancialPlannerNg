import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetailHomeComponent } from './item-detail/item-detail-home.component';
import { TestHomeComponent } from './test/test-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item-detail', component: ItemDetailHomeComponent,
      },
      // {
      //   path: 'display', component: DisplayHomeComponent,
      // },
      {
        path: 'test', component: TestHomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
