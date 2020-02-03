import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Roles } from '../../constants/Roles';
import { LoggedSubject } from '../../_models/_detailed/logged-subject';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userRole: string;
  adminRole: string;
  currUser: LoggedSubject;

  constructor(public authService: AuthenticationService,
              private router: Router) {
    this.userRole = Roles.UserRole;
    this.adminRole = Roles.AdminRole;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((data: LoggedSubject) => this.currUser = data);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.authService.currentUserValue) {
      return true;
    }
    return false;
  }

}
