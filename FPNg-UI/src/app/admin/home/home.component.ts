/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError } from 'rxjs/operators';
import { IImage } from 'src/app/core/model/image';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { PhotoService } from 'src/app/core/services/photo/photo.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  headerText: string = 'Using the Financial Planner -> Forecast Ledger';

  constructor(
    private authService: MsalService,
    private err: GlobalErrorHandlerService
  ) {
    const photoService: PhotoService = new PhotoService();
    this.images = photoService.Images;
  }
  pageTitle: string = 'Home';
  images: IImage[] = [];

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  display: boolean = false;

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      // next: (result) => console.log(result),
      error: catchError((err: any) => this.err.handleError(err)),
    });
  }

  showDialog(): void {
      this.display = true;
  }

}

