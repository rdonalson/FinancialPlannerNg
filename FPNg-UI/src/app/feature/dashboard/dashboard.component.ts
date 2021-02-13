import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profile: any = null;
  constructor(private authService: MsalService, private http: HttpClient) { }
  ngOnInit(): void {
    // this.getProfile();
  }

  // getProfile(): void {
  //   this.http.get(GRAPH_ENDPOINT)
  //   .subscribe({
  //     next: (profile) => {
  //       this.profile = profile;
  //     },
  //     error: (err: AuthError) => {
  //       // If there is an interaction required error,
  //       // call one of the interactive methods and then make the request again.
  //       if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
  //         this.authService.acquireTokenPopup({
  //           scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT)
  //         })
  //         .then(() => {
  //           this.http.get(GRAPH_ENDPOINT)
  //             .toPromise()
  //             .then(profile => {
  //               this.profile = profile;
  //             });
  //         });
  //       }
  //     }
  //   });
  // }
}
