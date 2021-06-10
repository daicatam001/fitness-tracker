import {createReducer, on} from '@ngrx/store';
import {isAuthenticated, isNotAuthenticated} from '@auth/store/auth.actions';
import {User} from '@auth/auth.model';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initState,
  on(isAuthenticated, (state, {user}) => ({user})),
  on(isNotAuthenticated, state => ({user: null})),
);
