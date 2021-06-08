import {createAction, props} from '@ngrx/store';
import {AuthData} from '@auth/models';

export const signup = createAction('[Auth] Signup', props<AuthData>());
export const signupSuccess = createAction('[Auth] Signup Success');
export const signupFailed = createAction('[Auth] Signup Failed');
export const login = createAction('[Auth] Login', props<AuthData>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailed = createAction('[Auth] Login Failed');
export const logout = createAction('[Auth] Logout');
