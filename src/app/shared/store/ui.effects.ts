import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as uiAction from './ui.actions';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SpinnerService} from '../services/spinner.service';

@Injectable()
export class UiEffects {
  showSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(uiAction.showSnackBar),
    tap(action => this.snackBar.open(action.message, action.action))
  ), {dispatch: false});

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(uiAction.navigate),
    tap(action => this.router.navigate(action.commands, action.extras))
  ), {dispatch: false});

  showSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(uiAction.showSpinner),
    tap(action => this.spinner.show())
  ), {dispatch: false});

  hideSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(uiAction.hideSpinner),
    tap(action => this.spinner.hide())
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar) {

  }
}
