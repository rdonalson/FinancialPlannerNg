import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ErrorComponent } from './system/error/error.component';

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ErrorComponent
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
