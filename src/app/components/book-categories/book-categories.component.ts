import { BookService } from './../../_services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../_services/category/category.service';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/_models/_simplified/category';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.css']
})
export class BookCategoriesComponent implements OnInit {

  public loading = true;

  public categories: Category[];

  constructor(public bookService: BookService,
              public categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.loading = false;
        this.categories = data;
      },
      error => {
        console.log(error.message);
      });
  }

}
