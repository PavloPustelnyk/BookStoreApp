import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDetailed } from './_models/_detailed/user-detailed';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { LoggedSubject } from './_models/_detailed/logged-subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']})
export class AppComponent implements OnInit {

    currentUser: LoggedSubject;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {}

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
