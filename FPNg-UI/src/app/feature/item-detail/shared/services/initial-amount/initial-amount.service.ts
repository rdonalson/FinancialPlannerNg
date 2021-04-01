import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHelperService } from 'src/app/core/services/error/error-helper.service';

import * as auth from '../../../../../shared/auth-config.json';
import { InitialAmount } from '../../models/initial-amount';

@Injectable()
export class InitialAmountService {
  private url = auth.resources.todoListApi.resourceUri + '/initialamounts';
  constructor(
    private http: HttpClient,
    private err: ErrorHelperService
  ) { }

  getInitialAmount(userId: string): Observable<InitialAmount> {
    const url = `${this.url}/${userId}`;
    return this.http.get<InitialAmount>(url)
      .pipe(catchError(this.err.handleError));
  }

  createInitialAmount(initialAmount: InitialAmount): Observable<InitialAmount> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    initialAmount.pkInitialAmount = 0;
    return this.http.post<InitialAmount>(this.url, initialAmount, { headers })
      .pipe(
        tap(data => console.log('createInitialAmount: ' + JSON.stringify(data))),
        catchError(this.err.handleError)
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
        catchError(this.err.handleError)
      );
  }
}
