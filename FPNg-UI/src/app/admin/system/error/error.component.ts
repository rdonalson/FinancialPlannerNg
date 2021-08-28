/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  pageTitle: string = 'Error';
  message: string = 'An Error has Occurred!';

  constructor(private router: Router) { }
  goHome(): void {
    this.router.navigate(['home']);
  }
}
