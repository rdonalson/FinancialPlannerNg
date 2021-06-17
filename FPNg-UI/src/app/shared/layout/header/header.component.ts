/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  items2: MenuItem[] = [];

  claims: any;
  userName = '';
  oid!: string;
  title = 'Financial Planner Ng';
  isIframe = false;
  loggedIn = false;
  private readonly destroying$ = new Subject<void>();

  /**
   * Base Constructor
   * @param {Router} router
   * @param {MsalGuardConfiguration} msalGuardConfig
   * @param {MsalService} authService
   * @param {MsalBroadcastService} msalBroadcastService
   */
  constructor(
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  /**
   * Initialize the Page
   */
  ngOnInit(): void {

    this.items2 = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
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

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}'); // JSON.parse(obj);

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/
     * blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this.destroying$)
      )
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (result: any) => this.getClaims(result),
        error: (msg) => {
          console.log('Error Getting Location: ', msg);
        }
      });

  }

  /**
   * Once login is complete get the Claims data and save it to localStorage
   * @param {any} result
   */
  getClaims(result: any): void {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
    const claims = JSON.parse(JSON.stringify(result.payload));
    localStorage.setItem('claims', JSON.stringify(claims.idTokenClaims || '{}'));
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}');
  }

  /**
   * Insure that there is a least one account in the Claims data
   */
  checkAccount(): void {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  /**
   * Login Routine
   */
  login(): void {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          // tslint:disable-next-line: deprecation
          .subscribe(() => this.checkAccount());
      } else {
        this.authService.loginPopup()
          // tslint:disable-next-line: deprecation
          .subscribe(() => this.checkAccount());
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  /**
   * Logout Routine
   */
  logout(): void {
    this.router.navigate(['/home']);
    localStorage.removeItem('claims');
    this.authService.logout();
  }

  /**
   * Unsubscribe from events when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }
}
