/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import * as auth from '../../../../../shared/auth-config.json';
import { IInitialAmount } from '../../models/initial-amount';

/**
 * Initial Amount Service
 */
@Injectable()
export class InitialAmountService {
  private url = auth.resources.api.resourceUri + '/initialamounts';

  /**
   * Base Constructor   *
   * @param {HttpClient} http Used for calling the Apis
   * @param {GlobalErrorHandlerService} err Error Handler
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets the Initial Amount for this user
   *
   * @param {string} userId User's OID from Login
   * @returns {Observable<IInitialAmount>} return the record
   */
  getInitialAmount(userId: string): Observable<IInitialAmount> {
    const url = `${this.url}/${userId}`;
    return this.http.get<IInitialAmount>(url)
      .pipe(
        // tap(data => console.log('getInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads

  //#region Writes
  /**
   * Creates the new Initial Amount for the User
   *
   * @param {IInitialAmount} initialAmount The new record to be added
   * @returns {Observable<IInitialAmount>} return the record
   */
  createInitialAmount(initialAmount: IInitialAmount): Observable<IInitialAmount> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<IInitialAmount>(this.url, initialAmount, { headers })
      .pipe(
        // tap(data => console.log('createInitialAmount: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates the Initial Amount
   *
   * @param {IInitialAmount} initialAmount The record to be updated
   * @returns {Observable<IInitialAmount>} return the record
   */
  updateInitialAmount(initialAmount: IInitialAmount): Observable<IInitialAmount> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${initialAmount.userId}`;
    return this.http.put<IInitialAmount>(url, initialAmount, { headers })
      .pipe(
        // tap(() => console.log('updateInitialAmount: ' + initialAmount.pkInitialAmount)),
        // Return the product on an update
        map(() => initialAmount),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Writes
}
