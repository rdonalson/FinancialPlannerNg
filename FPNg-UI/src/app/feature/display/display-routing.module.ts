import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayHomeComponent } from './display-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'display',
        children: [
          { path: '', component: DisplayHomeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }
