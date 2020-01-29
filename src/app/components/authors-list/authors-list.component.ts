import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../_services/author/author.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthorDetailed } from '../../_models/_detailed/author-detailed';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {

  public page: number;

  public pagesCount: number;

  public authors: AuthorDetailed[];

  public loading = true;

  constructor(public authorService: AuthorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPagesCount();
    this.loadAuthorPage();
  }

  private loadAuthorPage() {
    this.page = Number(this.route.snapshot.paramMap.get('pageNo'));

    this.authorService
      .getBooksPage(this.page)
      .subscribe((data: AuthorDetailed[]) => {
        this.loading = false;
        this.authors = data;
      }, error => {
        console.log(error);
      });
  }

  private loadPagesCount() {
    this.authorService
      .getPagesCount()
      .subscribe((data: number) => {
        this.pagesCount = data;
      },
      error => {
        console.log(error);
      });
  }

  counter(i: number) {
    return new Array(i);
  }
}
