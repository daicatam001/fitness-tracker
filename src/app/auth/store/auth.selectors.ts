import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducers';

export const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectIsAuthenticated = createSelector(
  selectAuth,
  state => state.isAuthenticated
);