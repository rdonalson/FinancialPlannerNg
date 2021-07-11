/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IVwCredit } from '../../models/vwcredit';
import { ICredit } from '../../models/credit';

/**
 * Credit Service
 */
@Injectable()
export class CreditService {
  private url = auth.resources.api.resourceUri + '/credits';
  /**
   * Base Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets all of the Credits for this user
   *
   * @param {string} userId User's OID from Login
   * @returns {Observable<IVwCredit[]>} returns the records
   */
  getCredits(userId: string): Observable<IVwCredit[]> {
    const url = `${this.url}/${userId}/list`;
    return this.http.get<IVwCredit[]>(url)
      .pipe(
        // tap((data: VwCredit[]) => console.log('Service getCredits: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Credit
   *
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
  //#endregion Reads

  //#region Writes
  /**
   * Creates a new Credit Record
   *
   * @param {ICredit} credit The new record to be added
   * @returns {Observable<ICredit>} return the record
   */
  createCredit(credit: ICredit): Observable<ICredit> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<ICredit>(this.url, credit, { headers })
      .pipe(
        // tap((data: ICredit) => console.log('Service createCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Updates a specific Credit Record
   *
   * @param {ICredit} credit The new record to be updated
   * @returns {Observable<ICredit>} return the record
   */
  updateCredit(credit: ICredit): Observable<ICredit> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${credit.pkCredit}`;
    return this.http.put<ICredit>(url, credit, { headers })
      .pipe(
        // tap(() => console.log('updateCredit: ' + credit.pkCredit)),
        // Return the Credit on an update
        map(() => credit),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Deletes a specific Credit Record
   *
   * @param {number} id The id of the Credit
   * @returns {Observable<ICredit>} return the record
   */
  deleteCredit(id: number): Observable<null> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<ICredit>(url, { headers })
      .pipe(
        // tap((data: any) => console.log('Service deleteCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Writes
}
