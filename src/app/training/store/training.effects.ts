import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import * as trainingAction from '@training/store/training.actions';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from '@shared/services/api.service';
import {CurrentTraining, Exercise, FinishedExercise} from '@training/training.model';
import {selectCurrentTraining} from '@training/store/training.selectors';
import {StopTrainingComponent} from '@training/components/current-training/stop-training.component';
import {AppState} from '@store';

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
    concatLatestFrom(() => this.store.select(selectCurrentTraining)),
    map(([, currentTraining]) => {
      this.runProcess(currentTraining);
    })
  ), {dispatch: false});

  incrementProgress$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.incrementProgress),
    concatLatestFrom(() => this.store.select(selectCurrentTraining)),
    map(([, currentTraining]) => {
      if (currentTraining.progress >= 100) {
        clearInterval(this.progressTimer);
        this.store.dispatch(trainingAction.finishTraining({
          exercise: {
            ...currentTraining,
            date: new Date().toDateString(),
            state: 'completed'
          }
        }));
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
        this.store.dispatch(result ?
          trainingAction.finishTraining(
            {
              exercise: {
                ...currentTraining,
                date: new Date().toDateString(),
                calories: currentTraining.calories * currentTraining.progress / 100,
                state: 'cancelled'
              }
            })
          : trainingAction.continueTraining());
      });
    })
  ), {dispatch: false});

  continueTraining$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.continueTraining),
    concatLatestFrom(() => this.store.select(selectCurrentTraining)),
    map(([, currentTraining]) => {
      this.runProcess(currentTraining);
    })
  ), {dispatch: false});

  fetchFinishedExercise$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.fetchFinishedExercises),
    mergeMap(() => this.apiService.getFinishedExercise().pipe(
      map((data: FinishedExercise[]) => trainingAction.fetchFinishedExercisesSuccess({finishedExercises: data}))
    ))
  ));

  finishedTraining$ = createEffect(() => this.actions$.pipe(
    ofType(trainingAction.finishTraining),
    tap(action => this.apiService.saveFinishedExercise(action.exercise))
  ), {dispatch: false});


  constructor(private actions$: Actions,
              private dialog: MatDialog,
              private apiService: ApiService,
              private store: Store<AppState>) {

  }

  ngrxOnInitEffects(): Action {
    return trainingAction.initData();
  }

  private runProcess(exercise: CurrentTraining): void {
    const step = exercise.duration / 100 * 1000;
    this.progressTimer = setInterval(() => {
      this.store.dispatch(trainingAction.incrementProgress());
    }, step);
  }
}
