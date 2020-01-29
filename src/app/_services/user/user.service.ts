import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDetailed } from '../../_models/_detailed/user-detailed';
import { map } from 'rxjs/operators';
import { BaseModel } from '../../_models/_simplified/base-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserInfo() {
    return this.httpClient.get<any>(`${environment.apiUrl}/users/info`)
      .pipe(map(( user: UserDetailed) => {
          return user;
        },
        error => {
          console.log(error);
        }));
  }

  likeBook(bookId: number) {
    const baseModel = new BaseModel();
    baseModel.id = bookId;

    return this.httpClient.post<any>(`${environment.apiUrl}/users/like-book`, baseModel)
      .pipe(map(( user: UserDetailed) => {
          return user;
        },
        error => {
          console.log(error);
        }));
  }

}
