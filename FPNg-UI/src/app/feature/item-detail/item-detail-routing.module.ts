import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditEditComponent } from './credit/credit-edit/credit-edit.component';

import { CreditListComponent } from './credit/credit-list/credit-list.component';
import { DebitEditComponent } from './debit/debit-edit/debit-edit.component';
import { DebitListComponent } from './debit/debit-list/debit-list.component';
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
              { path: 'edit/:id', component: CreditEditComponent }
            ]
          },
          {
            path: 'debit',
            children: [
              { path: '', component: DebitListComponent },
              { path: 'edit/:id', component: DebitEditComponent }
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
