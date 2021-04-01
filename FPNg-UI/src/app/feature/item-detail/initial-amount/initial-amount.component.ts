import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ErrorHelperService } from 'src/app/core/services/error/error-helper.service';
import { InitialAmount } from '../shared/models/initial-amount';
import { InitialAmountService } from '../shared/services/initial-amount/initial-amount.service';

@Component({
  selector: 'app-initial-amount',
  templateUrl: './initial-amount.component.html',
  styleUrls: ['./initial-amount.component.scss']
})
export class InitialAmountComponent implements OnInit {
  constructor(
    private err: ErrorHelperService,
    private router: Router,
    private intialAmountservice: InitialAmountService
  ) {}

  userId: string = '';
  initialAmount: InitialAmount | undefined;
  initialAmount2: InitialAmount = {
    pkInitialAmount: 9,
    userId: '',
    amount: 550.34,
    beginDate: '2021-04-15'
  };

  ngOnInit(): void {
    const claims = JSON.parse(localStorage.getItem('claims') || '{}');
    this.userId = claims.oid;
    this.initialAmount2.userId = this.userId;
    // this.getInitialAmount(this.userId);
    this.saveInitialAmount();
  }

  saveInitialAmount(): void {
      if (this.initialAmount2.pkInitialAmount === 0) {
        this.intialAmountservice.createInitialAmount(this.initialAmount2)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`The new ${this.initialAmount2.pkInitialAmount} was saved`),
          error: () => catchError(this.err.handleError)
        });
      } else {
        this.intialAmountservice.updateInitialAmount(this.initialAmount2)
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: () => this.onSaveComplete(`The updated ${this.initialAmount2.pkInitialAmount} was saved`),
          error: err => catchError(this.err.handleError)
        });
      }
  }

  onSaveComplete(message?: string): void {
    // Navigate back to the product list
    // this.router.navigate(['/products']);
  }


  getInitialAmount(userId: string): any {
    return this.intialAmountservice.getInitialAmount(userId)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (ia: InitialAmount): void => {
          this.initialAmount = ia;
          console.log(JSON.stringify(this.initialAmount));
        },
        error: () => catchError(this.err.handleError)
      });
  }

}
