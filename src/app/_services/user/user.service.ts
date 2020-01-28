import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDetailed } from '../../_models/_detailed/user-detailed';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserInfo() {
    return this.httpClient.get<any>(`${environment.apiUrl}/users/info`)
      .pipe(map(( user: UserDetailed) => {
          console.log(user.email);
          return user;
        },
        error => {
          console.log(error);
        }));
  }

}
