import {createReducer, on} from '@ngrx/store';
import {loginSuccess, logout} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean
}

const initState: AuthState = {
  isAuthenticated: false
};

export const authReducer = createReducer(
  initState,
  on(loginSuccess, state => ({isAuthenticated: true})),
  on(logout, state => ({isAuthenticated: false}))
);
