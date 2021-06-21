import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';

import { ChartComponent } from './chart/chart.component';
import { LedgerComponent } from './ledger/ledger.component';
import { DisplayService } from './shared/services/display/display.service';
import { DisplayMainComponent } from './display-main.component';
import { CreditOrDebitPipe } from './shared/pipes/credit-or-debit.pipe';
import { ItemTypePipe } from './shared/pipes/item-type.pipe';
import { AppConfigService } from './shared/services/app-config/app-config.service';


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
    ProgressSpinnerModule,
    TabViewModule,
    ButtonModule,
    CheckboxModule,
    CalendarModule,
    TooltipModule,
    TableModule,
    ChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DisplayService,
    AppConfigService
  ]
})
export class DisplayModule { }
