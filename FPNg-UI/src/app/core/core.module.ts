import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCoreComponent } from './test-core/test-core.component';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [TestCoreComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: []
})
export class CoreModule { }
