import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './display-home.component.html',
  styleUrls: ['./display-home.component.scss']
})
export class DisplayHomeComponent implements OnInit {
  pageTitle = 'Display';
  activeIndex = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  calculate(): void {}

}
