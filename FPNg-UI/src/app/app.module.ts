import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { PrimeNGConfig } from 'primeng/api';
import { HomeComponent } from './admin/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './admin/system/page-not-found/page-not-found.component';
import { AdminRoutingModule } from './admin/admin-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminRoutingModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
      this.primengConfig.ripple = true;
  }

}
