import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as auth from '../../../../../shared/auth-config.json';
import { GlobalErrorHandlerService } from 'src/app/core/services/error/global-error-handler.service';
import { VwCredit } from '../../models/vwcredit';
import { Credit } from '../../models/credit';

@Injectable()
export class CreditService {
  private url = auth.resources.todoListApi.resourceUri + '/credits';
  constructor(
    private http: HttpClient,
    private err: GlobalErrorHandlerService
  ) { }

  createCredit(credit: Credit): Observable<Credit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Credit>(this.url, credit, { headers })
      .pipe(
        tap(data => console.log('createCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }


  getCredit(id: number): Observable<Credit> {
    const url = `${this.url}/${id}`;
    return this.http.get<Credit>(url)
      .pipe(
        tap(data => console.log('getCredit: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }

  getCredits(userId: string): Observable<VwCredit[]> {
    const url = `${this.url}/${userId}/list`;
    return this.http.get<VwCredit[]>(url)
      .pipe(
        tap(data => console.log('getCredits: ' + JSON.stringify(data))),
        catchError((err: any) => this.err.handleError(err))
      );
  }
}
