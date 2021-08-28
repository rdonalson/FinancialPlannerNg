/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  pageTitle: string = 'Navigation';
  message: string = 'Page not found!';
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }

}
