import { Component, OnInit, Input } from '@angular/core';
import { AuthorDetailed } from '../../_models/_detailed/author-detailed';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.css']
})
export class AuthorListItemComponent implements OnInit {

  @Input() author: AuthorDetailed;

  constructor() { }

  ngOnInit() {
  }

}
