import { BookService } from './../../_services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  public pagesCount: number;

  public page: number;

  public categoryId: number;

  public loading = true;

  public books: BookDetailed[];

  constructor(public bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      console.log('start sub');
      if (this.page !== Number(params.get('pageNo')) && !params.get('categoryId')) {
        console.log('us');
        this.loadPagesCount();
        this.loadBookPage();
      } else if (this.page !== Number(params.get('pageNo')) && params.get('categoryId')
        || this.categoryId !== Number(params.get('categoryId'))) {
        console.log('categ');
        this.loadCategoryPagesCount(Number(params.get('categoryId')));
        this.loadBookPageOfCategory(Number(params.get('categoryId')));
      }
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  private loadPagesCount() {
    this.bookService.getPagesCount().pipe(first()).subscribe((data: number) => {
      this.pagesCount = data;
    },
    error => {
      console.log(error);
    });
  }

  private loadCategoryPagesCount(categoryId: number) {
    this.bookService.getCategoryPagesCount(categoryId).pipe(first()).subscribe((data: number) => {
      this.pagesCount = data;
      console.log('pages' + data);
    },
    error => {
      console.log(error);
    });
  }

  private loadBookPage() {
    this.page = Number(this.route.snapshot.paramMap.get('pageNo'));

    this.bookService.getBooksPage(this.page).pipe(first()).subscribe((data: BookDetailed[]) => {
        this.books = data;
        this.loading = false;
      }, error => {
        console.log(error);
      });
  }

  private loadBookPageOfCategory(categoryId: number) {
    this.page = Number(this.route.snapshot.paramMap.get('pageNo'));
    this.categoryId = categoryId;
    this.bookService.getBooksPageOfCategory(this.page, categoryId).pipe(first()).subscribe((data: BookDetailed[]) => {
      this.books = data;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}
