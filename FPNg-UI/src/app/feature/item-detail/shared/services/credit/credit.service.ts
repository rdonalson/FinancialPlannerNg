import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { VwCredit } from '../../models/vwcredit';
import { Credit } from '../../models/credit';

/**
 * Credit Service
 */
@Injectable()
export class CreditService {
  private url = auth.resources.todoListApi.resourceUri + '/credits';
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Gets all of the Credits for this user
   * @param {string} userId User's OID from Login
   * @returns {Observable<VwCredit[]>} returns the records
   */
  getCredits(userId: string): Observable<VwCredit[]> {
    const url = `${this.url}/${userId}/list`;
    return this.http.get<VwCredit[]>(url)
      .pipe(
        // tap((data: VwCredit[]) => console.log('Service getCredits: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Credit
   * @param {number} id The id of the Credit
   * @returns {Observable<Credit>} return the record
   */
  getCredit(id: number): Observable<Credit> {
    const url = `${this.url}/${id}`;
    return this.http.get<Credit>(url)
      .pipe(
        // tap((data: Credit) => console.log('Service getCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Creates the new Credit for the User
   * @param {Credit} credit The new record to be added
   * @returns {Observable<Credit>} return the record
   */
  createCredit(credit: Credit): Observable<Credit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Credit>(this.url, credit, { headers })
      .pipe(
        tap((data: Credit) => console.log('Service createCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates the Credit
   * @param {Credit} credit The new record to be updated
   * @returns {Observable<Credit>} return the record
   */
  updateCredit(credit: Credit): Observable<Credit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${credit.pkCredit}`;
    return this.http.put<Credit>(url, credit, { headers })
      .pipe(
        tap(() => console.log('updateCredit: ' + credit.pkCredit)),
        // Return the product on an update
        map(() => credit),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}