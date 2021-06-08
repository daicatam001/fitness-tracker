import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TrainingState} from '@training/store/training.reducers';

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
  state => {
    return state.currentTraining ?
      {...state.exerciseEntities[state.currentTraining.exerciseId], ...state.currentTraining} : null;
  }
);
export const selectTrainingProgress = createSelector(
  selectCurrentTraining,
  state => state ? state.progress : 0
);
