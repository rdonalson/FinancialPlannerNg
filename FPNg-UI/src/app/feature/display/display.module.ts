import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { ChartComponent } from './chart/chart.component';
import { LedgerComponent } from './ledger/ledger.component';
import { DisplayService } from './shared/services/display/display.service';
import { DisplayMainComponent } from './display-main.component';
import { CreditOrDebitPipe } from './shared/pipes/credit-or-debit.pipe';
import { ItemTypePipe } from './shared/pipes/item-type.pipe';

@NgModule({
  declarations: [
    DisplayMainComponent,
    LedgerComponent,
    ChartComponent,
    CreditOrDebitPipe,
    ItemTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    CalendarModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DisplayService
  ]
})
export class DisplayModule { }
