import { Component, OnInit, Input } from '@angular/core';
import { BookDetailed } from '../../_models/_detailed/book-detailed';

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

}
