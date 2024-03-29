import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserDetailed } from '../../_models/_detailed/user-detailed';
import { UserLogin } from '../../_models/_simplified/user-login';
import { UserRegister } from '../../_models/_simplified/user-register';
import { LoggedSubject } from '../../_models/_detailed/logged-subject';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<LoggedSubject>;
  public currentUser: Observable<LoggedSubject>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedSubject>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedSubject {
    return this.currentUserSubject.value;
  }

  public register(userRegister: UserRegister) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/register`, userRegister)
      .pipe();
  }

  public login(userLogin: UserLogin) {
    return this.httpClient
      .post<LoggedSubject>(`${environment.apiUrl}/login`, userLogin)
      .pipe(map(( user: LoggedSubject) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        },
        error => {
          console.log(error);
        }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public getCurrentRole(): string {
    if (this.currentUserValue) {
      const decoded = jwt_decode(this.currentUserValue.accessToken);
      const currRole = decoded[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] as string;

      return currRole;
    }
    return null;
  }

  public getTokenExpirationDate(): Date {
    if (!this.currentUserValue) {
      return null;
    }

    const decoded = jwt_decode<any>(this.currentUserValue.accessToken);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(): boolean {
    if (!this.currentUserValue) {
      return false;
    }

    const date = this.getTokenExpirationDate();

    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

}
