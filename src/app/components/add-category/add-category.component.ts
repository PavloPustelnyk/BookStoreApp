import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/_simplified/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  postForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  postError = false;
  base64file: string;

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      category: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    const category = new Category();

    category.bookCategory = this.postForm.controls.category.value;

    this.loading = true;

    this.categoryService
      .postCategory(category)
      .subscribe((data: Category) => {
        this.loading = false;
        alert('Category added. Id:' + data.id);
      },
      error => {
        this.loading = false;
        alert(error.message);
      });

  }

  get f() { return this.postForm.controls; }
}
