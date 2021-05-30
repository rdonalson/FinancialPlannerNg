import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ItemDetailModule } from './item-detail/item-detail.module';
import { TestModule } from './test/test.module';

@NgModule({

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    FeatureRoutingModule,
    TestModule,
    ItemDetailModule
  ],
  exports: [],
  providers: [
  ]
})
export class FeatureModule { }
