import {createAction, props} from '@ngrx/store';
import {ExerciseEntities} from '../training.model';

export const fetchExercises = createAction('[Training] Fetch Exercises');
export const fetchExercisesSuccess = createAction('[Training] Fetch Exercises Success',
  props<{ exerciseEntities: ExerciseEntities }>());
export const fetchExercisesFailed = createAction('[Training] Fetch Exercises Failed');
