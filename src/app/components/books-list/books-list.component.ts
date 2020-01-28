import { BookService } from './../../_services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  public page: number;

  public categoryId: number;

  public loading = true;

  public books: BookDetailed[];

  constructor(public bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBookPage();

    this.route.params.subscribe(params => {
      if (params.categoryId && this.categoryId !== Number(params.categoryId)) {
        this.loadBookPageOfCategory(Number(params.categoryId));
      }
    });
  }

  private loadBookPage() {
    this.page = Number(this.route.snapshot.paramMap.get('pageNo'));

    if (this.route.snapshot.paramMap.get('categoryId')) {
      this.loadBookPageOfCategory(Number(this.route.snapshot.paramMap.get('categoryId')));
      return;
    }

    this.bookService.getBooksPage(this.page).pipe(first()).subscribe((data: BookDetailed[]) => {
        this.books = data;
        this.loading = false;
      }, error => {
        console.log(error);
      });
  }

  private loadBookPageOfCategory(categoryId: number) {
    this.categoryId = categoryId;
    this.bookService.getBooksPageOfCategory(this.page, categoryId).pipe(first()).subscribe((data: BookDetailed[]) => {
      this.books = data;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}
