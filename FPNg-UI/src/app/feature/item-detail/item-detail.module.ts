import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailHomeComponent } from './item-detail-home.component';

@NgModule({
  declarations: [
    InitialAmountComponent,
    ItemDetailHomeComponent
  ],
  imports: [
    CommonModule,
    ItemDetailRoutingModule
  ]
})
export class ItemDetailModule { }
