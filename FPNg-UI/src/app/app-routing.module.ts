import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SelectiveStrategy } from './core/services/selective-strategy.service';

// tslint:disable-next-line:one-variable-per-declaration
const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule)
    // './admin/admin.module#AdminModule'
  },
  {
    path: 'core', loadChildren: () => import(`./core/core.module`).then(m => m.CoreModule)
    // './core/core.module#CoreModule'
  },
  {
    path: 'shared', loadChildren: () => import(`./shared/shared.module`).then(m => m.SharedModule)
    // './shared/shared.module#SharedModule'
  },

  {
    path: 'feature', loadChildren: () => import(`./feature/feature.module`).then(m => m.FeatureModule)
    // './feature/feature.module#FeatureModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: SelectiveStrategy // PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
