import { Injectable } from '@angular/core';
import { Category } from '../../_models/_simplified/category';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public constructor(private httpClient: HttpClient) { }

  public getCategories() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`)
      .pipe(map((categories: Category[]) => {
        return categories;
      },
      error => {
        console.log(error);
      }));
  }

  public postCategory(category: Category) {
    return this.httpClient
      .post<Category>(`${environment.apiUrl}/categories`, category)
      .pipe(map((data: Category) => {
        return data;
      },
      error => {
        console.log(error);
      }));
  }
}
