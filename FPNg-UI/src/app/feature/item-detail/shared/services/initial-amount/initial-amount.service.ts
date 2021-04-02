import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';

import * as auth from '../../../../../shared/auth-config.json';
import { InitialAmount } from '../../models/initial-amount';
// import { GlobalErrorHandlerService } from '../common/global-error-handler.service';

@Injectable()
export class InitialAmountService {
  private url = auth.resources.todoListApi.resourceUri + '/-initialamounts';
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  getInitialAmount(userId: string): Observable<InitialAmount> {
    const url = `${this.url}/${userId}`;
    return this.http.get<InitialAmount>(url)
      .pipe(
        catchError((err: any) => this.err.handleError(err))
      );
  }

  createInitialAmount(initialAmount: InitialAmount): Observable<InitialAmount> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    initialAmount.pkInitialAmount = 0;
    return this.http.post<InitialAmount>(this.url, initialAmount, { headers })
      .pipe(
        tap(data => console.log('createInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  updateInitialAmount(initialAmount: InitialAmount): Observable<InitialAmount> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${initialAmount.userId}`;
    return this.http.put<InitialAmount>(url, initialAmount, { headers })
      .pipe(
        tap(() => console.log('updateInitialAmount: ' + initialAmount.pkInitialAmount)),
        // Return the product on an update
        map(() => initialAmount),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
