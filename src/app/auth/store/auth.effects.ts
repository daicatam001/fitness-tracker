import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {catchError, delay, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {hideSpinner, navigate, showSnackBar, showSpinner} from '@shared/store';
import {AppState} from '@store';
import {ApiService} from '@shared/services/api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {isAuthenticated, isNotAuthenticated} from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {

  initAuth$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.initAuth),
    switchMap(() => this.apiService.authState$),
    delay(200),
    map(auth => auth ? authActions.isAuthenticated() : authActions.isNotAuthenticated())
  ));

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
      isAuthenticated(),
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
    mergeMap(() => this.apiService.logout()),
    switchMap(() => {
      return [
        isNotAuthenticated(),
        navigate({commands: ['/login']})
      ];
    })));

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth,
              private store: Store<AppState>,
              private apiService: ApiService) {

  }

  ngrxOnInitEffects(): Action {
    return authActions.initAuth();
  }
}
