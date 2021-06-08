import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {hideSpinner, navigate, showSnackBar, showSpinner} from '@shared/store';
import {AppState} from '@store';
import {ApiService} from '@shared/services/api.service';

@Injectable()
export class AuthEffects {

  signup$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signup),
    tap(() => this.store.dispatch(showSpinner())),
    mergeMap(action => {
      return this.apiService.signup(action.email, action.password).pipe(
        map(res => authActions.signupSuccess()),
        catchError(error => of(authActions.signupFailed()))
      );
    })
  ));


  signupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signupSuccess),
    mergeMap(() => [
      hideSpinner(),
      showSnackBar({message: 'Signup Success', action: 'Success'}),
      navigate({commands: ['/training']})
    ])
  ));

  signupFailed$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signupFailed),
    mergeMap(() => [
      hideSpinner(),
      showSnackBar({message: 'Signup Failed', action: 'Error'})
    ])
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    tap(() => this.store.dispatch(showSpinner())),
    mergeMap(action => {
      return this.apiService.login(action.email, action.password).pipe(
        map(res => authActions.loginSuccess()),
        catchError(() => of(authActions.loginFailed())));
    }),
  ), {useEffectsErrorHandler: false});

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    mergeMap(() => [
      hideSpinner(),
      showSnackBar({message: 'Login Success', action: 'Success'}),
      navigate({commands: ['/training']})
    ])
  ));

  loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginFailed),
    mergeMap(() => [
      hideSpinner(),
      showSnackBar({message: 'Login Failed', action: 'Error'})
    ])
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    mergeMap(() => of(navigate({commands: ['/login']})))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private apiService: ApiService) {

  }
}
