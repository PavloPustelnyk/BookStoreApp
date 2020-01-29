import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { BookDetailed } from '../../_models/_detailed/book-detailed';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Book } from 'src/app/_models/_simplified/book';
import { UserService } from '../../_services/user/user.service';
import { UserDetailed } from '../../_models/_detailed/user-detailed';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  private user: UserDetailed;

  public bookId: number;

  public book: BookDetailed;

  public loading = true;

  public likeLoading = false;

  constructor(public bookService: BookService,
              public authService: AuthenticationService,
              public userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBook();

    if (this.authService.currentUserValue) {
      this.loadUser();
    }
  }

  private loadUser() {
    this.userService
      .getUserInfo()
      .subscribe((data: UserDetailed) => {
        this.user = data;
      },
      error => {
        console.log(error);
      });
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

  likedBook(): boolean {

    console.log(this.bookId);

    if (this.user && this.user.likedBooks) {
      return this.user.likedBooks.find(b => b.id === this.bookId) != null;
    }

    return false;
  }

  addToFavorites() {
    this.likeLoading = true;

    this.userService
      .likeBook(this.bookId)
      .subscribe((data: UserDetailed) => {
        this.likeLoading = false;
        this.user = data;
      },
      error => {
        this.likeLoading = false;
        console.log(error);
      });
  }
}
