import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestFeatureComponent } from './test-feature/test-feature.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'Dashboard', component: DashboardComponent},
      { path: 'feature-A', component: TestFeatureComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
