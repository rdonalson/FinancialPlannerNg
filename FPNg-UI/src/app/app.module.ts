import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit, } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    AdminModule,
    FeatureModule,
    MsalModule.forRoot({
      auth: {
        clientId: '46210cab-dd4b-4f6c-879c-724e49dbf770',
        authority: 'https://login.microsoftonline.com/62eca109-81a1-4fc4-9632-836e490ab4b7',
        redirectUri: 'http://localhost:1000/home',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
      {
        popUp: !isIE,
        consentScopes: [
          'user.read',
          'openid',
          'profile',
        ],
        unprotectedResources: [],
        protectedResourceMap: [
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ],
        extraQueryParameters: {}
      })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
