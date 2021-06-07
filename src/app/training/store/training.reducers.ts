import {Exercise, ExerciseEntities} from '../training.model';
import {createReducer, on} from '@ngrx/store';
import {fetchExercisesSuccess} from './training.actions';

export interface TrainingState {
  exerciseEntities: ExerciseEntities,
  trainedExercises: string[];
  currentTraining: string
}


const initState: TrainingState = {
  exerciseEntities: {},
  trainedExercises: [],
  currentTraining: null
};

export const reducers = createReducer(initState,
  on(fetchExercisesSuccess, (state, {exerciseEntities}) => ({...state, ...exerciseEntities})));
