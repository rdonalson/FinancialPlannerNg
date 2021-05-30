/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ILedgerVM } from '../common/models/ledger';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ledgerList!: ILedgerVM[];
  constructor(
  ) { }

  ngOnInit(): void {
    this.ledgerList = [{
      rollupKey: 29,
      year: 2021,
      wDate: new Date('2021-01-30T00:00:00'),
      creditSummary: 0,
      debitSummary: 0,
      net: 0,
      runningTotal: 2300,
      itemCount: 0,
      items: []
    },
    {
      rollupKey: 30,
      year: 2021,
      wDate: new Date('2021-01-31T00:00:00'),
      creditSummary: 0,
      debitSummary: 0,
      net: 0,
      runningTotal: 2300,
      itemCount: 0,
      items: []
    },
    {
      rollupKey: 31,
      year: 2021,
      wDate: new Date('2021-02-01T00:00:00'),
      creditSummary: 5000,
      debitSummary: -2300,
      net: 2700,
      runningTotal: 5000,
      itemCount: 3,
      items: [
        {
          itemKey: 1,
          occurrenceDate: new Date('2021-02-01T00:00:00'),
          itemType: 2,
          periodName: 'Monthly',
          name: 'Rent',
          amount: -1500
        },
        {
          itemKey: 2,
          occurrenceDate: new Date('2021-02-01T00:00:00'),
          itemType: 2,
          periodName: 'Monthly',
          name: 'Car Payment',
          amount: -800
        },
        {
          itemKey: 3,
          occurrenceDate: new Date('2021-02-01T00:00:00'),
          itemType: 2,
          periodName: 'Monthly',
          name: 'Paycheck',
          amount: 5000
        }
      ]
    },
    {
      rollupKey: 32,
      year: 2021,
      wDate: new Date('2021-02-02T00:00:00'),
      creditSummary: 0,
      debitSummary: 0,
      net: 0,
      runningTotal: 5000,
      itemCount: 0,
      items: []
    },
    {
      rollupKey: 33,
      year: 2021,
      wDate: new Date('2021-02-03T00:00:00'),
      creditSummary: 0,
      debitSummary: 0,
      net: -800,
      runningTotal: 5000,
      itemCount: 1,
      items: [
        {
          itemKey: 1,
          occurrenceDate: new Date('2021-02-03T00:00:00'),
          itemType: 2,
          periodName: 'Monthly',
          name: 'ATT',
          amount: -800
        },
      ]
    }
    ];
  }


}








