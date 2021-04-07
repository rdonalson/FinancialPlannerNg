import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditEditComponent } from './credit/credit-edit/credit-edit.component';
import { CreditListComponent } from './credit/credit-list/credit-list.component';

import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailHomeComponent } from './item-detail-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item-detail',
        children: [
          { path: '', component: ItemDetailHomeComponent },
          {
            path: 'initial-amount',
            children: [
              { path: '', component: InitialAmountComponent }
            ]
          },
          {
            path: 'credit',
            children: [
              { path: '', component: CreditListComponent },
              { path: 'edit', component: CreditEditComponent }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDetailRoutingModule { }
