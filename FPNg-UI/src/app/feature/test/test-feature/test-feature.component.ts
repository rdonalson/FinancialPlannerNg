import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './test-feature.component.html',
  styleUrls: ['./test-feature.component.scss']
})
export class TestFeatureComponent implements OnInit {

  title!: string;
  claims: any;

  constructor() { }

  ngOnInit(): void {
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}'); // JSON.parse(obj);
  }
  
  upper(): void {
    this.title = this.title.toUpperCase();
  }
}
