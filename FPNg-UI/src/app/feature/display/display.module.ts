import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayHomeComponent } from './display-home.component';
import { DisplayService } from './shared/services/display/display.service';

@NgModule({
  declarations: [DisplayHomeComponent],
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    CalendarModule,
    DisplayRoutingModule
  ],
  providers: [
    DisplayService
  ]
})
export class DisplayModule { }
