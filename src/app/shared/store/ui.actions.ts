import {createAction, props} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export const toggleNav = createAction('[UI] Toggle Nav');
export const closeNav = createAction('[UI] Close Nav');
export const openNav = createAction('[UI] Open Nav');

export const showSnackBar = createAction('[UI] Show Snack Bar', props<{ message: string, action: string }>());

export const navigate = createAction('[UI] Navigate', props<{ commands: string[], extras?: NavigationExtras }>());
