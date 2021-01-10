import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';

import { FeatureRoutingModule } from './feature-routing.module';
import { TestFeatureComponent } from './test-feature/test-feature.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TestFeatureComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MegaMenuModule,
    ButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FeatureRoutingModule
  ],
  exports: []
})
export class FeatureModule { }
