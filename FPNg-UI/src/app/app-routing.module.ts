import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectiveStrategy } from './core/services/selective-strategy.service';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule)
    // './admin/admin.module#AdminModule'
  },
  {
    path: 'feature', loadChildren: () => import(`./feature/feature.module`).then(m => m.FeatureModule)
    // './feature/feature.module#FeatureModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectiveStrategy // PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
