import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { TestCoreComponent } from './test-core/test-core.component';

@NgModule({
  declarations: [TestCoreComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: []
})
export class CoreModule { }
