import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  bookId: number;
  book: BookDetailed;
  loading = true;
  likeLoading = false;
  likedBook = false;

  constructor(public bookService: BookService,
              public authService: AuthenticationService,
              public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadBook();

    if (this.authService.currentUserValue) {
      this.isBookLiked();
    }
  }

  private isBookLiked() {
    this.likeLoading = true;

    this.userService
      .getUserLikedBooks()
      .subscribe((books: Book[]) => {
        this.likeLoading = false;
        if (books) {
          this.likedBook = books.find(b => b.id === this.bookId) != null;
        }
      },
      error => {
        this.likeLoading = false;
        console.log(error);
      });
  }

  private loadBook() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService
      .getBook(this.bookId)
      .subscribe((data: BookDetailed) => {
        this.book = data;
        this.loading = false;
      },
      error => {
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


  addToFavorites() {
    if (!this.authService.currentUserValue || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }

    this.likeLoading = true;

    this.userService
      .likeBook(this.bookId)
      .subscribe((data: UserDetailed) => {
        this.likeLoading = false;
        this.likedBook = true;
      },
      error => {
        this.likeLoading = false;
        console.log(error);
      });
  }
}
