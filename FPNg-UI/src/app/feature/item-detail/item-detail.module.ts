import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { InitialAmountService } from './shared/services/initial-amount/initial-amount.service';


@NgModule({
  declarations: [
    InitialAmountComponent,
    ItemDetailHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputNumberModule,
    ItemDetailRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MessageService,
    InitialAmountService
  ]
})
export class ItemDetailModule { }
