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

  public loading = true;

  constructor(public authorService: AuthorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAuthorPage();
  }

  private loadAuthorPage() {
    this.page = Number(this.route.snapshot.paramMap.get('pageNo'));
    this.authorService.getBooksPage(this.page).pipe(first()).subscribe((data: AuthorDetailed[]) => {
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}
