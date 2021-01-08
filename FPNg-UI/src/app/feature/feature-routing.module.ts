import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestFeatureComponent } from './test-feature/test-feature.component';

const routes: Routes = [
  { path: 'test-feature',
    children: [
      { path: 'feature-A', component: TestFeatureComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
