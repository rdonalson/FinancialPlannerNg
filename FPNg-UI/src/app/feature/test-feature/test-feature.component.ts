import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './test-feature.component.html',
  styleUrls: ['./test-feature.component.scss']
})
export class TestFeatureComponent implements OnInit {

  title!: string;

  constructor() { }

  ngOnInit(): void {
  }
  upper(): void {
    this.title = this.title.toUpperCase();
  }
}
