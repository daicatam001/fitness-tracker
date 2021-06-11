import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private apiService: ApiService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth$();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth$();
  }

  private isAuth$(): Observable<boolean> {
    return this.apiService.authState$
      .pipe(
        take(1),
        map(auth => !!auth),
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/login']);
          }
        }));
  }
}
