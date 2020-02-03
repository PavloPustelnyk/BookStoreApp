import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../../_services/author/author.service';
import { Author } from 'src/app/_models/_simplified/author';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  postForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  postError = false;
  base64file: string;

  constructor(private authorService: AuthorService,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      image: [''],
      description: ['']
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    const author = new Author();

    author.firstName = this.postForm.controls.firstName.value;
    author.lastName = this.postForm.controls.lastName.value;
    author.birthDate = this.postForm.controls.birthDate.value;
    author.authorImage = this.base64file;
    author.description = this.postForm.controls.description.value;

    this.loading = true;

    this.authorService
      .postAuthor(author)
      .subscribe((data: Author) => {
        this.loading = false;
        alert('Author added. Id: ' + data.id);
      },
      error => {
        this.loading = false;
        alert(error.message);
      });

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64file = reader.result.toString();
        this.cd.markForCheck();
      };
    }
  }

  get f() { return this.postForm.controls; }

}
