import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(private router: Router) { }
  goHome(): void {
    this.router.navigate(['home']);
  }
}
