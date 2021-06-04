import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.$isAuth();
  }

  private $isAuth(): Observable<boolean> {
    return this.authService.authChange$
      .pipe(take(1),
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/login']);
          }
        }));
  }
}
