import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {logout, selectIsAuthenticated} from './store';
import {AuthData} from './models';
import {AppState} from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private store: Store<AppState>) {

  }

  register(authData: AuthData): void {

  }

  login(authData: AuthData): void {


  }

  logout(): void {
    this.store.dispatch(logout());
  }

  isAuth$(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated));
  }


}
