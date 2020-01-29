import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { TypeScriptEmitter } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const currentUser = this.authenticationService.currentUserValue;

      if (!currentUser) {
        this.router.navigate(['/login']);
        return false;
      }

      const currRole = this.authenticationService.getCurrentRole();

      if (currRole !== route.data.role) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
  }
}
