import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import * as auth from '../../../../../shared/auth-config.json';
import { InitialAmount } from '../../models/initial-amount';

/**
 * Initial Amount Service
 */
@Injectable()
export class InitialAmountService {
  private url = auth.resources.todoListApi.resourceUri + '/initialamounts';

  /**
   * Base Constructor
   * @param {HttpClient} http Used for calling the Apis
   * @param {GlobalErrorHandlerService} err Error Handler
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Gets the Initial Amount for this user
   * @param {string} userId User's OID from Login
   * @returns {Observable<InitialAmount>} return the record
   */
  getInitialAmount(userId: string): Observable<InitialAmount> {
    const url = `${this.url}/${userId}`;
    return this.http.get<InitialAmount>(url)
      .pipe(
        tap(data => console.log('getInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Creates the new Initial Amount for the User
   * @param {InitialAmount} initialAmount The new record to be added
   * @returns {Observable<InitialAmount>} return the record
   */
  createInitialAmount(initialAmount: InitialAmount): Observable<InitialAmount> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<InitialAmount>(this.url, initialAmount, { headers })
      .pipe(
        tap(data => console.log('createInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates the Initial Amount
   * @param {InitialAmount} initialAmount The record to be updated
   * @returns {Observable<InitialAmount>} return the record
   */
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
