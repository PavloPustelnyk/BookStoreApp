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

  constructor(private httpClient: HttpClient) { }

  getPagesCount() {
    return this.httpClient.get<any>(`${environment.apiUrl}/books/pages`)
      .pipe(map((pages: number) => {
        this.pagesCount = pages;
        return pages;
      },
      error => {
        console.log(error);
      }));
  }

  getCategoryPagesCount(categoryId: number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/categories/${categoryId}/books/pages`)
      .pipe(map((pages: number) => {
        this.pagesCount = pages;
        return pages;
      },
      error => {
        console.log(error);
      }));
  }

  getBooksPage(page: number) {
    return this.httpClient.get<BookDetailed[]>(`${environment.apiUrl}/books/page/${page}`)
      .pipe(map((books: BookDetailed[]) => {
        return books;
      },
      error => {
        console.log(error);
      }));
  }

  getBook(id: number) {
    return this.httpClient.get<BookDetailed>(`${environment.apiUrl}/books/${id}`)
      .pipe(map((book: BookDetailed) => {
        return book;
      },
      error => {
        console.log(error);
      }));
  }

  getBooksPageOfCategory(page: number, categoryId: number) {
    return this.httpClient.get<BookDetailed[]>(`${environment.apiUrl}/categories/${categoryId}/books/page/${page}`)
      .pipe(map((books: BookDetailed[]) => {
        return books;
      },
      error => {
        console.log(error);
      }));
  }

  postBook(book: Book) {
    return this.httpClient
      .post<Book>(`${environment.apiUrl}/books`, book)
      .pipe(map((data: Book) => {
        alert('Added ' + data);
      },
      error => {
        alert('Error ' + error);
      }));
  }


}
