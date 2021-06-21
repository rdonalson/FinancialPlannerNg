/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  value: string = '';
  constructor() {}
  ngOnInit(): void {
    const dte = new Date();
    this.value = `Financial Planner Ng ${dte.getFullYear()}`;
  }

}
