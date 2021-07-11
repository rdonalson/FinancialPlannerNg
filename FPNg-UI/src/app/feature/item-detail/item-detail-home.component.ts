/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './item-detail-home.component.html',
  styleUrls: ['./item-detail-home.component.scss']
})
export class ItemDetailHomeComponent implements OnInit {
  pageTitle: string = 'Item Detail';
  constructor(private router: Router) { }
  ngOnInit(): void {}
  initialAmount(): void {
    this.router.navigate(['feature/item-detail/initial-amount']);
  }
  credits(): void {
    this.router.navigate(['feature/item-detail/credit']);
  }
  debits(): void {
    this.router.navigate(['feature/item-detail/debit']);
  }
}
