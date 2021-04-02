import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableInput, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private router: Router) { }
  public handleError(err: HttpErrorResponse): ObservableInput<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errormessage = '';
    if (err.error instanceof ErrorEvent) {
      // a client-side or network error occurred. handle it accordingly.
      errormessage = `an error occurred: ${err.error.message}`;
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong,
      errormessage = `server returned code: ${err.status}, error message is: ${err.message}`;
    }
    this.router?.navigate(['/error']);
    return throwError(errormessage);
  }
}
