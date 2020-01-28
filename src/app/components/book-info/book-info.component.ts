import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  public bookId: number;

  public book: BookDetailed;

  public loading = true;

  constructor(public bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBook();
  }

  private loadBook() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(this.bookId).pipe(first()).subscribe((data: BookDetailed) => {
      this.book = data;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}
