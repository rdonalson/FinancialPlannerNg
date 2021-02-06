// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, OnInit,  } from '@angular/core';
// import { OAuthModule } from 'angular-oauth2-oidc';
// import { PrimeNGConfig } from 'primeng/api';

// import { AppComponent } from './app.component';
// import { AdminModule } from './admin/admin.module';
// import { AppRoutingModule } from './app-routing.module';
// import { CoreModule } from './core/core.module';
// import { FeatureModule } from './feature/feature.module';
// import { SharedModule } from './shared/shared.module';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     SharedModule,
//     CoreModule,
//     AdminModule,
//     FeatureModule,
//     OAuthModule.forRoot({
//       resourceServer: {
//           allowedUrls: [
//             'https://fpngapi.azurewebsites.net/api',
//             'https://localhost:5001/api'
//           ],
//           sendAccessToken: true
//       }
//     })
//   ],
//   providers: [],
//   bootstrap: [ AppComponent ]
// })
// export class AppModule implements OnInit {

//   constructor(private primengConfig: PrimeNGConfig) {}

//   // tslint:disable-next-line:contextual-lifecycle
//   ngOnInit(): void {
//       this.primengConfig.ripple = true;
//   }

// }
