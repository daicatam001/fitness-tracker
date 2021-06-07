import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrainingState} from './training.reducers';

export const selectTraining = createFeatureSelector<TrainingState>('training');
export const selectExerciseEntities = createSelector(
  selectTraining,
  state => state.exerciseEntities
);
export const selectExercises = createSelector(
  selectExerciseEntities,
  state => Object.values(state)
);

export const selectCurrentTraining = createSelector(
  selectTraining,
  state => state.currentTraining
);
