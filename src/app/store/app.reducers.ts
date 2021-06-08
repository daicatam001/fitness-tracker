import {AuthState} from '../auth/store';
import {UiState} from '../shared/store';

export interface AppState {
  auth: AuthState;
  ui: UiState;
}
