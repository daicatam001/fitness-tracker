import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import * as trainingAction from './training.actions';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {AppState} from '../../store';
import {Action, Store} from '@ngrx/store';
import {ApiService} from '../../shared/services/api.service';
import {of} from 'rxjs';
import {Exercise, ExerciseEntities} from '../training.model';
import {selectCurrentTraining, selectExerciseEntities, selectTraining} from './training.selectors';
import {StopTrainingComponent} from '../components/current-training/stop-training.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class TrainingEffects implements OnInitEffects {

  private progressTimer: any;

  init$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.initData),
    mergeMap(() => of(trainingAction.fetchExercises()))
  ));

  $fetchExercises = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.fetchExercises),
    mergeMap(() => this.apiService.getExercises().pipe(
      map((exercises: Exercise[]) => {
        const exerciseEntities = exercises.reduce((entities, exe) => ({...entities, [exe.id]: {...exe}}), {});
        return trainingAction.fetchExercisesSuccess({exerciseEntities});
      }),
      catchError(error => of(trainingAction.fetchExercisesFailed()))
    ))
  ));

  startTraining$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.startTraining),
    concatLatestFrom(() => this.store.select(selectExerciseEntities)),
    map(([action, exeEntites]) => {
      this.runProcess(exeEntites, action.exerciseId);
    })
  ), {dispatch: false});

  incrementProgress$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.incrementProgress),
    concatLatestFrom(() => this.store.select(selectCurrentTraining)),
    map(([, currentTraining]) => {
      if (currentTraining.progress >= 100) {
        clearInterval(this.progressTimer);
        this.store.dispatch(trainingAction.finishTraining());
      }
      return null;
    })
  ), {dispatch: false});

  stopTraining$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.stopTraining),
    concatLatestFrom(() => this.store.select(selectCurrentTraining)),
    map(([, currentTraining]) => {
      clearInterval(this.progressTimer);
      const dialogRef = this.dialog.open(StopTrainingComponent, {
        data: {
          progress: currentTraining.progress
        }
      });
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        this.store.dispatch(result ? trainingAction.finishTraining() : trainingAction.continueTraining());
      });
    })
  ), {dispatch: false});

  continueTraining$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.continueTraining),
    concatLatestFrom(() => this.store.select(selectTraining)),
    map(([, training]) => {
      this.runProcess(training.exerciseEntities, training.currentTraining.exerciseId);
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private dialog: MatDialog,
              private apiService: ApiService,
              private store: Store<AppState>) {

  }

  ngrxOnInitEffects(): Action {
    return trainingAction.initData();
  }

  private runProcess(exeEntites: ExerciseEntities, exerciseId): void {
    const step = exeEntites[exerciseId].duration / 100 * 1000;
    this.progressTimer = setInterval(() => {
      this.store.dispatch(trainingAction.incrementProgress());
    }, step);
  }
}
