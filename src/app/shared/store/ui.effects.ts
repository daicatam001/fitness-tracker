import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {navigate, showSnackBar} from './ui.actions';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable()
export class UiEffects {
  showSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(showSnackBar),
    tap(action => this.snackBar.open(action.message, action.action))
  ), {dispatch: false});

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(navigate),
    tap(action => this.router.navigate(action.commands, action.extras))
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router,
              private snackBar: MatSnackBar) {

  }
}
