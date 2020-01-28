import { BookService } from './../../_services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../_models/_simplified/book';
import { AuthenticationService } from '../../_services/authentication/authentication.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  postForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  postError = false;

  constructor(private authService: AuthenticationService,
              private bookService: BookService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      categoriesIds: ['', [Validators.required]],
      bookImage: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    const book = new Book();

    book.title = this.postForm.controls.title.value;
    book.authorId = this.postForm.controls.authorId.value;
    book.price = this.postForm.controls.price.value;
    book.categoriesId = this.postForm.controls.categoriesIds.value;
    book.bookImage = this.postForm.controls.image.value;
    book.description = this.postForm.controls.description.value;

    this.loading = true;


  }

  get f() { return this.postForm.controls; }

}
