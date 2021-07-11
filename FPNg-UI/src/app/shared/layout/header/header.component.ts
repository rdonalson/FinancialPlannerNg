/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  claims: any;
  title = 'Financial Planner Ng';
  isIframe: boolean = false;
  loggedIn: boolean = false;
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
    private msalBroadcastService: MsalBroadcastService,
    private err: GlobalErrorHandlerService

  ) { }

  /**
   * Initialize the Page
   */
  ngOnInit(): void {
    this.getMenuItems();
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
      .subscribe({
        next: (result: any) => this.getClaims(result),
        error: catchError((err: any) => this.err.handleError(err))
      });

  }

  /**
   * Initializes the navigation menu
   */
  private getMenuItems(): void {
    this.menuItems = [
      {
        label: 'Item Details',
        items: [{
          label: 'Initial Amount',
          icon: 'pi pi-link',
          routerLink: '/feature/item-detail/initial-amount'
        },
        {
          label: 'Credits',
          icon: 'pi pi-link',
          routerLink: '/feature/item-detail/credit'
        }, {
          label: 'Debits',
          icon: 'pi pi-link',
          routerLink: '/feature/item-detail/debit'
        }
        ]
      },
      {
        label: 'Display',
        items: [
          {
            label: 'Date Range',
            icon: 'pi pi-calendar',
            routerLink: '/feature/display/0'
          },
          {
            label: 'Chart',
            icon: 'pi pi-chart-line',
            routerLink: '/feature/display/1'
          },
          {
            label: 'Ledger',
            icon: 'pi pi-list',
            routerLink: '/feature/display/2'
          }
        ]
      }
    ];
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
          .subscribe(() => this.checkAccount());
      } else {
        this.authService.loginPopup()
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
    this.menuItems = [];
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
