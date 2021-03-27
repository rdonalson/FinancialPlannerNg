import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title!: string;
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }
}
