import {createReducer, on} from '@ngrx/store';
import {CurrentTraining, ExerciseEntities} from '@training/training.model';
import {fetchExercisesSuccess, finishTraining, incrementProgress, startTraining} from '@training/store/training.actions';

export interface TrainingState {
  exerciseEntities: ExerciseEntities;
  trainedExercises: string[];
  currentTraining: CurrentTraining;
}


const initState: TrainingState = {
  exerciseEntities: {},
  trainedExercises: [],
  currentTraining: null
};

export const reducers = createReducer(initState,
  on(fetchExercisesSuccess, (state, {exerciseEntities}) => ({...state, exerciseEntities: {...exerciseEntities}})),
  on(startTraining, (state, {exerciseId}) => ({...state, currentTraining: {exerciseId, progress: 0}})),
  on(incrementProgress, (state) => ({...state, currentTraining: {...state.currentTraining, progress: state.currentTraining.progress + 5}})),
  on(finishTraining, (state) => ({...state, currentTraining: null}))
);
