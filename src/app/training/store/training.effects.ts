import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as trainingAction from './training.actions';
import * as uiAction from '../../shared/store';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {ApiService} from '../../shared/services/api.service';
import {of} from 'rxjs';

@Injectable()
export class TrainingEffects {
  $fetchExercises = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.fetchExercises),
    tap(() => this.store.dispatch(uiAction.showSpinner())),
    mergeMap(() => this.apiService.getExercises().pipe(
      map(res => {
        console.log(res);
        return trainingAction.fetchExercisesSuccess({exerciseEntities: {}});
      }),
      catchError(error => of(trainingAction.fetchExercisesFailed()))
    ))
  ));


  constructor(private actions$: Actions,
              private apiService: ApiService,
              private store: Store<AppState>) {

  }
}
