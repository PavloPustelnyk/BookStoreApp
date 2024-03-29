import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private notifier: NotifierService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 0) {
              alert('Server is not responding');
            }

            if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              this.router.navigate(['/login']);
            }

            if (err.status === 404) {
              this.router.navigate(['/404']);
            }

            if (err.status === 400) {
            }
            console.log(request, err, err.error);

            return throwError(err);
        }));
    }
}
