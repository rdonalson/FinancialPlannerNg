/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { IImage } from '../../model/image';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private images!: IImage[];

  constructor() {
    this.initializeImages();
  }

  public get Images(): IImage[] {
    return this.images;
  }

  private initializeImages(): void {
    this.images = [
      {
        previewImageSrc: 'assets/images/galleria/1LE.jpg',
        thumbnailImageSrc: 'assets/images/galleria/1LEs.jpg',
        alt: 'Description for Image 1LE A',
        title: '1LE A'
      },
      {
        previewImageSrc: 'assets/images/galleria/1LE2.jpg',
        thumbnailImageSrc: 'assets/images/galleria/1LE2s.jpg',
        alt: 'Description for Image 1LE B',
        title: '1LE B'
      },
      {
        previewImageSrc: 'assets/images/galleria/1LE3.jpg',
        thumbnailImageSrc: 'assets/images/galleria/1LE3s.jpg',
        alt: 'Description for Image 1LE C',
        title: '1LE C'
      },
      {
        previewImageSrc: 'assets/images/galleria/Me.jpg',
        thumbnailImageSrc: 'assets/images/galleria/Mes.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Me on Trammel'
      },
      {
        previewImageSrc: 'assets/images/galleria/DavesCreekDr@DavesCreekRd.jpg',
        thumbnailImageSrc: 'assets/images/galleria/DavesCreekDr@DavesCreekRds.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Daves Creek Dr @ Daves Creek Rd'
      },
      {
        previewImageSrc: 'assets/images/galleria/AllertonLn@AlysburyWay.jpg',
        thumbnailImageSrc: 'assets/images/galleria/AllertonLn@AlysburyWays.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Allerton Ln @ Alysbury Way'
      },
      {
        previewImageSrc: 'assets/images/galleria/DavisLoveDr@LandsdowneCt.jpg',
        thumbnailImageSrc: 'assets/images/galleria/DavisLoveDr@LandsdowneCts.jpg',
        alt: 'Description for Image 1LE C',
        title: 'DavisLove Dr @ Landsdowne Ct'
      },
      {
        previewImageSrc: 'assets/images/galleria/SCCA@AtlantaMotorSpeedway.jpg',
        thumbnailImageSrc: 'assets/images/galleria/SCCA@AtlantaMotorSpeedways.jpg',
        alt: 'Description for Image 1LE C',
        title: 'SCCA @ Atlanta Motor Speedway'
      },
      {
        previewImageSrc: 'assets/images/galleria/JamesCreek.jpg',
        thumbnailImageSrc: 'assets/images/galleria/JamesCreeks.jpg',
        alt: 'Description for Image 1LE C',
        title: 'James Creek'
      },
      {
        previewImageSrc: 'assets/images/galleria/BenningtonC.jpg',
        thumbnailImageSrc: 'assets/images/galleria/BenningtonCs.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Bennington C'
      },
      {
        previewImageSrc: 'assets/images/galleria/WindermereDr@StratfordAptFacingWest.jpg',
        thumbnailImageSrc: 'assets/images/galleria/WindermereDr@StratfordAptFacingWests.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Windermere Dr @ Stratford Apt Facing West'
      },
      {
        previewImageSrc: 'assets/images/galleria/ChattahoocheRiveClubTennis.jpg',
        thumbnailImageSrc: 'assets/images/galleria/ChattahoocheRiveClubTenniss.jpg',
        alt: 'Description for Image 1LE C',
        title: '1LE C'
      },
      {
        previewImageSrc: 'assets/images/galleria/RiverClubDr.jpg',
        thumbnailImageSrc: 'assets/images/galleria/RiverClubDrs.jpg',
        alt: 'Description for Image 1LE C',
        title: 'River Club Dr'
      },
      {
        previewImageSrc: 'assets/images/galleria/WindermereGolfClub@StanfordDr.jpg',
        thumbnailImageSrc: 'assets/images/galleria/WindermereGolfClub@StanfordDrs.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Windermere Golf Club @ Stanford Dr'
      },
      {
        previewImageSrc: 'assets/images/galleria/Bennington.jpg',
        thumbnailImageSrc: 'assets/images/galleria/Benningtons.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Bennington'
      },
      {
        previewImageSrc: 'assets/images/galleria/Trammel.jpg',
        thumbnailImageSrc: 'assets/images/galleria/Trammels.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Trammel'
      },
      {
        previewImageSrc: 'assets/images/galleria/BenningtonB.jpg',
        thumbnailImageSrc: 'assets/images/galleria/BenningtonBs.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Bennington B'
      },
      {
        previewImageSrc: 'assets/images/galleria/ColwynCt.jpg',
        thumbnailImageSrc: 'assets/images/galleria/ColwynCts.jpg',
        alt: 'Description for Image 1LE C',
        title: 'Colwyn Ct'
      }
    ];
  }
}
