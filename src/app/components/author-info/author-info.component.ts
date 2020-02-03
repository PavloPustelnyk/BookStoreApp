import { Component, OnInit } from '@angular/core';
import { AuthorDetailed } from '../../_models/_detailed/author-detailed';
import { AuthorService } from 'src/app/_services/author/author.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css']
})
export class AuthorInfoComponent implements OnInit {

  public authorId: number;

  public author: AuthorDetailed;

  public loading = true;

  constructor(public authorService: AuthorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAuthor();
  }

  private loadAuthor() {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.authorService.getAuthor(this.authorId).pipe(first()).subscribe((data: AuthorDetailed) => {
      this.author = data;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error.message);
    });
  }

  getAuthorImage() {
    if (!this.author.authorImage) {
      return 'assets/images/default_author.png';
    }
    return this.author.authorImage;
  }

  getAuthorName() {
    return this.author.firstName + ' ' + this.author.lastName;
  }
}
