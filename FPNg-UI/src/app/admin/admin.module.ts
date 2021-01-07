import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from '../app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    AdminRoutingModule
  ],
  exports: []
})
export class AdminModule { }
