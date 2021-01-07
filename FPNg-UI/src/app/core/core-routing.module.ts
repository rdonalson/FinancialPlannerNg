import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestCoreComponent } from './test-core/test-core.component';

// tslint:disable-next-line:one-variable-per-declaration
const routes: Routes = [

      {path: 'test', component: TestCoreComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
