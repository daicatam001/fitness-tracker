import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AppState} from '../store';
import {select, Store} from '@ngrx/store';
import {selectIsAuthenticated} from './store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<AppState>, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth$();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuth$();
  }

  private isAuth$(): Observable<boolean> {
    return this.store
      .pipe(
        select(selectIsAuthenticated),
        take(1),
        tap(isAuth => {
          if (!isAuth) {
            this.router.navigate(['/login']);
          }
        }));
  }
}
