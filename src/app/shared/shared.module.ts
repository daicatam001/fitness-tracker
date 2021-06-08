import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OverlayModule} from '@angular/cdk/overlay';
import {MaterialModule} from '../material.module';
import {SpinnerComponent} from '@shared/components/spinner/spinner.component';
import {UiEffects} from '@shared/store/ui.effects';
import {uiReducer} from '@shared/store';

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
