import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { PrimeNGConfig, SharedModule } from 'primeng/api';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { FooterComponent } from './shared/layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AdminModule,
    FeatureModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
      this.primengConfig.ripple = true;
  }

}
