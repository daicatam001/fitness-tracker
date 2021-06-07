import {createReducer, on} from '@ngrx/store';
import {closeNav, openNav, showSnackBar, toggleNav} from './ui.actions';

export interface UiState {
  isOpenNav: boolean;
}

const initState: UiState = {
  isOpenNav: false
};

export const uiReducer = createReducer(initState,
  on(closeNav, state => ({...state, isOpenNav: false})),
  on(openNav, state => ({...state, isOpenNav: true})),
  on(toggleNav, state => {
    return {
      ...state,
      isOpenNav: !state.isOpenNav
    };
  })
);
