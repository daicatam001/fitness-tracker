import {createReducer, on} from '@ngrx/store';
import {isAuthenticated, isNotAuthenticated, loginSuccess, logout} from '@auth/store/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initState: AuthState = {
  isAuthenticated: false
};

export const authReducer = createReducer(
  initState,
  on(isAuthenticated, state => ({isAuthenticated: true})),
  on(isNotAuthenticated, state => ({isAuthenticated: false})),
);
