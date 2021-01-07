import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestFeatureComponent } from './test-feature/test-feature.component';

// tslint:disable-next-line:one-variable-per-declaration
const routes: Routes = [
  { path: 'testfeature', component: TestFeatureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
