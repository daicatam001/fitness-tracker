import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {ApiService} from '../../shared/services/api.service';
import {EMPTY, of, throwError} from 'rxjs';
import * as uiAction from '../../shared/store';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signup),
    tap(() => this.store.dispatch(uiAction.showSpinner())),
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
      uiAction.hideSpinner(),
      uiAction.showSnackBar({message: 'Signup Success', action: 'Success'}),
      uiAction.navigate({commands: ['/training']})
    ])
  ));

  signupFailed$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signupFailed),
    mergeMap(() => [
      uiAction.hideSpinner(),
      uiAction.showSnackBar({message: 'Signup Failed', action: 'Error'})
    ])
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    tap(() => this.store.dispatch(uiAction.showSpinner())),
    mergeMap(action => {
      return this.apiService.login(action.email, action.password).pipe(
        map(res => authActions.loginSuccess()),
        catchError(() => of(authActions.loginFailed())));
    }),
  ), {useEffectsErrorHandler: false});

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginSuccess),
    mergeMap(() => [
      uiAction.hideSpinner(),
      uiAction.showSnackBar({message: 'Login Success', action: 'Success'}),
      uiAction.navigate({commands: ['/training']})
    ])
  ));

  loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginFailed),
    mergeMap(() => [
      uiAction.hideSpinner(),
      uiAction.showSnackBar({message: 'Login Failed', action: 'Error'})
    ])
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private apiService: ApiService) {

  }
}
