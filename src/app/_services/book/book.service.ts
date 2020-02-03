import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { Book } from 'src/app/_models/_simplified/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public pagesCount: number;

  public constructor(private httpClient: HttpClient) { }

  public getPagesCount() {
    return this.httpClient.get<any>(`${environment.apiUrl}/books/pages`)
      .pipe(map((pages: number) => {
        this.pagesCount = pages;
        return pages;
      },
      error => {
        console.log(error);
      }));
  }

  public getCategoryPagesCount(categoryId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/categories/${categoryId}/books/pages`)
      .pipe(map((pages: number) => {
        this.pagesCount = pages;
        return pages;
      },
      error => {
        console.log(error);
      }));
  }

  public getBooksPage(page: number) {
    return this.httpClient.get<BookDetailed[]>(`${environment.apiUrl}/books/page/${page}`)
      .pipe(map((books: BookDetailed[]) => {
        return books;
      },
      error => {
        console.log(error);
      }));
  }

  public getBook(id: number) {
    return this.httpClient.get<BookDetailed>(`${environment.apiUrl}/books/${id}`)
      .pipe(map((book: BookDetailed) => {
        return book;
      },
      error => {
        console.log(error);
      }));
  }

  public getBooksPageOfCategory(page: number, categoryId: number) {
    return this.httpClient.get<BookDetailed[]>(`${environment.apiUrl}/categories/${categoryId}/books/page/${page}`)
      .pipe(map((books: BookDetailed[]) => {
        return books;
      },
      error => {
        console.log(error);
      }));
  }

  public postBook(book: Book) {
    return this.httpClient
      .post<Book>(`${environment.apiUrl}/books`, book)
      .pipe(map((data: Book) => {
        return data;
      },
      error => {
        console.log(error);
      }));
  }


}
