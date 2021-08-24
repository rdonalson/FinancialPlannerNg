import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GalleriaModule } from 'primeng/galleria';

import { HomeComponent } from './home/home.component';
import { DialogModule } from 'primeng/dialog';

import { PageNotFoundComponent } from './system/page-not-found/page-not-found.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ErrorComponent } from './system/error/error.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    ErrorComponent,
    HelpDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    GalleriaModule,
    DialogModule,
    AdminRoutingModule
  ],
  exports: []
})
export class AdminModule { }
