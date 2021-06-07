import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MaterialModule} from '../material.module';
import {EffectsModule} from '@ngrx/effects';
import {UiEffects} from './store/ui.effects';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {uiReducer} from './store';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    MaterialModule,
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([UiEffects])],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    StoreModule,

    SpinnerComponent,
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class SharedModule {

}
