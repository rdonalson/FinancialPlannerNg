import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FeatureRoutingModule } from './feature-routing.module';
import { TestFeatureComponent } from './test-feature/test-feature.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TestFeatureComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FeatureRoutingModule
  ],
  exports: []
})
export class FeatureModule { }
