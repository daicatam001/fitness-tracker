import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  authChange$ = this.authChange.asObservable();
  private user: User;

  constructor(private router: Router) {

  }

  register(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessful();
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessful();
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return !!this.user;
  }

  authSuccessful(): void {
    this.authChange.next(true);
    this.router.navigate(['training']);
  }
}
