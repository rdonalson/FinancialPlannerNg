import { Component, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Logger, CryptoUtils } from 'msal';
import { b2cPolicies, isIE } from 'src/app/app-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  subscriptions: Subscription[] = [];
  user: string = 'Ricky D';
  title = 'Azure AD B2C';
  isIframe = false;
  loggedIn = false;

  // constructor(private broadcastService: BroadcastService, private authService: MsalService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              },

            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: { unsubscribe: () => any; }) => subscription.unsubscribe());
  }

  // other methods
  checkAccount(): void {
    // this.loggedIn = !!this.authService.getAccount();
  }

  login(): void {
    // if (isIE) {
    //   this.authService.loginRedirect();
    // } else {
    //   this.authService.loginPopup();
    // }

    this.loggedIn = true;
  }

  logout(): void {
    // this.authService.logout();

    this.loggedIn = false;
  }

  editProfile(): void {
    // if (isIE) {
    //   this.authService.loginRedirect(b2cPolicies.authorities.editProfile);
    // } else {
    //   this.authService.loginPopup(b2cPolicies.authorities.editProfile);
    // }
  }
}
