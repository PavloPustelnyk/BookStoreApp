import { BookService } from './../../_services/book/book.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  base64file: string;

  constructor(private authService: AuthenticationService,
              private bookService: BookService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      categoriesIds: ['', [Validators.required]],
      image: [''],
      description: ['']
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    const book = new Book();

    book.title = this.postForm.controls.title.value;
    book.authorId = parseInt(this.postForm.controls.authorId.value, 10);
    book.price = parseFloat(this.postForm.controls.price.value);
    book.categoriesId = this.postForm.controls.categoriesIds.value.split(',').map((i: string) => parseInt(i, 10));
    book.bookImage = this.base64file;
    book.description = this.postForm.controls.description.value;

    this.loading = true;

    this.bookService
      .postBook(book)
      .subscribe(data => {
        this.loading = false;
        alert('success');
      },
      error => {
        this.loading = false;
        alert(error);
      });

  }

  onFileChange(event) {
    console.log('chaneg');
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64file = reader.result.toString();
        console.log(this.base64file);
        this.cd.markForCheck();
      };
    }
  }

  get f() { return this.postForm.controls; }

}
