import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReloginGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.authenticationService.currentUserValue;

      if (currentUser && !this.authenticationService.isTokenExpired()) {
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }

}
