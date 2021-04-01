import { Component, OnInit } from '@angular/core';
import { InitialAmount } from '../shared/models/initial-amount';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';

@Component({
  selector: 'app-initial-amount',
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {

  observer = {
    next: (ia: InitialAmount): void => {
      this.initialAmount = ia;
      console.log('Observer got a next value: ' + ia);
    },
    error: (err: string) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };
  userId = '8fdbe29e-f25f-450d-b179-92973e2bf7ba';
  initialAmount: InitialAmount | undefined;
  constructor(
    private intialAmountservice: InitialAmountService
  ) {}

  ngOnInit(): void {
    console.log(`getInitialAmount result: ${this.getInitialAmount()}`);
  }


  getInitialAmount(): any {
    return this.intialAmountservice.getInitialAmount(this.userId)
      .subscribe(this.observer);
      // .subscribe((ia: InitialAmount) => {
      //   this.initialAmount = ia;
      // });
      // .subscribe({
      //   next: (ia: InitialAmount) => {
      //     this.initialAmount = ia;
      //     console.log('Observer got a next value: ' + ia);
      //   },
      //   error: err => console.error('Observer got an error: ' + err),
      //   complete: () => console.log('Observer got a complete notification')
      // });
  }


}
