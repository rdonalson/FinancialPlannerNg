import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './services/error/error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true }
  ]
})
export class CoreModule { }
