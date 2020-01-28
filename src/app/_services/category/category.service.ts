import { Injectable } from '@angular/core';
import { Category } from '../../_models/_simplified/category';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`)
      .pipe(map((categories: Category[]) => {
        return categories;
      },
      error => {
        console.log(error);
      }));
  }
}
