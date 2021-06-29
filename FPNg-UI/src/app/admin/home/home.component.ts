/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { IImage } from 'src/app/core/model/image';
import { PhotoService } from 'src/app/core/services/photo/photo.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  constructor(
    private authService: MsalService,
    private generalUtilService: PhotoService
  ) {
    this.images = generalUtilService.Images;
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }


}
