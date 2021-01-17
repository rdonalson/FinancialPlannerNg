import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { MenuItem } from 'primeng/api';
import { authConfig, DiscoveryDocumentConfig } from 'src/app/admin/auth.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  message!: string;
  url: string = 'https://localhost:5001/api/values';

  items: MenuItem[] = [];
  user: string = 'Ricky D';
  title = 'Financial Planner Ng';
  loggedIn = false;
  userInfo: string = 'https://dssorg.b2clogin.com/dssorg.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_edit_profile';

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

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.configure();
    this.oauthService.tryLoginImplicitFlow();
  }

  public getMessage(): void {
    this.http.get(this.url, { responseType: 'text' })
      .subscribe(r => {
        this.message = r;
        console.log('message: ', this.message);
      });
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  editProfile(): void {
  // editProfile

  }

  public get claims(): any {
    let claims: any;
    claims = this.oauthService.getIdentityClaims();
    return claims;
  }

  private configure(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocument(DiscoveryDocumentConfig.url);
  }

}
