import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UiState} from './ui.reducers';

export const selectUi = createFeatureSelector<UiState>('ui');
export const selectIsOpenNav = createSelector(
  selectUi,
  state => state.isOpenNav
);
