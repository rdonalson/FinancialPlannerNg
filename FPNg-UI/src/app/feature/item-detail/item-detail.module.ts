import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { InitialAmountService } from './shared/services/initial-amount/initial-amount.service';
// import { GlobalErrorHandlerService } from './shared/services/common/global-error-handler.service';

@NgModule({
  declarations: [
    InitialAmountComponent,
    ItemDetailHomeComponent
  ],
  imports: [
    CommonModule,
    ItemDetailRoutingModule
  ],
  providers: [
    // GlobalErrorHandlerService,
    InitialAmountService
  ]
})
export class ItemDetailModule { }
