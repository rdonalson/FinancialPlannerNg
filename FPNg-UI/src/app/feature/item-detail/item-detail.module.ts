import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { InitialAmountService } from './shared/services/initial-amount/initial-amount.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InitialAmountComponent,
    ItemDetailHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputNumberModule,
    ItemDetailRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    MessageService,
    InitialAmountService
  ]
})
export class ItemDetailModule { }
