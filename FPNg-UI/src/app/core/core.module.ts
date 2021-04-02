import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandlerService } from './services/error/global-error-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ]
})
export class CoreModule { }

/** Archive */
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorIntercept } from './services/error/error.interceptor';
// { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
// GlobalErrorHandlerService,
