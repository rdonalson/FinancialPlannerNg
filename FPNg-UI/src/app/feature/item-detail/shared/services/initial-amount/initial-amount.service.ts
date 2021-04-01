import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHelperService } from 'src/app/core/services/error/error-helper.service';

import * as auth from '../../../../../shared/auth-config.json';
import { InitialAmount } from '../../models/initial-amount';

@Injectable()
export class InitialAmountService {
  private url = auth.resources.todoListApi.resourceUri + '/initialamounts';
  constructor(
    private http: HttpClient,
    private err: ErrorHelperService
  ) {}

  getInitialAmount(userId: string): Observable<InitialAmount> {
    const url = `${this.url}/${userId}`;
    return this.http.get<InitialAmount>(url)
      .pipe(
        tap(data => {
          console.log('getInitialAmount: ' + JSON.stringify(data));
        }),
        catchError(this.err.handleError)
      );
  }

}
