import { Component, OnInit, Input } from '@angular/core';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { stringify } from 'querystring';
import { concat } from 'rxjs';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() book: BookDetailed;

  constructor() { }

  ngOnInit() {
  }

  getBookImage() {
    if (!this.book.bookImage) {
      return 'assets/images/default_book.png';
    }
    return this.book.bookImage;
  }

  getBookAuthor() {
    return this.book.author.firstName + ' ' + this.book.author.lastName;
  }

  getBookRating() {
    return (this.book.summaryRating / this.book.reviewCount).toFixed(1);
  }

}
