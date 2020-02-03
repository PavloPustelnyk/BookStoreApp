import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from '../../_models/_simplified/user-login';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  loginError = false;

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const user = new UserLogin();

    user.email = this.loginForm.controls.email.value;
    user.password = this.loginForm.controls.password.value;

    this.loading = true;

    this.authService
      .login(user)
      .subscribe(data => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error => {
        this.loading = false;

        if (error.status === 400) {
          this.loginError = true;
        }

        console.log(error);
    });
  }

  get f() { return this.loginForm.controls; }

}
