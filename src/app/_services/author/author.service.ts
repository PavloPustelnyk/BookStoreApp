import { Injectable } from '@angular/core';
import { AuthorDetailed } from '../../_models/_detailed/author-detailed';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Author } from 'src/app/_models/_simplified/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  public pagesCount: number;
  public authors: AuthorDetailed[];

  public constructor(private httpClient: HttpClient) { }

  public getPagesCount() {
    return this.httpClient.get<any>(`${environment.apiUrl}/authors/pages`)
      .pipe(map((pages: number) => {
        this.pagesCount = pages;
        return pages;
      },
      error => {
        console.log(error);
      }));
  }

  public getBooksPage(page: number) {
    return this.httpClient.get<AuthorDetailed[]>(`${environment.apiUrl}/authors/page/${page}`)
      .pipe(map((authors: AuthorDetailed[]) => {
        this.authors = authors;
        return authors;
      },
      error => {
        console.log(error);
      }));
  }

  public getAuthor(id: number) {
    return this.httpClient.get<AuthorDetailed>(`${environment.apiUrl}/authors/${id}`)
      .pipe(map((author: AuthorDetailed) => {
        return author;
      },
      error => {
        console.log(error);
      }));
  }

  public postAuthor(author: Author) {
    return this.httpClient
      .post<Author>(`${environment.apiUrl}/authors`, author)
      .pipe(map((data: Author) => {
        return data;
      },
      error => {
        console.log(error);
      }));
  }

}
