import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {uiReducer} from './store/ui.reducers';
import {MaterialModule} from '../material.module';
import {EffectsModule} from '@ngrx/effects';
import {UiEffects} from './store/ui.effects';

@NgModule({
  imports: [
    MaterialModule,
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([UiEffects])],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule
  ]
})
export class SharedModule {

}
