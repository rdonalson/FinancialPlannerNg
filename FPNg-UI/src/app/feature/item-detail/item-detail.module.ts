import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { InitialAmountComponent } from './initial-amount/initial-amount.component';
import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailHomeComponent } from './item-detail-home.component';
import { InitialAmountService } from './shared/services/initial-amount/initial-amount.service';
import { CreditListComponent } from './credit/credit-list/credit-list.component';
import { CreditService } from './shared/services/credit/credit.service';
import { CreditEditComponent } from './credit/credit-edit/credit-edit.component';
import { UtilitiesService } from './shared/services/common/utilities.service';
import { PeriodService } from './shared/services/period/period.service';

@NgModule({
  declarations: [
    InitialAmountComponent,
    ItemDetailHomeComponent,
    CreditListComponent,
    CreditEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    ItemDetailRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MessageService,
    UtilitiesService,
    PeriodService,
    InitialAmountService,
    CreditService
  ]
})
export class ItemDetailModule { }
