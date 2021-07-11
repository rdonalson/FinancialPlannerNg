import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { IPeriod } from '../../models/period';

/**
 * Period Service
 */
@Injectable()
export class PeriodService {
  private url = auth.resources.api.resourceUri + '/periods';
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  //#region Reads
  /**
   * Gets all of the Periods for use in UI Selectors
   *
   * @returns {Observable<IPeriod[]>} returns the records
   */
  getPeriods(): Observable<IPeriod[]> {
    return this.http.get<IPeriod[]>(this.url)
      .pipe(
        // tap((data: Period[]) => console.log('Service getPeriods: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  /**
   * Get a specific Period
   * @param {number} id The id of the Period
   * @returns {Observable<IPeriod>} return the record
   */
  getPeriod(id: number): Observable<IPeriod> {
    const url = `${this.url}/${id}`;
    return this.http.get<IPeriod>(url)
      .pipe(
        // tap((data: Period) => console.log('Service getPeriod: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
  //#endregion Reads
}
