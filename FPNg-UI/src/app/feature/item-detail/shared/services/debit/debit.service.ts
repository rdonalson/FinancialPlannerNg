/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwDebit } from '../../models/vwdebit';
import { IDebit } from '../../models/debit';

@Injectable({
  providedIn: 'root'
})
export class DebitService {
  private url = auth.resources.api.resourceUri + '/debits';
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets all of the Debits for this user
   *
   * @param {string} userId User's OID from Login
   * @returns {Observable<IVwDebit[]>} returns the records
   */
  getDebits(userId: string): Observable<IVwDebit[]> {
    const url = `${this.url}/${userId}/list`;
    return this.http.get<IVwDebit[]>(url)
      .pipe(
        // tap((data: VwDebit[]) => console.log('Service getDebits: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Debit
   *
   * @param {number} id The id of the Debit
   * @returns {Observable<IDebit>} return the record
   */
  getDebit(id: number): Observable<IDebit> {
    const url = `${this.url}/${id}`;
    return this.http.get<IDebit>(url)
      .pipe(
        // tap((data: Debit) => console.log('Service getDebit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads

  //#region Writes
  /**
   * Creates a new Debit Record
   *
   * @param {IDebit} debit The new record to be added
   * @returns {Observable<IDebit>} return the record
   */
  createDebit(debit: IDebit): Observable<IDebit> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<IDebit>(this.url, debit, { headers })
      .pipe(
        // tap((data: IDebit) => console.log('Service createDebit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates a specific Debit Record
   *
   * @param {IDebit} debit The new record to be updated
   * @returns {Observable<IDebit>} return the record
   */
  updateDebit(debit: IDebit): Observable<IDebit> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${debit.pkDebit}`;
    return this.http.put<IDebit>(url, debit, { headers })
      .pipe(
        // tap(() => console.log('updateDebit: ' + debit.pkDebit)),
        // Return the Debit on an update
        map(() => debit),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Deletes a specific Debit Record
   *
   * @param {number} id The id of the Debit
   * @returns {Observable<IDebit>} return the record
   */
  deleteDebit(id: number): Observable<null> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<IDebit>(url, { headers })
      .pipe(
        // tap((data: any) => console.log('Service deleteDebit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Writes
}
