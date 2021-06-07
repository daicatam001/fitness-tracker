import {NgModule} from '@angular/core';
import {TrainingComponent} from './components/training/training.component';
import {CurrentTrainingComponent} from './components/current-training/current-training.component';
import {NewTrainingComponent} from './components/new-training/new-training.component';
import {PastTrainingComponent} from './components/past-training/past-training.component';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import {StopTrainingComponent} from './components/current-training/stop-training.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/training.reducers';
import {EffectsModule} from '@ngrx/effects';
import {TrainingEffects} from './store';

const routes: Routes = [
  {path: '', component: TrainingComponent}
];

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('training', reducers),
    EffectsModule.forFeature([TrainingEffects])
  ]
})
export class TrainingModule {

}
