/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { ILedgerVM } from '../shared/view-models/ledger-vm';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() ledgerList: ILedgerVM[] = [];

  constructor() {}

  ngOnInit(): void {}

}
