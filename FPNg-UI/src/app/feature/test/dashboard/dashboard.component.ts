import { Component, OnInit } from '@angular/core';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  claims: any = null;
  constructor() { }
  ngOnInit(): void {
    this.claims = JSON.parse(localStorage.getItem('claims') || '{}');
  }

}
