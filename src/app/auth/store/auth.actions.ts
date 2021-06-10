import {createAction, props} from '@ngrx/store';
import {AuthData, User} from '@auth/auth.model';

export const initAuth = createAction('[Auth] Init Auth');
export const isAuthenticated = createAction('[Auth] Is Authenticated', props<{ user: User }>());
export const isNotAuthenticated = createAction('[Auth] Is Not Authenticated');
export const setAuth = createAction('[Auth] Init Auth', props<{ isAuthenticated: boolean }>());
export const signup = createAction('[Auth] Signup', props<AuthData>());
export const signupSuccess = createAction('[Auth] Signup Success');
export const signupFailed = createAction('[Auth] Signup Failed');
export const login = createAction('[Auth] Login', props<AuthData>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailed = createAction('[Auth] Login Failed');
export const logout = createAction('[Auth] Logout');
