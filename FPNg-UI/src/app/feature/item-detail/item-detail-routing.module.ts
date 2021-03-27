import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailHomeComponent } from './item-detail-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'item-detail', // component: HomeComponent,
          children: [
            { path: '', component: ItemDetailHomeComponent },
            { path: 'initial-amount',
              children: [
                { path: '', component: InitialAmountComponent },
                // { path: 'edit/:id', component: TodoEditComponent }
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
