import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCoreComponent } from './test-core/test-core.component';
import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TestCoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: []
})
export class CoreModule { }
