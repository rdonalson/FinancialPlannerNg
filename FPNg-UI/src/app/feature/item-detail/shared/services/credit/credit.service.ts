import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { VwCredit } from '../../models/vwcredit';
import { ICredit } from '../../models/credit';

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
   * @returns {Observable<ICredit>} return the record
   */
  getCredit(id: number): Observable<ICredit> {
    const url = `${this.url}/${id}`;
    return this.http.get<ICredit>(url)
      .pipe(
        // tap((data: Credit) => console.log('Service getCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Creates the new Credit for the User
   * @param {ICredit} credit The new record to be added
   * @returns {Observable<ICredit>} return the record
   */
  createCredit(credit: ICredit): Observable<ICredit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ICredit>(this.url, credit, { headers })
      .pipe(
        tap((data: ICredit) => console.log('Service createCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates the Credit
   * @param {ICredit} credit The new record to be updated
   * @returns {Observable<ICredit>} return the record
   */
  updateCredit(credit: ICredit): Observable<ICredit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${credit.pkCredit}`;
    return this.http.put<ICredit>(url, credit, { headers })
      .pipe(
        // tap(() => console.log('updateCredit: ' + credit.pkCredit)),
        // Return the Credit on an update
        map(() => credit),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  deleteCredit(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<ICredit>(url, { headers })
      .pipe(
        tap((data: any) => console.log('Service deleteCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
