import {createAction, props} from '@ngrx/store';
import {FinishedExercise, ExerciseEntities} from '../training.model';

export const initData = createAction('[Training] InitData');
export const fetchExercises = createAction('[Training] Fetch Exercises');
export const fetchExercisesSuccess = createAction('[Training] Fetch Exercises Success',
  props<{ exerciseEntities: ExerciseEntities }>());
export const fetchExercisesFailed = createAction('[Training] Fetch Exercises Failed');
export const startTraining = createAction('[Training] Start Training',
  props<{ exerciseId: string }>());
export const stopTraining = createAction('[Training] Stop Training');
export const continueTraining = createAction('[Training] Continue Training');
export const finishTraining = createAction('[Training] Finish Training',
  props<{ exercise: FinishedExercise }>());
export const incrementProgress = createAction('[Training] Increment Progress');
