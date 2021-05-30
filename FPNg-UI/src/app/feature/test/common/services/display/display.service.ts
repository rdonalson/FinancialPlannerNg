/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';

import * as auth from '../../../../../shared/auth-config.json';
import { ILedger } from '../../models/ledger';
import { ILedgerParams } from '../../models/ledger-params';

/**
 * Display Service
 */
@Injectable()
export class DisplayService {

  private url = auth.resources.todoListApi.resourceUri + '/display';

  /**
   * Base Constructor
   * @param {HttpClient} http
   * @param {GlobalErrorHandlerService} err
   */
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  /**
   * Calls the "Create Ledger Readout" procedure that generates the Ledger Output;
   * which contains a forecasted Cronological list of credit/debit transactions with a running total
   * out to a future point in time.
   * The timeframe is set by the user
   * @param {ILedgerParams} ledgerParams View model for user parameters
   * @returns {Observable<ILedger[]>} return the record
   */
  createLedger(ledgerParams: ILedgerParams): Observable<ILedger[]> {

    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<ILedger[]>(this.url, ledgerParams, { headers })
      .pipe(
        // tap((data: ILedger[]) => console.log('Service createLedger: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}